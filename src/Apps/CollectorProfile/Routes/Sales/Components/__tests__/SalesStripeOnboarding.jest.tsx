import { SalesStripeOnboarding } from "Apps/CollectorProfile/Routes/Sales/Components/SalesStripeOnboarding"
import { fetchStripeClientSecret } from "Apps/CollectorProfile/Routes/Sales/Utils/fetchStripeClientSecret"
import { act, render, screen } from "@testing-library/react"
import { loadConnectAndInitialize } from "@stripe/connect-js"

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
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the onboarding section", () => {
    render(<SalesStripeOnboarding />)

    expect(screen.getByText("Set up payouts")).toBeInTheDocument()
  })

  it("fetches the client secret with the user’s access token", async () => {
    ;(fetchStripeClientSecret as jest.Mock).mockResolvedValue("secret")
    render(<SalesStripeOnboarding />)

    const { fetchClientSecret } = (loadConnectAndInitialize as jest.Mock).mock
      .calls[0][0]

    await expect(fetchClientSecret()).resolves.toBe("secret")
    expect(fetchStripeClientSecret).toHaveBeenCalledWith({
      accessToken: "token",
    })
  })

  it("shows an error when fetching the client secret fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {})
    ;(fetchStripeClientSecret as jest.Mock).mockRejectedValue(new Error("nope"))
    render(<SalesStripeOnboarding />)

    const { fetchClientSecret } = (loadConnectAndInitialize as jest.Mock).mock
      .calls[0][0]

    await act(async () => {
      await expect(fetchClientSecret()).rejects.toThrow("nope")
    })

    expect(
      screen.getByText(
        "Something went wrong setting up payouts. Please try again later.",
      ),
    ).toBeInTheDocument()
  })

  it("shows a confirmation when onboarding finishes", () => {
    render(<SalesStripeOnboarding />)

    act(() => {
      mockOnExit?.()
    })

    expect(
      screen.getByText("Your payout account is set up. You’re ready to sell."),
    ).toBeInTheDocument()
  })
})
