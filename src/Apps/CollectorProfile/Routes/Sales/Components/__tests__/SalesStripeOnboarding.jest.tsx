import { SalesStripeOnboarding } from "Apps/CollectorProfile/Routes/Sales/Components/SalesStripeOnboarding"
import { fetchStripeClientSecret } from "Apps/CollectorProfile/Routes/Sales/Utils/fetchStripeClientSecret"
import { loadConnectAndInitialize } from "@stripe/connect-js/pure"
import { act, render } from "@testing-library/react"

let mockOnExit: (() => void) | undefined
let mockOnLoaderStart: (() => void) | undefined
let mockOnLoadError: (() => void) | undefined

jest.mock("@stripe/connect-js/pure", () => {
  return { loadConnectAndInitialize: jest.fn(() => ({})) }
})

jest.mock("@stripe/react-connect-js", () => {
  return {
    ConnectComponentsProvider: ({ children }) => <>{children}</>,
    ConnectAccountOnboarding: ({ onExit, onLoaderStart, onLoadError }) => {
      mockOnExit = onExit
      mockOnLoaderStart = onLoaderStart
      mockOnLoadError = onLoadError
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
  const onLoaderStart = jest.fn()
  const onLoadError = jest.fn()

  const renderOnboarding = () => {
    return render(
      <SalesStripeOnboarding
        onExit={onExit}
        onLoaderStart={onLoaderStart}
        onLoadError={onLoadError}
      />,
    )
  }

  const getFetchClientSecret = () => {
    return (loadConnectAndInitialize as jest.Mock).mock.calls[0][0]
      .fetchClientSecret
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("fetches the client secret with the user’s access token", async () => {
    ;(fetchStripeClientSecret as jest.Mock).mockResolvedValue("secret")
    renderOnboarding()

    await expect(getFetchClientSecret()()).resolves.toBe("secret")
    expect(fetchStripeClientSecret).toHaveBeenCalledWith({
      accessToken: "token",
    })
    expect(onLoadError).not.toHaveBeenCalled()
  })

  it("reports a load error when fetching the client secret fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {})
    ;(fetchStripeClientSecret as jest.Mock).mockRejectedValue(new Error("nope"))
    renderOnboarding()

    await expect(getFetchClientSecret()()).rejects.toThrow("nope")
    expect(onLoadError).toHaveBeenCalled()
  })

  it("reports to the latest onLoadError, not the first render’s", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {})
    ;(fetchStripeClientSecret as jest.Mock).mockRejectedValue(new Error("nope"))
    const { rerender } = renderOnboarding()
    const latestOnLoadError = jest.fn()

    rerender(
      <SalesStripeOnboarding
        onExit={onExit}
        onLoaderStart={onLoaderStart}
        onLoadError={latestOnLoadError}
      />,
    )

    await expect(getFetchClientSecret()()).rejects.toThrow("nope")
    expect(latestOnLoadError).toHaveBeenCalled()
    expect(onLoadError).not.toHaveBeenCalled()
  })

  it("calls onExit when the user exits onboarding", () => {
    renderOnboarding()

    act(() => {
      mockOnExit?.()
    })

    expect(onExit).toHaveBeenCalled()
  })

  it("calls onLoaderStart when Stripe displays its UI", () => {
    renderOnboarding()

    act(() => {
      mockOnLoaderStart?.()
    })

    expect(onLoaderStart).toHaveBeenCalled()
  })

  it("calls onLoadError when the component fails to load", () => {
    renderOnboarding()

    act(() => {
      mockOnLoadError?.()
    })

    expect(onLoadError).toHaveBeenCalled()
  })
})
