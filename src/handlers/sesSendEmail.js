import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createOrUpdateTemplate } from '../services/templateService.js'
import { sendTemplatedEmail } from '../services/emailService.js'
import { buildEmailParams } from '../utils/emailParams.js'
import { errorResponse } from '../utils/responseHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const sesSendEmail = async (event) => {
  try {
    const { firstName, email } = JSON.parse(event.body)
    const templatePath = path.join(__dirname, '..', 'template', 'admin-template.json')
    const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'))

    await createOrUpdateTemplate(templateData)
    const params = buildEmailParams(templateData, firstName, email)
    return await sendTemplatedEmail(params)
  } catch (error) {
    console.error(error)
    return errorResponse(500, error.message)
  }
}
