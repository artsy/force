import { SalesStripeOnboarding } from "Apps/CollectorProfile/Routes/Sales/Components/SalesStripeOnboarding"
import { fetchStripeClientSecret } from "Apps/CollectorProfile/Routes/Sales/Utils/fetchStripeClientSecret"
import { loadConnectAndInitialize } from "@stripe/connect-js"
import { act, render } from "@testing-library/react"

let mockOnExit: (() => void) | undefined

jest.mock("@stripe/connect-js", () => {
  return { loadConnectAndInitialize: jest.fn(() => ({})) }
})

jest.mock("@stripe/react-connect-js", () => {
  return {
    ConnectComponentsProvider: ({ children }) => <>{children}</>,
    ConnectAccountOnboarding: ({ onExit }) => {
      mockOnExit = onExit
      return null
    },
  }
})

jest.mock("System/Hooks/useSystemContext", () => {
  return {
    useSystemContext: () => ({ user: { accessToken: "token" } }),
  }
})

jest.mock(
  "Apps/CollectorProfile/Routes/Sales/Utils/fetchStripeClientSecret",
  () => {
    return { fetchStripeClientSecret: jest.fn() }
  },
)

describe("SalesStripeOnboarding", () => {
  const onExit = jest.fn()
  const onError = jest.fn()

  const getFetchClientSecret = () => {
    return (loadConnectAndInitialize as jest.Mock).mock.calls[0][0]
      .fetchClientSecret
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("fetches the client secret with the user’s access token", async () => {
    ;(fetchStripeClientSecret as jest.Mock).mockResolvedValue("secret")
    render(<SalesStripeOnboarding onExit={onExit} onError={onError} />)

    await expect(getFetchClientSecret()()).resolves.toBe("secret")
    expect(fetchStripeClientSecret).toHaveBeenCalledWith({
      accessToken: "token",
    })
    expect(onError).not.toHaveBeenCalled()
  })

  it("reports an error when fetching the client secret fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {})
    ;(fetchStripeClientSecret as jest.Mock).mockRejectedValue(new Error("nope"))
    render(<SalesStripeOnboarding onExit={onExit} onError={onError} />)

    await expect(getFetchClientSecret()()).rejects.toThrow("nope")
    expect(onError).toHaveBeenCalled()
  })

  it("calls onExit when the user exits onboarding", () => {
    render(<SalesStripeOnboarding onExit={onExit} onError={onError} />)

    act(() => {
      mockOnExit?.()
    })

    expect(onExit).toHaveBeenCalled()
  })
})
