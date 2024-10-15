import { sqsSenderEvent } from '../handlers/sqsSender'
import { sendMessageToQueue } from '../services/sqsService'

jest.mock('../services/sqsService.js')
jest.mock('../utils/awsClient.js')

describe('Handler test', () => {
  describe('sqsSenderEvent', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should send a message successfully', async () => {
      sendMessageToQueue.mockResolvedValue({ messageId: '12345' })

      const response = await sqsSenderEvent()

      expect(response.statusCode).toBe(200)
      expect(response.body).toContain('Message sent')
    })

    it('should return a 500 error if sending message fails', async () => {
      sendMessageToQueue.mockRejectedValue(new Error('Failed to send message'))

      const response = await sqsSenderEvent()

      expect(response.statusCode).toBe(500)
      expect(response.body).toContain('Failed to send message')
      expect(sendMessageToQueue).toHaveBeenCalled()
    })
  })
})
