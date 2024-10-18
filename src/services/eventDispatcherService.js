import { PutEventsCommand } from '@aws-sdk/client-eventbridge'
import awsClients from '../utils/awsClient.js'
const { eventBridgeClient } = awsClients
import { successResponse, errorResponse } from '../utils/responseHandler.js'

export const dispatchEventToEventBridge = async (params) => {
  try {
    const command = new PutEventsCommand(params)
    const result = await eventBridgeClient.send(command)
    console.log('Event dispatched successfully: ', result)
    return successResponse('Event dispatched successfully!', result)
  } catch (error) {
    console.error('Error dispatching event: ', error)
    return errorResponse(500, 'Failed to dispatch event', error.message)
  }
}
