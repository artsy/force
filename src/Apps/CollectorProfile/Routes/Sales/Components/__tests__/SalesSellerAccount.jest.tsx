import { SalesSellerAccount } from "Apps/CollectorProfile/Routes/Sales/Components/SalesSellerAccount"
import {
  deleteSellerAccount,
  fetchSellerAccount,
} from "Apps/CollectorProfile/Routes/Sales/Utils/sellerAccount"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

let mockOnboardingProps: { onExit: () => void; onError: () => void }

jest.mock(
  "Apps/CollectorProfile/Routes/Sales/Components/SalesStripeOnboarding",
  () => {
    return {
      SalesStripeOnboarding: props => {
        mockOnboardingProps = props
        return <div>Stripe onboarding</div>
      },
    }
  },
)

jest.mock("Apps/CollectorProfile/Routes/Sales/Utils/sellerAccount", () => {
  return { fetchSellerAccount: jest.fn(), deleteSellerAccount: jest.fn() }
})

jest.mock("System/Hooks/useSystemContext", () => {
  return {
    useSystemContext: () => ({ user: { accessToken: "token" } }),
  }
})

const SELLER_ACCOUNT = {
  id: "1",
  external_id: "acct_123",
  created_at: "2026-11-17T00:00:00Z",
  deactivated_at: null,
  action_needed: false,
}

describe("SalesSellerAccount", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, "error").mockImplementation(() => {})
  })

  describe("with an active seller account", () => {
    beforeEach(() => {
      ;(fetchSellerAccount as jest.Mock).mockResolvedValue(SELLER_ACCOUNT)
    })

    it("shows the Stripe account id and a delete button", async () => {
      render(<SalesSellerAccount />)

      expect(await screen.findByText("acct_123")).toBeInTheDocument()
      expect(screen.getByText("Delete account")).toBeInTheDocument()
      expect(screen.queryByText("Set up payouts")).not.toBeInTheDocument()
      expect(fetchSellerAccount).toHaveBeenCalledWith({ accessToken: "token" })
    })

    it("does not offer to complete payout details when no action is needed", async () => {
      render(<SalesSellerAccount />)

      await screen.findByText("acct_123")

      expect(
        screen.queryByText("Complete payout details"),
      ).not.toBeInTheDocument()
    })

    it("does not offer to complete payout details when Stripe was unreachable", async () => {
      ;(fetchSellerAccount as jest.Mock).mockResolvedValue({
        ...SELLER_ACCOUNT,
        action_needed: null,
      })
      render(<SalesSellerAccount />)

      expect(await screen.findByText("acct_123")).toBeInTheDocument()
      expect(screen.getByText("Delete account")).toBeInTheDocument()
      expect(
        screen.queryByText("Complete payout details"),
      ).not.toBeInTheDocument()
    })

    describe("when action is needed", () => {
      beforeEach(() => {
        ;(fetchSellerAccount as jest.Mock).mockResolvedValue({
          ...SELLER_ACCOUNT,
          action_needed: true,
        })
      })

      it("shows the id, a complete button and a delete button", async () => {
        render(<SalesSellerAccount />)

        expect(await screen.findByText("acct_123")).toBeInTheDocument()
        expect(screen.getByText("Complete payout details")).toBeInTheDocument()
        expect(screen.getByText("Delete account")).toBeInTheDocument()
        expect(screen.queryByText("Set up payouts")).not.toBeInTheDocument()
      })

      it("renders the Stripe onboarding and reloads when it exits", async () => {
        render(<SalesSellerAccount />)

        fireEvent.click(await screen.findByText("Complete payout details"))

        expect(screen.getByText("Stripe onboarding")).toBeInTheDocument()
        ;(fetchSellerAccount as jest.Mock).mockResolvedValue({
          ...SELLER_ACCOUNT,
          action_needed: false,
        })
        mockOnboardingProps.onExit()

        expect(await screen.findByText("acct_123")).toBeInTheDocument()
        expect(screen.queryByText("Stripe onboarding")).not.toBeInTheDocument()
        expect(
          screen.queryByText("Complete payout details"),
        ).not.toBeInTheDocument()
      })
    })

    it("deletes the account and offers to set up payouts again", async () => {
      ;(deleteSellerAccount as jest.Mock).mockResolvedValue(undefined)
      render(<SalesSellerAccount />)

      fireEvent.click(await screen.findByText("Delete account"))

      expect(await screen.findByText("Set up payouts")).toBeInTheDocument()
      expect(deleteSellerAccount).toHaveBeenCalledWith({ accessToken: "token" })
      expect(screen.queryByText("acct_123")).not.toBeInTheDocument()
    })

    it("keeps the account and shows an error when deleting fails", async () => {
      ;(deleteSellerAccount as jest.Mock).mockRejectedValue(new Error("nope"))
      render(<SalesSellerAccount />)

      fireEvent.click(await screen.findByText("Delete account"))

      expect(
        await screen.findByText(/Something went wrong deleting your payout/),
      ).toBeInTheDocument()
      expect(screen.getByText("acct_123")).toBeInTheDocument()
    })
  })

  describe("without an active seller account", () => {
    beforeEach(() => {
      ;(fetchSellerAccount as jest.Mock).mockResolvedValue(null)
    })

    it("shows a button to set up payouts", async () => {
      render(<SalesSellerAccount />)

      expect(await screen.findByText("Set up payouts")).toBeInTheDocument()
      expect(screen.queryByText("Delete account")).not.toBeInTheDocument()
      expect(screen.queryByText("Stripe onboarding")).not.toBeInTheDocument()
    })

    it("renders the Stripe onboarding after clicking the button", async () => {
      render(<SalesSellerAccount />)

      fireEvent.click(await screen.findByText("Set up payouts"))

      expect(screen.getByText("Stripe onboarding")).toBeInTheDocument()
    })

    it("reloads the account when onboarding exits", async () => {
      render(<SalesSellerAccount />)
      fireEvent.click(await screen.findByText("Set up payouts"))
      ;(fetchSellerAccount as jest.Mock).mockResolvedValue(SELLER_ACCOUNT)

      mockOnboardingProps.onExit()

      expect(await screen.findByText("acct_123")).toBeInTheDocument()
      expect(screen.queryByText("Stripe onboarding")).not.toBeInTheDocument()
    })

    it("shows an error when onboarding fails", async () => {
      render(<SalesSellerAccount />)
      fireEvent.click(await screen.findByText("Set up payouts"))

      mockOnboardingProps.onError()

      expect(
        await screen.findByText(/Something went wrong setting up payouts/),
      ).toBeInTheDocument()
      expect(screen.queryByText("Stripe onboarding")).not.toBeInTheDocument()
    })
  })

  it("shows an error when loading the account fails", async () => {
    ;(fetchSellerAccount as jest.Mock).mockRejectedValue(new Error("nope"))
    render(<SalesSellerAccount />)

    await waitFor(() => {
      expect(
        screen.getByText(/Something went wrong loading your payout account/),
      ).toBeInTheDocument()
    })
    expect(screen.queryByText("Set up payouts")).not.toBeInTheDocument()
  })
})
