import _ from 'lodash'
import config from '../../config/default.js'
import { receiveMessagesFromQueue, deleteMessageFromQueue } from '../services/sqsService.js'
import { createResponse } from '../utils/responseHandler.js'

export const sqsReceiverEvent = async () => {
  try {
    const queueUrl = _.get(config, 'sqsQueueUrl')

    const messages = await receiveMessagesFromQueue(queueUrl)

    if (messages.length) {
      for (const message of messages) {
        console.log('Received message:', message.Body)

        // Delete the message after processing
        await deleteMessageFromQueue(queueUrl, message.ReceiptHandle)
        console.log('Deleted message with receipt handle:', message.ReceiptHandle)
      }

      return createResponse(200, 'Messages processed', { count: messages.length })
    } else {
      return createResponse(200, 'No messages to process')
    }
  } catch (error) {
    console.error('Error receiving or deleting messages:', error)
    return createResponse(500, 'Failed to process messages')
  }
}
