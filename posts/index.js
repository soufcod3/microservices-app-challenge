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
    database: 'posts_db',
});

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', async (req, res) => {
    const posts = await DB_POOL.promise().query('SELECT * FROM posts')[0];

    res.send(posts);
})

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/posts',
  async (req, res) => {
      const id = randomBytes(4).toString('hex')
      const {title} = req.body
      const post = {id, title}

      await DB_POOL.promise().query('INSERT INTO posts SET ?', post);


      try {
          await axios.post('http://event-bus:4005/events', {
              type: 'PostCreated',
              data: post
          })
      } catch (error) {
          console.error('error in posts events endpoint : ', error);
      }

      res.status(201).send(post)
  })

app.post('/events', (req, res) => {
    console.log('received event', req.body.type)
    res.send({})
})

app.listen(4000, () => {
    console.log('listening on 4000')
})