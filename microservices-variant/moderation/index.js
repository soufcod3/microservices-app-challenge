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

  /** @type {{id, event_name, event_data, event_status, retry_count}} */
    const { event_payload } = req.body

    const comment = event_payload.event_data;

    if (event_payload.event_name === 'CommentCreated') {
      const status = comment.content.includes('orange') ? 'rejected' : 'approved'

      try {
        await axios.post('http://event-bus:4005/events', {
          type: 'CommentModerated',
          data: {
            id: comment.id,
            post_id: comment.post_id,
            status,
            content: comment.content
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

  const res = await axios.get('http://event-bus:4005/events')
  /** @type {{id, event_name, event_data, event_status, retry_count}} */
  const {event_payload} = res.data;

  await handleEvent(event_payload.event_name, event_payload.event_data);
}); 