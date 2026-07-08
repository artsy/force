import { act, renderHook } from "@testing-library/react-hooks"
import { useRespondError } from "Apps/Order2/Routes/Respond/Hooks/useRespondError"

const mockLoggerError = jest.fn()
jest.mock("Utils/logger", () => ({
  __esModule: true,
  default: () => ({ error: (...args: any[]) => mockLoggerError(...args) }),
}))

describe("useRespondError", () => {
  beforeEach(() => {
    mockLoggerError.mockReset()
  })

  it("starts with no error message", () => {
    const { result } = renderHook(() => useRespondError())

    expect(result.current.errorMessage).toBeNull()
  })

  it("logs and surfaces the provided message", () => {
    const { result } = renderHook(() => useRespondError())

    act(() => {
      result.current.handleSubmitError(new Error("boom"), "Offer too low")
    })

    expect(result.current.errorMessage).toBe("Offer too low")
    expect(mockLoggerError).toHaveBeenCalledTimes(1)
  })

  it("falls back to a generic message when none is provided", () => {
    const { result } = renderHook(() => useRespondError())

    act(() => {
      result.current.handleSubmitError(new Error("boom"))
    })

    expect(result.current.errorMessage).toBe(
      "Something went wrong. Please try again.",
    )
    expect(mockLoggerError).toHaveBeenCalledTimes(1)
  })

  it("clears the error message", () => {
    const { result } = renderHook(() => useRespondError())

    act(() => {
      result.current.handleSubmitError(new Error("boom"), "Offer too low")
    })
    act(() => {
      result.current.clearError()
    })

    expect(result.current.errorMessage).toBeNull()
  })
})
