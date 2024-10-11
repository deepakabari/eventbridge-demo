import { consumeEvent } from '../handlers/consumeEvent.js'
import { createResponse } from '../utils/responseHandler.js'

jest.mock('../utils/responseHandler.js')

describe('consumeEvent', () => {
  // To clear mock storage for test isolation
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should process create event', async () => {
    const event = {
      detail: {
        message: 'New item created!',
        eventType: 'created'
      }
    }
    const expectedResponse = {
      statusCode: 200,
      body: JSON.stringify({ result: 'Processing created event:', detail: 'New item created!' })
    }

    createResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(event)

    expect(createResponse).toHaveBeenCalledWith(200, 'Processing created event:', {
      detail: 'New item created!'
    })
    expect(response).toEqual(expectedResponse)
  })

  it('should process update event', async () => {
    const event = {
      detail: {
        message: 'Item updated!',
        eventType: 'updated'
      }
    }

    const expectedResponse = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Processing updated event:',
        detail: 'Item updated!'
      })
    }

    createResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(event)

    expect(createResponse).toHaveBeenCalledWith(200, 'Processing updated event:', {
      detail: 'Item updated!'
    })
    expect(response).toEqual(expectedResponse)
  })
  
  it('should return an error response for invalid event type', async () => {
    const event = {
      detail: {
        message: 'Unknown event type!',
        eventType: 'invalidType'
      }
    }

    const expectedResponse = {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unknown event type: ${event.detail.eventType}`
      })
    }

    createResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(event)

    expect(createResponse).toHaveBeenCalledWith(500, `Unknown event type: ${event.detail.eventType}`)
    expect(response).toEqual(expectedResponse)
  })

  it('should return an error response for missing event detail', async () => {
    const event = null;

    const expectedResponse = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to process event'
      })
    }

    createResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(event)

    expect(createResponse).toHaveBeenCalledWith(500, 'Failed to process event')
    expect(response).toEqual(expectedResponse)
  })
})
