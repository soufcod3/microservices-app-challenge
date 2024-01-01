const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const mysql = require('mysql2')
const {randomBytes} = require("crypto");

const DB_POOL = mysql.createPool({
    host: 'dbms',
    user: 'dev',
    password: 'devpassword',
    database: 'microservices_variant_query_db',
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent = async (type, data) => {

    if (type === 'PostCreated') {
        console.log('PostCreated');
        const id = randomBytes(4).toString('hex');
        const queryData = {
            id,
            post_id: data.id,
            post_title: data.title,
        }

        try {
            await DB_POOL.promise().query('INSERT INTO query_posts SET ?', queryData);
        } catch (error) {}
    }

    if (type === 'CommentCreated') {
        console.log('CommentCreated');
        const { id, content, post_id, status } = data

        const queryData = {
            id,
            post_id,
            comment_id: id,
            comment: content,
            comment_status: status
        }

        try {
            await DB_POOL.promise().query('INSERT INTO query_comments SET ?', queryData);
        } catch (error) {}
    }

    if (type === 'CommentUpdated') {
        console.log('CommentUpdated');
        const { id, status } = data

        try {
            const commentToUpdate = (await DB_POOL.promise().query('SELECT * FROM query_comments WHERE comment_id = ? limit 1', id))[0][0];

            await DB_POOL.promise().query('UPDATE query_comments SET comment_status = ? WHERE comment_id = ?', [status, commentToUpdate?.comment_id]);
        } catch (error) {}
    }
}

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/posts', async (req, res) => {
    const posts = (await DB_POOL.promise().query('SELECT * FROM query_posts'))[0];

    const comments = (await DB_POOL.promise().query('SELECT * FROM query_comments'))[0];

    for (const post of posts) {
        post.comments = comments.filter(comment => comment.post_id === post.post_id);
    }

    res.send(posts);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body

    handleEvent(type, data)

    res.send({})
})

app.listen(4002, async () => {
    console.log('listening on 4002')

    const res = await axios.get('http://event-bus:4005/events')
    eventsData = res.data

    for (const event of eventsData) {
        console.log('processing event : ', event.type)

        handleEvent(event.type, event.data)
    }
})