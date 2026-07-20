import {
  PHONE_VALIDATION_TIMEOUT_MS,
  validatePhoneNumber,
} from "Components/Address/utils/utils"
import { sendErrorToService } from "Utils/errors"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"

// The global react-relay mock stubs `fetchQuery` to return undefined; unmock so
// the validation query actually runs against the mock environment below.
jest.unmock("react-relay")

jest.mock("Utils/errors", () => ({
  ...jest.requireActual("Utils/errors"),
  sendErrorToService: jest.fn(),
}))

const mockSendErrorToService = sendErrorToService as jest.Mock

// `validatePhoneNumber` debounces the query by this much before it fires.
const DEBOUNCE_MS = 200

describe("validatePhoneNumber", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    mockSendErrorToService.mockClear()
  })

  it("resolves true when the API reports the number is valid", async () => {
    const env = createMockEnvironment()
    env.mock.queueOperationResolver(operation => {
      return MockPayloadGenerator.generate(operation, {
        PhoneNumberType: () => ({ isValid: true }),
      })
    })

    const promise = validatePhoneNumber(
      { national: "2025550123", regionCode: "us" },
      env,
    )
    await jest.advanceTimersByTimeAsync(DEBOUNCE_MS)

    expect(await promise).toBe(true)
  })

  it("resolves false when the API reports the number is invalid", async () => {
    const env = createMockEnvironment()
    env.mock.queueOperationResolver(operation => {
      return MockPayloadGenerator.generate(operation, {
        PhoneNumberType: () => ({ isValid: false }),
      })
    })

    const promise = validatePhoneNumber(
      { national: "2025550123", regionCode: "us" },
      env,
    )
    await jest.advanceTimersByTimeAsync(DEBOUNCE_MS)

    expect(await promise).toBe(false)
  })

  it("fails open (resolves true) when the request hangs past the timeout", async () => {
    const env = createMockEnvironment()

    // Never resolve the operation, simulating a hung request. The request
    // should time out and fail open rather than blocking indefinitely.
    const promise = validatePhoneNumber(
      { national: "2025550123", regionCode: "us" },
      env,
    )
    await jest.advanceTimersByTimeAsync(
      DEBOUNCE_MS + PHONE_VALIDATION_TIMEOUT_MS,
    )

    expect(await promise).toBe(true)
    expect(env.mock.getAllOperations()).toHaveLength(1)

    // The timeout is reported to Sentry for visibility.
    expect(mockSendErrorToService).toHaveBeenCalledTimes(1)
    expect(mockSendErrorToService.mock.calls[0][0]).toMatchObject({
      message: "Phone number validation timed out",
      metadata: { regionCode: "us", timeoutMs: PHONE_VALIDATION_TIMEOUT_MS },
    })
  })

  it("fails open (resolves true) when the request errors", async () => {
    const env = createMockEnvironment()
    env.mock.queueOperationResolver(() => {
      return new Error("Network error")
    })

    const promise = validatePhoneNumber(
      { national: "2025550123", regionCode: "us" },
      env,
    )
    await jest.advanceTimersByTimeAsync(DEBOUNCE_MS)

    expect(await promise).toBe(true)
  })

  it("resolves false without querying the API when input is too short", async () => {
    const env = createMockEnvironment()

    const promise = validatePhoneNumber(
      { national: "123", regionCode: "us" },
      env,
    )
    await jest.advanceTimersByTimeAsync(DEBOUNCE_MS)

    expect(await promise).toBe(false)
    expect(env.mock.getAllOperations()).toHaveLength(0)
  })
})
