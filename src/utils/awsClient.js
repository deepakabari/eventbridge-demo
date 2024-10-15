import { EventBridgeClient } from '@aws-sdk/client-eventbridge'
import { SQSClient } from '@aws-sdk/client-sqs'
import { SESClient } from '@aws-sdk/client-ses'
import config from '../../config/default.js'
import _ from 'lodash'

const eventBridgeClient = new EventBridgeClient({ region: _.get(config, 'aws.region') })
const sqsClient = new SQSClient({ region: _.get(config, 'aws.region') })
const sesClient = new SESClient({ region: _.get(config, 'aws.region') })

export default { eventBridgeClient, sqsClient, sesClient }
