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
      sendMessageToQueue.mockResolvedValue([
        { id: '1', body: 'Test Message 1' },
        { id: '2', body: 'Test Message 2' },
        { id: '3', body: 'Test Message 3' }
      ])

      const event = {
        body: JSON.stringify({
          messages: ['Test Message 1', 'Test Message 2', 'Test Message 3']
        })
      }

      const response = await sqsSenderEvent(event)
      console.log('>>>>>>>', response)
      expect(response.statusCode).toBe(200)
      expect(response.body).toContain('Message sent')
    })

    it('should return a 500 error if sending message fails', async () => {
      sendMessageToQueue.mockRejectedValue(new Error('Failed to send message'))

      const event = {
        body: JSON.stringify({
          messages: ['Test Message 1']
        })
      }

      const response = await sqsSenderEvent(event)

      expect(response.statusCode).toBe(500)
      expect(response.body).toContain('Failed to send message')
      expect(sendMessageToQueue).toHaveBeenCalled()
    })

    it('should return a 400 error if no messages are provided', async () => {
      const event = {
        body: JSON.stringify({
          messages: []
        })
      }

      const response = await sqsSenderEvent(event)

      expect(response.statusCode).toBe(400)
      expect(response.body).toContain('No messages provided')
    })

    it('should return a 400 error if too many messages are provided', async () => {
      const event = {
        body: JSON.stringify({
          messages: Array.from({ length: 11 }, (_, i) => `Test Message ${i + 1}`)
        })
      }

      const response = await sqsSenderEvent(event)

      expect(response.statusCode).toBe(400)
      expect(response.body).toContain('Too many messages; limit is 10 per request')
    })
  })
})
