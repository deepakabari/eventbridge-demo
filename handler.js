const { EventBridgeClient, PutEventsCommand } = require('@aws-sdk/client-eventbridge');

// Create an instance of the EventBridge client
const eventBridgeClient = new EventBridgeClient({ region: 'ap-south-1' });

module.exports.dispatchEvent = async event => {
  const body = JSON.parse(event.body);

  // Construct the event to dispatch
  const params = {
    Entries: [
      {
        EventBusName: 'arn:aws:events:ap-south-1:203918851056:event-bus/dev-test',
        Source: 'testingSource',
        DetailType: 'myEvent',
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
