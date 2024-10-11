import _ from 'lodash'
import config from '../../config/default.js'

export const buildEventParams = (message, eventType) => {
  return {
    Entries: [
      {
        EventBusName: _.get(config, 'defaultBus'),
        Source: _.get(config, 'eventBridgeSource'),
        DetailType: eventType,
        Detail: JSON.stringify({ message, eventType })
      }
    ]
  }
}
