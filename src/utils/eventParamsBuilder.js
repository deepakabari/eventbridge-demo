const buildEventParams = message => {
  return {
    Entries: [
      {
        EventBusName: process.env.DEFAULT_EVENT_BUS_ARN,
        Source: process.env.EVENT_BRIDGE_SOURCE,
        DetailType: process.env.EVENT_TYPE,
        Detail: JSON.stringify({ message })
      }
    ]
  };
};

module.exports = { buildEventParams };
