import { dispatchEvent } from '../handlers/dispatchEvent.js'
import { dispatchEventToEventBridge } from '../services/eventDispatcherService.js'
import { createResponse } from '../utils/responseHandler.js'

// this will mock the entire module
jest.mock('../services/eventDispatcherService.js')
jest.mock('../utils/responseHandler.js')

describe('dispatchEvent', () => {
  // To clear mock storage for test isolation
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should dispatch event successfully', async () => {
    const event = {
      body: JSON.stringify({ message: 'Test Message for Dispatching event', eventType: 'created' })
    }
    const mockResponse = {
      statusCode: 200,
      body: JSON.stringify({ result: 'Event dispatched successfully!' })
    }
    dispatchEventToEventBridge.mockResolvedValue(mockResponse)
    const response = await dispatchEvent(event)

    expect(dispatchEventToEventBridge).toHaveBeenCalled()
    expect(response).toEqual(mockResponse)
  })

  it('should return 400 for invalid event type', async () => {
    const event = {
      body: JSON.stringify({ message: 'Test Message for dispatching event', eventType: 'Invalid' })
    }

    const response = await dispatchEvent(event)

    expect(response).toEqual(
      createResponse(400, 'Invalid eventType. It must be either "created" or "updated".', {
        eventType: 'Invalid'
      })
    )
  })

  it('should throw an error when dispatching event fails', async () => {
    const event = {
      body: JSON.stringify({
        message: 'Test Message for Dispatching ev  ent',
        eventType: 'updated'
      })
    }
    const mockError = new Error('Failed to dispatch event')
    dispatchEventToEventBridge.mockRejectedValue(mockError)

    createResponse.mockReturnValue({
      statusCode: 500,
      body: JSON.stringify({ error: mockError.message })
    })

    const response = await dispatchEvent(event)

    expect(response.statusCode).toEqual(500)
    expect(response.body).toContain('Failed to dispatch event')
  })
})
