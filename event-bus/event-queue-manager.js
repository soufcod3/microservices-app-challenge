class EventQueueManager {
  constructor() {
    this.queue = [];
  }

  /**
   * Add an event to the queue.
   * @param event The event object to add.
   */
  add(event) {
    this.queue.push(event);
    console.log('adding event : updated queue ', this.queue)
  }

  /**
   * Get the next event in the queue without removing it.
   * @return The next event or null if the queue is empty.
   */
  next() {
    return this.queue.length > 0 ? this.queue[0] : null;
  }

  /**
   * Get and remove the next event in the queue.
   * @return The next event or null if the queue is empty.
   */
  dequeue() {
    return this.queue.length > 0 ? this.queue.shift() : null;
  }

  /**
   * Check if the queue is empty.
   * @return True if the queue is empty, otherwise false.
   */
  isEmpty() {
    return this.queue.length === 0;
  }

  /**
   * Mark an event as succeeded using its ID.
   * @param eventId The ID of the event.
   */
  succeeded(eventId) {
    this.updateEventStatus(eventId, "succeeded");
  }

  /**
   * Mark an event as failed using its ID.
   * @param eventId The ID of the event.
   */
  failed(eventId) {
    this.updateEventStatus(eventId, "failed");
  }

  /**
   * Update the status of an event by its ID and remove it from the queue.
   * @param eventId The ID of the event.
   * @param status The new status of the event.
   * @return True if the event was found and updated, otherwise false.
   */
  updateEventStatus(eventId, status) {
    const eventIndex = this.queue.findIndex((event) => event.id === eventId);
    if (eventIndex !== -1) {
      this.queue[eventIndex].event_status = status;
    //   this.removeEvent(eventIndex);
      return true;
    }
    return false;
  }

  /**
   * Explicitly remove an event from the queue based on external confirmation.
   * @param eventId The ID of the event to be removed.
   */
  removeEventById(eventId) {
    const eventIndex = this.queue.findIndex((event) => event.id === eventId);
    if (eventIndex !== -1) {
      this.removeEvent(eventIndex);
    }
  }

   /**
   * Remove an event from the queue by its index.
   * @param index The index of the event to remove.
   */
   removeEvent(index) {
    if (index >= 0 && index < this.queue.length) {
      this.queue.splice(index, 1);
    }
  }

  /**
   * Get a copy of the current queue.
   * @return A copy of the queue.
   */
  getQueue() {
    return [...this.queue];
  }
}

module.exports = { EventQueueManager };
