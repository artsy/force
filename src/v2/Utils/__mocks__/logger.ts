const actual = jest.requireActual("v2/Utils/logger")

export const shouldCaptureError = actual.shouldCaptureError

export const createLogger = jest.fn(() => ({
  error: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
}))

export default createLogger
