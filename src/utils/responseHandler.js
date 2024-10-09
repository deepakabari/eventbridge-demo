export const createResponse = (statusCode, message, data = {}) => ({
  statusCode,
  body: JSON.stringify({
    message,
    ...data
  })
});
