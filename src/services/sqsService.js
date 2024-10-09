import { SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import awsClients from '../utils/awsClient.js';
const { sqsClient } = awsClients;

// Send a message to the queue
const sendMessageToQueue = async (queueUrl, messageBody) => {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(messageBody)
  };

  const command = new SendMessageCommand(params);
  return await sqsClient.send(command);
};

// Receive messages from the queue
const receiveMessagesFromQueue = async queueUrl => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20
  };

  const command = new ReceiveMessageCommand(params);
  const response = await sqsClient.send(command);
  return response.Messages || [];
};

// Delete a message from the queue
const deleteMessageFromQueue = async (queueUrl, receiptHandle) => {
  const params = {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle
  };

  const command = new DeleteMessageCommand(params);
  return await sqsClient.send(command);
};

export { sendMessageToQueue, receiveMessagesFromQueue, deleteMessageFromQueue };
