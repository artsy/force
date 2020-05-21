const actual = require.requireActual("Utils/logger")

export const shouldCaptureError = actual.shouldCaptureError

export const createLogger = jest.fn(() => ({
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}))

export default createLogger
