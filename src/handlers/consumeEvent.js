import { successResponse, errorResponse } from '../utils/responseHandler.js'

const consumeEvent = async (event) => {
  try {
    console.log('Event received: ', JSON.stringify(event, null, 2))

    if (!event?.detail) {
      return errorResponse(400, 'Event detail is missing or null')
    }

    const { eventType, message } = event.detail

    switch (eventType) {
      case 'created':
        return successResponse('Processing created event', { detail: message })
      case 'updated':
        return successResponse('Processing updated event', { detail: message })
      default:
        return errorResponse(400, `Unknown event type: ${eventType}`)
    }
  } catch (error) {
    console.error('Error processing event:', error)
    return errorResponse(500, 'Failed to process event', error.message)
  }
}

export { consumeEvent }
