import { buildEventParams } from '../utils/eventParamsBuilder.js'
import { dispatchEventToEventBridge } from '../services/eventDispatcherService.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'
import config from '../../config/default.js'
import _ from 'lodash'

const dispatchEvent = async (event) => {
  let body
  try {
    body = event.body ? JSON.parse(event.body) : { message: 'Hello from EventBridge!' }

    const eventType = body.eventType

    if (!['created', 'updated'].includes(eventType)) {
      return errorResponse(400, 'Invalid eventType. It must be either "created" or "updated".')
    }
    const params = buildEventParams(body.message || 'Hello from EventBridge!', eventType)
    return await dispatchEventToEventBridge(params)
  } catch (error) {
    console.error('Error dispatching event: ', error)
    return errorResponse(500, 'Failed to dispatch event', error.message)
  }
}

export { dispatchEvent }
