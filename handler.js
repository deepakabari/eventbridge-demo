const { EventBridgeClient, PutEventsCommand } = require('@aws-sdk/client-eventbridge');

// Create an instance of the EventBridge client
const eventBridgeClient = new EventBridgeClient({ region: 'ap-south-1' });

module.exports.dispatchEvent = async event => {
  let body;

  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid JSON in request body'
        })
      };
    }
  } else {
    body = { message: 'Hello from EventBridge Scheduler!' };
  }

  // Construct the event to dispatch
  const params = {
    Entries: [
      {
        EventBusName: process.env.DEFAULT_EVENT_BUS_ARN,
        Source: process.env.EVENT_BRIDGE_SOURCE,
        DetailType: process.env.EVENT_TYPE,
        Detail: JSON.stringify({
          message: body.message || 'Hello from EventBridge!'
        })
      }
    ]
  };

  try {
    // Create a command for the PutEvents API call
    const command = new PutEventsCommand(params);
    const result = await eventBridgeClient.send(command);

    console.log('Event dispatched: ', result, params);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Event dispatched successfully!',
        result
      })
    };
  } catch (error) {
    console.error('Error dispatching event: ', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to dispatch event',
        error: error.message
      })
    };
  }
};

module.exports.consumeEvent = async event => {
  console.log('Event received: ', JSON.stringify(event, null, 2));

  const detail = event.detail;

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Event processed!`,
      detail: detail
    })
  };

  return response;
};
