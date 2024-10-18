import { SendTemplatedEmailCommand } from '@aws-sdk/client-ses'
import awsClient from '../utils/awsClient.js'
import { errorResponse, successResponse } from '../utils/responseHandler.js'
const { sesClient } = awsClient

export const sendTemplatedEmail = async (params) => {
  const sendEmailCmd = new SendTemplatedEmailCommand(params)
  try {
    const response = await sesClient.send(sendEmailCmd)
    console.log('Email sent response:', response)
    return successResponse('Email sent successfully', response)
  } catch (error) {
    console.error('Error sending email:', error)
    return errorResponse(500, 'Failed to send email.', error.message)
  }
}
