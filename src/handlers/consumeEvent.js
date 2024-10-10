import { createResponse } from '../utils/responseHandler.js'

const consumeEvent = async (event) => {
  try {
    console.log('Event received: ', JSON.stringify(event, null, 2))

    const detail = event.detail

    return createResponse(200, 'Event processed!', { detail })
  } catch (error) {
    console.error('Error processing event:', error)
    return createResponse(500, 'Failed to process event')
  }
}

export { consumeEvent }
