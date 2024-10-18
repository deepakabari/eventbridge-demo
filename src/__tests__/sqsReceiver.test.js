import { sqsReceiverEvent } from '../handlers/sqsReceiver.js'
import * as sqsService from '../services/sqsService.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'

jest.mock('../services/sqsService.js')
jest.mock('../utils/responseHandler.js')

describe('sqsReceiverEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should process messages and return success response', async () => {
    const mockMessages = [{ Body: 'Message 1', ReceiptHandle: 'abc123' }]
    sqsService.receiveMessagesFromQueue.mockResolvedValue(mockMessages)
    sqsService.deleteMessageFromQueue.mockResolvedValue({})

    const response = await sqsReceiverEvent()

    expect(sqsService.deleteMessageFromQueue).toHaveBeenCalledTimes(mockMessages.length)
    expect(successResponse).toHaveBeenCalledWith('Messages processed', {
      count: mockMessages.length
    })
    expect(response).toEqual(successResponse('Messages processed', { count: mockMessages.length }))
  })

  it('should return no messages response when no messages are received', async () => {
    sqsService.receiveMessagesFromQueue.mockResolvedValue([])

    const response = await sqsReceiverEvent()

    expect(successResponse).toHaveBeenCalledWith('No messages to process')
    expect(response).toEqual(successResponse('No messages to process'))
  })

  it('should return error response on failure', async () => {
    sqsService.receiveMessagesFromQueue.mockRejectedValue(new Error('Receive error'))

    const response = await sqsReceiverEvent()

    expect(errorResponse).toHaveBeenCalledWith(500, 'Failed to process messages')
    expect(response).toEqual(errorResponse(500, 'Failed to process messages'))
  })
})