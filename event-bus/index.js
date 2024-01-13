const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const {randomBytes} = require("crypto");
const {EventQueueManager} = require("./event-queue-manager");

// const POSTS_PORT = 4000;
const COMMENTS_PORT = 4001;
const QUERY_PORT = 4002;
const MODERATION_PORT = 4003;
// const EVENT_BUS_PORT = 4005;

// const POSTS_HOST = 'posts';
const COMMENTS_HOST = 'comments';
const QUERY_HOST = 'query';
const MODERATION_HOST = 'moderation';
// const EVENT_BUS_HOST = 'event-bus';

const app = express();
app.use(bodyParser.json());

const events = [];
const eventQueueManager = new EventQueueManager();

/**
 *
 * @param event_payload {{id, event_name, event_data, event_status, retry_count}}
 * @param host
   * @param port
 */
function sendEvent(event_payload, host, port) {
  try {
    console.debug(`sending event type:${event_payload.event_name} with id:${event_payload.id} to ${host}:${port}`)
    axios.post(`http://${host}:${port}/events`, {
      event_payload
    })
      .then(({data}) => {
        if (data.status !== 'OK') {
          console.info(`event type:${event_payload.event_name} with id:${event_payload.id} consumed`);
          eventQueueManager.succeeded(event_payload.id);
        }
      })
      .catch(err => {
        console.error(`error in consuming event type:${event_payload.event_name} with id:${event_payload.id} : `, err);
        eventQueueManager.failed(event_payload.id);
      });
  } catch (error) {
    console.error(`error in ${host} events endpoint : `, error);
  }
}

app.post("/events", (req, res) => {
  const event = req.body
  /** @type {{id, event_name, event_data, event_status, retry_count}} */
  const payload = {
    id: randomBytes(4).toString('hex'),
    event_name: event.type,
    event_data: event.data,
    event_status: 'pending',
    retry_count: 0
  }

  eventQueueManager.add(payload);

  try {
    switch (event.type) {
      case 'PostCreated':
        sendEvent(payload, QUERY_HOST, QUERY_PORT);
        break;
      case 'CommentCreated':
        console.log('A Comment has been created')
        sendEvent(payload, MODERATION_HOST, MODERATION_PORT);
        sendEvent(payload, QUERY_HOST, QUERY_PORT);
        break;
      case 'CommentUpdated':
        console.log('sending CommentUpdated to Query service')
        sendEvent(payload, QUERY_HOST, QUERY_PORT);
        break;
      case 'CommentModerated':
        console.log('sending CommentModerated to Comments service')
        sendEvent(payload, COMMENTS_HOST, COMMENTS_PORT);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error('error in event-bus events endpoint : ', error);
  }
  res.send({status: 'OK'})
});

app.get("/events", (req, res) => {
  console.log('all events queue', eventQueueManager.getQueue())
  res.send({ event_payloads: eventQueueManager.getQueue() });
});

app.post('/events/acknowledge', (req, res) => {
  const { eventId } = req.body
  console.log('Achnowledged : eventId to remove', eventId)
  eventQueueManager.removeEventById(eventId)
  res.send(true)
})

app.post('/events/fail', (req, res) => {
  const { eventId } = req.body
  console.log('Fail event', eventId)
  eventQueueManager.failed(eventId)
  res.send(true)
})

app.listen(4005, () => {
  console.log("listening on 4005");
}); 