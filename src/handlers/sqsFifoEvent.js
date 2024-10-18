import { SendMessageCommand } from '@aws-sdk/client-sqs'
import { successResponse, errorResponse } from '../utils/responseHandler.js'
import _ from 'lodash'
import config from '../../config/default.js'
import awsClient from '../utils/awsClient.js'
const { sqsClient } = awsClient

export const sendFifoMessage = async (event) => {
  try {
    const { messages } = JSON.parse(event.body)

    for (const message of messages) {
      const params = {
        MessageBody: message.body,
        QueueUrl: _.get(config, 'sqsFifoQueueUrl'),
        MessageGroupId: message.groupId,
        MessageDeduplicationId: message.id
      }

      const command = new SendMessageCommand(params)
      await sqsClient.send(command)
      console.log(`Sent: ${message.body}`)
    }
    return successResponse('Message sent to SQS FIFO queue!')
  } catch (error) {
    console.error('Error sending message:', error)
    return errorResponse(500, 'Failed to send message')
  }
}

export const receiveFifoMessage = async (event) => {
  const messages = event.Records.map((record) => ({
    messageId: record.messageId,
    body: record.body
  }))

  console.log('Received messages:', messages)

  return successResponse('Messages received:', { messages })
}
