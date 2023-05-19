import { renderHook } from "@testing-library/react-hooks"
import { fetchQuery } from "react-relay"
import { useAuthValidation } from "Utils/Hooks/useAuthValidation"
import { logout } from "Utils/auth"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.mock("react-relay")
jest.mock("../../auth")

describe("useAuthValidation", () => {
  const mockFetchQuery = fetchQuery as jest.Mock
  const mockLogout = logout as jest.Mock

  beforeEach(() => {
    mockLogout.mockImplementation(() => Promise.resolve())
  })

  afterEach(() => {
    mockFetchQuery.mockClear()
    mockLogout.mockClear()
  })

  it("does nothing if the status is logged in", async () => {
    mockFetchQuery.mockImplementation(() => ({
      toPromise: jest.fn().mockResolvedValue({
        authenticationStatus: "LOGGED_IN",
      }),
    }))

    expect(mockLogout).not.toBeCalled()

    renderHook(() => useAuthValidation())
    await flushPromiseQueue()

    expect(mockLogout).not.toBeCalled()
  })

  it("does nothing if the status is logged out", async () => {
    mockFetchQuery.mockImplementation(() => ({
      toPromise: jest.fn().mockResolvedValue({
        authenticationStatus: "LOGGED_OUT",
      }),
    }))

    expect(mockLogout).not.toBeCalled()

    renderHook(() => useAuthValidation())
    await flushPromiseQueue()

    expect(mockLogout).not.toBeCalled()
  })

  it("logs out the user if the status is invalid", async () => {
    mockFetchQuery.mockImplementation(() => ({
      toPromise: jest.fn().mockResolvedValue({
        authenticationStatus: "INVALID",
      }),
    }))

    expect(mockLogout).not.toBeCalled()

    renderHook(() => useAuthValidation())
    await flushPromiseQueue()

    expect(mockLogout).toBeCalledTimes(1)
  })
})
