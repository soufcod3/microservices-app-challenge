const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const handleEvent = async (type, data) => {
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved'

    try {
      await axios.post('http://event-bus:4005/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          post_id: data.post_id,
          status,
          content: data.content
        }
      })
    } catch (error) {
      console.error('error in moderation events endpoint : ', error);
    }
  } 
} 

app.post("/events", async (req, res) => {

    const { type, data } = req.body

    if (type === 'CommentCreated') {
      const status = data.content.includes('orange') ? 'rejected' : 'approved'

      try {
        await axios.post('http://event-bus:4005/events', {
          type: 'CommentModerated',
          data: {
            id: data.id,
            post_id: data.post_id,
            status,
            content: data.content
          }
        })
      } catch (error) {
        console.error('error in moderation events endpoint : ', error);
      }

    }
    res.send({})
});

app.listen(4003, async() => {
  console.log("listening on 4003");

  try {
    const res = await axios.get('http://event-bus:4005/events');

    for (const event of res.data) {
      console.log('processing event : ', event.type)

      handleEvent(event.type, event.data)
    }
  } catch (error) {
    console.error('error in moderation events endpoint : ', error);
  }
}); 