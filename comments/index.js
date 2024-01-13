const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const mysql = require('mysql2')

const { randomBytes } = require('crypto')

const DB_POOL = mysql.createPool({
    host: 'dbms',
    user: 'root',
    password: 'rootpassword',
    database: 'comments_db',
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id

    const post = (await DB_POOL.promise().query('SELECT * FROM comments WHERE post_id = ? limit 1', postId))[0];

    console.log('post fetched', post);
    
    res.send({posts: post}) // filter comments
})

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/posts/:id/comments',
  async (req, res) => {
    const post_id = req.params.id

    const id = randomBytes(4).toString('hex')
    const { content } = req.body
    const comment = { id, content, post_id, status: 'pending' };

    await DB_POOL.promise().query('INSERT INTO comments SET ?', comment);

    await axios.post('http://event-bus:4005/events', {
        type: 'CommentCreated',
        data: comment
    })

    res.status(201).send({});
}) 

app.post('/events', async (req, res) => {

    const { event_payload } = req.body

    if (event_payload.event_name === 'CommentModerated') {
        const { post_id, id, status, content } = event_payload.event_data

        await DB_POOL.promise().query('UPDATE comments SET status = ? WHERE id = ?', [status, id]);

        try {
            await axios.post('http://event-bus:4005/events', {
                type: 'CommentUpdated',
                data: {
                    id,
                    content,
                    status,
                    post_id,
                }
            })

            await axios.post(`http://event-bus:4005/events/acknowledge`, { eventId: event_payload.id });
        } catch (error) {
            await axios.post(`http://event-bus:4005/events/fail`, { eventId: event_payload.id });
        }
    }

    res.send({})
})

app.listen(4001, () => { 
    console.log('listening on 4001')
})