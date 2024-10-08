const { PutEventsCommand } = require('@aws-sdk/client-eventbridge');
const eventBridgeClient = require('../utils/eventBridgeClient');
const { createResponse } = require('../utils/responseHandler');

const dispatchEventToEventBridge = async params => {
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

module.exports = { dispatchEventToEventBridge };
