export default {
  aws: {
    region: process.env.REGION
  },
  stage: process.env.STAGE,
  customBus: process.env.CUSTOM_EVENT_BUS_ARN,
  defaultBus: process.env.DEFAULT_EVENT_BUS_ARN,
  eventBridgeSource: process.env.EVENT_BRIDGE_SOURCE,
  eventType: process.env.EVENT_TYPE,
  sqsQueueUrl: process.env.SQS_QUEUE_URL
}
