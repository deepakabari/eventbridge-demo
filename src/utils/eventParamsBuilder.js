import _ from 'lodash'
import config from '../../config/default.js'

export const buildEventParams = (message) => {
  return {
    Entries: [
      {
        EventBusName: _.get(config, 'defaultBus'),
        Source: _.get(config, 'eventBridgeSource'),
        DetailType: _.get(config, 'eventType'),
        Detail: JSON.stringify({ message })
      }
    ]
  }
}
