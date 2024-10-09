import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SQSClient } from '@aws-sdk/client-sqs';

const eventBridgeClient = new EventBridgeClient({ region: process.env.REGION || 'ap-south-1' });
const sqsClient = new SQSClient({ region: process.env.REGION });

export default { eventBridgeClient, sqsClient };
