import _ from 'lodash'
import { sendMessageToQueue } from '../services/sqsService.js'
import { createResponse } from '../utils/responseHandler.js'
import config from '../../config/default.js'

export const sqsSenderEvent = async () => {
  const message = {
    id: '12345',
    name: 'Test Message',
    timestamp: Date.now()
  }

  // const queueUrl = process.env.SQS_QUEUE_URL;
  const queueUrl = _.get(config, 'sqsQueueUrl')

  try {
    const result = await sendMessageToQueue(queueUrl, message)
    return createResponse(200, 'Message sent', { messageId: result.MessageId })
  } catch (error) {
    console.error('Error sending message:', error)
    return createResponse(500, 'Failed to send message')
  }
}
