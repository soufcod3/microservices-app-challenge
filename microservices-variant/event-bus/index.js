const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = []

app.post("/events", (req, res) => {
  const event = req.body

  console.log('events', events);

  events.push(event)

  try {
    axios.post('http://posts:4000/events', event).catch(err => console.error('error in posts events endpoint : ', err)); // posts
    axios.post('http://comments:4001/events', event).catch(err => console.error('error in comments events endpoint : ', err)); // comments
    axios.post('http://query:4002/events', event).catch(err => console.error('error in query events endpoint : ', err)); // query
    axios.post('http://moderation:4003/events', event).catch(err => console.error('error in moderation events endpoint : ', err)); // moderation
  } catch (error) {
    console.error('error in event bus events endpoint : ', error);
  }

  res.send({ status: 'OK' })
});

app.get("/events", (req, res) => {
  console.log('events', events)
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening on 4005");
}); 