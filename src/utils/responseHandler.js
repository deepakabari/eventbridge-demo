export const successResponse = (message, data = {}) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message,
      data
    }),
  };
};

export const errorResponse = (statusCode, message, error = null) => {
  return {
    statusCode,
    body: JSON.stringify({
      success: false,
      message,
      error: error ? error : undefined,
    }),
  };
};
