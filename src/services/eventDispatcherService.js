import { PutEventsCommand } from '@aws-sdk/client-eventbridge';
import awsClients from '../utils/awsClient.js';
const { eventBridgeClient } = awsClients;
import { createResponse } from '../utils/responseHandler.js';

export const dispatchEventToEventBridge = async params => {
  try {
    const command = new PutEventsCommand(params);
    const result = await eventBridgeClient.send(command);
    console.log('Event dispatched successfully: ', result);
    return createResponse(200, 'Event dispatched successfully!', { result });
  } catch (error) {
    console.error('Error dispatching event: ', error);
    return createResponse(500, 'Failed to dispatch event', { error: error.message });
  }
};
