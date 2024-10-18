import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import awsClients from '../utils/awsClient.js'
const { s3Client } = awsClients
import { successResponse, errorResponse } from '../utils/responseHandler.js'

export const putObjectService = async (key, content) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: content,
      ContentType: 'text/plain'
    }

    const command = new PutObjectCommand(params)
    const result = await s3Client.send(command)

    return successResponse('File uploaded successfully', result)
  } catch (error) {
    console.error('Error uploading file:', error)
    return errorResponse(500, 'Failed to upload file', error.message)
  }
}

export const getObjectService = async (key) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key
    }

    const command = new GetObjectCommand(params)
    const result = await s3Client.send(command)

    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = []
        stream.on('data', (chunk) => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
      })

    const data = await streamToString(result.Body)
    return successResponse('File retrieved successfully', { data })
  } catch (error) {
    console.error('Error retrieving file:', error)
    return errorResponse(500, 'Failed to retrieve file', error.message)
  }
}

export const deleteObjectService = async (key) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key
    }

    const command = new DeleteObjectCommand(params)
    const result = await s3Client.send(command)

    return successResponse('File deleted successfully', result)
  } catch (error) {
    console.error('Error deleting file:', error)
    return errorResponse(500, 'Failed to delete file', error.message)
  }
}
