import { consumeEvent } from '../handlers/consumeEvent.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'

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
      body: JSON.stringify({
        success: true,
        message: 'Processing created event',
        data: { detail: 'New item created!' }
      })
    }

    successResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(event)

    expect(successResponse).toHaveBeenCalledWith('Processing created event', {
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
        success: true,
        message: 'Processing updated event',
        data: { detail: 'Item updated!' }
      })
    }

    successResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(event)

    expect(successResponse).toHaveBeenCalledWith('Processing updated event', {
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
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: `Unknown event type: ${event.detail.eventType}`
      })
    }

    errorResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(event)

    expect(errorResponse).toHaveBeenCalledWith(400, `Unknown event type: ${event.detail.eventType}`)
    expect(response).toEqual(expectedResponse)
  })

  it('should return an error response for missing event detail', async () => {
    const event = {}

    const expectedResponse = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: 'Event detail is missing or null'
      })
    }

    errorResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(event)

    expect(errorResponse).toHaveBeenCalledWith(400, 'Event detail is missing or null')
    expect(response).toEqual(expectedResponse)
  })

  it('should return a 500 error if an exception occurs', async () => {
    const event = {
      detail: {
        message: 'This will throw an error',
        eventType: 'created'
      }
    }

    jest.spyOn(console, 'error').mockImplementation(() => {})

    const expectedResponse = {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to process event'
      })
    }

    errorResponse.mockReturnValue(expectedResponse)

    const response = await consumeEvent(null)

    expect(response).toEqual(expectedResponse)
  })
})
