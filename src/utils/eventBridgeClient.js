const { EventBridgeClient } = require('@aws-sdk/client-eventbridge');

const eventBridgeClient = new EventBridgeClient({ region: process.env.AWS_REGION || 'ap-south-1' });

module.exports = eventBridgeClient;
