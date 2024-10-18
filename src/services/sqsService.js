import {
  SendMessageBatchCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand
} from '@aws-sdk/client-sqs'
import awsClients from '../utils/awsClient.js'
import { errorResponse } from '../utils/responseHandler.js'
const { sqsClient } = awsClients

// Send a message to the queue
const sendMessageToQueue = async (queueUrl, messages) => {
  try {
    const entries = messages.map((message, index) => ({
      Id: index.toString(),
      MessageBody: JSON.stringify(message)
    }))

    const params = {
      QueueUrl: queueUrl,
      Entries: entries
    }

    const command = new SendMessageBatchCommand(params)
    const response = await sqsClient.send(command)

    return response.Successful.map(entry => entry.MessageId)
  } catch (error) {
    console.error('Error sending message:', error)
    return errorResponse(500, 'Error sending message:', error)
  }
}

// Receive messages from the queue
const receiveMessagesFromQueue = async (queueUrl) => {
  try {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20
    }

    const command = new ReceiveMessageCommand(params)
    const response = await sqsClient.send(command)
    return response.Messages || []
  } catch (error) {
    console.error('Error receiving messages:', error)
    return errorResponse(500, 'Error receiving messages:', error)
  }
}

// Delete a message from the queue
const deleteMessageFromQueue = async (queueUrl, receiptHandle) => {
  try {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle
    }

    const command = new DeleteMessageCommand(params)
    return await sqsClient.send(command)
  } catch (error) {
    console.error('Error deleting message:', error)
    return errorResponse(500, 'Error deleting message:', error)
  }
}

export { sendMessageToQueue, receiveMessagesFromQueue, deleteMessageFromQueue }
