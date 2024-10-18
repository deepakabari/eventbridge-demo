import _ from 'lodash'
import config from '../../config/default.js'
import { receiveMessagesFromQueue, deleteMessageFromQueue } from '../services/sqsService.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'

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

      return successResponse('Messages processed', { count: messages.length })
    } else {
      return successResponse('No messages to process')
    }
  } catch (error) {
    console.error('Error receiving or deleting messages:', error)
    return errorResponse(500, 'Failed to process messages')
  }
}
