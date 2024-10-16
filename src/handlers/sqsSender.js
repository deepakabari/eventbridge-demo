import _ from 'lodash'
import { sendMessageToQueue } from '../services/sqsService.js'
import { createResponse } from '../utils/responseHandler.js'
import config from '../../config/default.js'

export const sqsSenderEvent = async (event) => {
  const body = JSON.parse(event.body)
  const messages = _.get(body, 'messages', [])

  if (!messages.length) {
    return createResponse(400, 'No messages provided')
  }

  if (messages.length > 10) {
    return createResponse(400, 'Too many messages; limit is 10 per request')
  }

  const queueUrl = _.get(config, 'sqsQueueUrl')

  try {
    const result = await sendMessageToQueue(queueUrl, messages)
    return createResponse(200, 'Message sent', { messageIds: result })
  } catch (error) {
    console.error('Error sending message:', error)
    return createResponse(500, 'Failed to send message')
  }
}
