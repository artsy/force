export const formatError = error => {
  const errorMessages = (() => {
    switch (true) {
      case Array.isArray(error): {
        return error.map(e => e.message)
      }
      case typeof error === "string": {
        return [error]
      }
      case error?.message: {
        return [error.message]
      }
    }
  })()

  return errorMessages
}
