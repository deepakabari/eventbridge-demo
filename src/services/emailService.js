import { SendTemplatedEmailCommand } from '@aws-sdk/client-ses'
import awsClient from '../utils/awsClient.js'
const { sesClient } = awsClient

export const sendTemplatedEmail = async (params) => {
  const sendEmailCmd = new SendTemplatedEmailCommand(params)
  try {
    const response = await sesClient.send(sendEmailCmd)
    console.log('Email sent response:', response)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!', response })
    }
  } catch (sendError) {
    console.error('Error sending email:', sendError)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email.', details: sendError.message })
    }
  }
}
