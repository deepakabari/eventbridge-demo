const { buildEventParams } = require('../utils/eventParamsBuilder');
const { dispatchEventToEventBridge } = require('../services/eventDispatcherService');
const { createResponse } = require('../utils/responseHandler');

const dispatchEvent = async event => {
  let body;

  try {
    body = event.body ? JSON.parse(event.body) : { message: 'Hello from EventBridge Scheduler!' };
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return createResponse(400, 'Invalid JSON in request body');
  }

  const params = buildEventParams(body.message || 'Hello from EventBridge!');
  return await dispatchEventToEventBridge(params);
};

module.exports = { dispatchEvent };
