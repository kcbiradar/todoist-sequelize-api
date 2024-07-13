const sendResponse = (response, status_code, message, data = null) => {
  const resObject = {
    status_code: status_code,
    status: status_code < 400 ? "success" : "failed",
    message: message,
  };
  if (status_code < 400) {
    resObject.data = data;
  } else {
    resObject.error = data;
  }
  return response.status(status_code).json(resObject);
};

module.exports = sendResponse;
