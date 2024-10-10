import { buildEventParams } from '../utils/eventParamsBuilder.js'
import { dispatchEventToEventBridge } from '../services/eventDispatcherService.js'
import { createResponse } from '../utils/responseHandler.js'

const dispatchEvent = async (event) => {
  let body
  try {
    body = event.body ? JSON.parse(event.body) : { message: 'Hello from EventBridge Scheduler!' }

    const params = buildEventParams(body.message || 'Hello from EventBridge!')
    return await dispatchEventToEventBridge(params)
  } catch (error) {
    console.error('Error dispatching event: ', error)
    return createResponse(500, 'Failed to dispatch event', { error: error.message })
  }
}

export { dispatchEvent }
