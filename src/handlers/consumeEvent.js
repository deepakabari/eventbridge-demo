import { createResponse } from '../utils/responseHandler.js';

const consumeEvent = async event => {
  console.log('Event received: ', JSON.stringify(event, null, 2));

  const detail = event.detail;

  return createResponse(200, 'Event processed!', { detail });
};

export { consumeEvent };
