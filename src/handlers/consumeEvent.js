import { createResponse } from '../utils/responseHandler.js'

const consumeEvent = async (event) => {
  try {
    console.log('Event received: ', JSON.stringify(event, null, 2))

    if (!event?.detail) {
      throw new Error('Event detail is missing or null')
    }

    const { eventType, message } = event.detail

    switch (eventType) {
      case 'created':
        return createResponse(200, 'Processing created event:', { detail: message })
      case 'updated':
        return createResponse(200, 'Processing updated event:', { detail: message })
      default:
        return createResponse(500, `Unknown event type: ${eventType}`)
    }
  } catch (error) {
    console.error('Error processing event:', error)
    return createResponse(500, 'Failed to process event')
  }
}

export { consumeEvent }
