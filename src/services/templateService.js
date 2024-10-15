import { CreateTemplateCommand, GetTemplateCommand } from '@aws-sdk/client-ses'
import awsClient from '../utils/awsClient.js'
const { sesClient } = awsClient

export const createOrUpdateTemplate = async (templateData) => {
  const getTemplateCmd = new GetTemplateCommand({
    TemplateName: templateData.Template.TemplateName
  })

  try {
    await sesClient.send(getTemplateCmd)
    console.log('Template already exists.')
  } catch (getTemplateError) {
    if (getTemplateError.name === 'TemplateDoesNotExistException') {
      const createTemplateCmd = new CreateTemplateCommand(templateData)
      await sesClient.send(createTemplateCmd)
      console.log('Template created successfully.')
    } else {
      throw getTemplateError
    }
  }
}
