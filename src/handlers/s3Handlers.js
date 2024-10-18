import { putObjectService, getObjectService, deleteObjectService } from '../services/s3Service.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'

export const putObject = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const { key, content } = body
    const result = await putObjectService(key, content)
    return successResponse('File uploaded successfully', result)
  } catch (error) {
    return errorResponse(500, error.message)
  }
}

export const getObject = async (event) => {
  try {
    const { key } = event.pathParameters
    const result = await getObjectService(key)
    return successResponse('File retrieved successfully', result)
  } catch (error) {
    return errorResponse(500, error.message)
  }
}

export const deleteObject = async (event) => {
  try {
    const { key } = event.pathParameters
    const result = await deleteObjectService(key)
    return successResponse('File deleted successfully', result)
  } catch (error) {
    return errorResponse(500, error.message)
  }
}
