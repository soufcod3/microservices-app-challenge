const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())
app.use(cors())


const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id
    
    res.send(commentsByPostId[postId] || []) // filter comments
})

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id

    const id = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostId[postId] || []

    comments.push({ id, content })
    commentsByPostId[postId] = comments

    await axios.post('http://localhost:4005/events', { 
        type: 'CommentCreated', 
        data: { 
            id, 
            content,
            postId,
            status: 'pending'
        }
    })

    res.status(201).send(comments)
}) 

app.post('/events', async (req, res) => {
    console.log('received event', req.body.type)

    const { type, data } = req.body

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => {
            return comment.id === id
        })

        comment.status = status

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                content,
                status,
                postId,
            }
        })
    }

    res.send({})
})

app.listen(4001, () => {
    console.log('listening on 4001')
})