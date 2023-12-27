const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = []

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event)

  axios.post('http://localhost:4000/events', event).catch(err => console.error('error in posts events endpoint : ', err)); // posts
  axios.post('http://localhost:4001/events', event).catch(err => console.error('error in comments events endpoint : ', err)); // comments
  axios.post('http://localhost:4002/events', event).catch(err => console.error('error in query events endpoint : ', err)); // query
  axios.post('http://localhost:4003/events', event).catch(err => console.error('error in moderation events endpoint : ', err)); // moderation 

  res.send({ status: 'OK' })
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening on 4005");
}); 