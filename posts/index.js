const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const mysql = require('mysql2')

const { randomBytes } = require('crypto')

const DB_POOL = mysql.createPool({
    host: 'dbms',
    user: 'dev',
    password: 'devpassword',
    database: 'posts',
});

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => { // unused anymore : query is doing the job
    res.send(posts)
})

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = { id, title }

    await axios.post('http://event-bus-srv:4005/events', { 
        type: 'PostCreated', 
        data: { 
            id, title
        }
    })

    res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
    console.log('received event', req.body.type)
    res.send({})
})

app.listen(4000, () => {
    console.log('listening on 4000')
})