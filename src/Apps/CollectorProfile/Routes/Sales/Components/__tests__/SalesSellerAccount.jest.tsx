import { SalesSellerAccount } from "Apps/CollectorProfile/Routes/Sales/Components/SalesSellerAccount"
import {
  deleteSellerAccount,
  fetchSellerAccount,
} from "Apps/CollectorProfile/Routes/Sales/Utils/sellerAccount"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useEffect } from "react"

let mockOnboardingProps: {
  onExit: () => void
  onLoaderStart: () => void
  onLoadError: () => void
}
let mockOnboardingMounts = 0

jest.mock(
  "Apps/CollectorProfile/Routes/Sales/Components/SalesStripeOnboarding",
  () => {
    return {
      SalesStripeOnboarding: props => {
        mockOnboardingProps = props
        useEffect(() => {
          mockOnboardingMounts += 1
        }, [])
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

// The dialog's confirm button shares its label with the page's delete button
const getConfirmButton = () => {
  return screen.getAllByText("Delete account").slice(-1)[0]
}

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
    mockOnboardingMounts = 0
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

        expect(screen.getByText("Complete payout details")).toBeInTheDocument()
        expect(screen.getByText("Stripe onboarding")).toBeInTheDocument()

        act(() => {
          mockOnboardingProps.onLoaderStart()
        })

        expect(screen.getByText("Stripe onboarding")).toBeInTheDocument()
        expect(screen.queryByText("acct_123")).not.toBeInTheDocument()
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

    it("asks for confirmation before deleting", async () => {
      render(<SalesSellerAccount />)

      fireEvent.click(await screen.findByText("Delete account"))

      expect(screen.getByText("Delete payout account?")).toBeInTheDocument()
      expect(deleteSellerAccount).not.toHaveBeenCalled()
    })

    it("does not delete when the user cancels", async () => {
      render(<SalesSellerAccount />)

      fireEvent.click(await screen.findByText("Delete account"))
      fireEvent.click(screen.getByText("Cancel"))

      expect(
        screen.queryByText("Delete payout account?"),
      ).not.toBeInTheDocument()
      expect(deleteSellerAccount).not.toHaveBeenCalled()
      expect(screen.getByText("acct_123")).toBeInTheDocument()
    })

    it("deletes the account once confirmed and offers to set up payouts again", async () => {
      ;(deleteSellerAccount as jest.Mock).mockResolvedValue(undefined)
      render(<SalesSellerAccount />)

      fireEvent.click(await screen.findByText("Delete account"))
      fireEvent.click(getConfirmButton())

      expect(await screen.findByText("Set up payouts")).toBeInTheDocument()
      expect(deleteSellerAccount).toHaveBeenCalledWith({ accessToken: "token" })
      expect(screen.queryByText("acct_123")).not.toBeInTheDocument()
      expect(
        screen.queryByText("Delete payout account?"),
      ).not.toBeInTheDocument()
    })

    it("keeps the account and shows an error when deleting fails", async () => {
      ;(deleteSellerAccount as jest.Mock).mockRejectedValue(new Error("nope"))
      render(<SalesSellerAccount />)

      fireEvent.click(await screen.findByText("Delete account"))
      fireEvent.click(getConfirmButton())

      expect(
        await screen.findByText(/Something went wrong deleting your payout/),
      ).toBeInTheDocument()
      expect(screen.getByText("acct_123")).toBeInTheDocument()
      expect(
        screen.queryByText("Delete payout account?"),
      ).not.toBeInTheDocument()
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

    it("keeps the clicked button while Stripe loads in the background", async () => {
      render(<SalesSellerAccount />)

      fireEvent.click(await screen.findByText("Set up payouts"))

      expect(screen.getByText("Set up payouts")).toBeInTheDocument()
      expect(screen.getByText("Stripe onboarding")).toBeInTheDocument()
    })

    it("shows only Stripe’s UI once it has started, without remounting it", async () => {
      render(<SalesSellerAccount />)
      fireEvent.click(await screen.findByText("Set up payouts"))

      act(() => {
        mockOnboardingProps.onLoaderStart()
      })

      expect(screen.queryByText("Set up payouts")).not.toBeInTheDocument()
      expect(screen.getByText("Stripe onboarding")).toBeInTheDocument()
      expect(mockOnboardingMounts).toBe(1)
    })

    it("reloads the account when onboarding exits", async () => {
      render(<SalesSellerAccount />)
      fireEvent.click(await screen.findByText("Set up payouts"))
      act(() => {
        mockOnboardingProps.onLoaderStart()
      })
      ;(fetchSellerAccount as jest.Mock).mockResolvedValue(SELLER_ACCOUNT)

      mockOnboardingProps.onExit()

      expect(await screen.findByText("acct_123")).toBeInTheDocument()
      expect(screen.queryByText("Stripe onboarding")).not.toBeInTheDocument()
    })

    it("leaves load errors to Stripe once its UI is showing", async () => {
      render(<SalesSellerAccount />)
      fireEvent.click(await screen.findByText("Set up payouts"))
      act(() => {
        mockOnboardingProps.onLoaderStart()
      })

      act(() => {
        mockOnboardingProps.onLoadError()
      })

      expect(screen.getByText("Stripe onboarding")).toBeInTheDocument()
      expect(
        screen.queryByText(/Something went wrong setting up payouts/),
      ).not.toBeInTheDocument()
    })

    describe("when Stripe never starts", () => {
      afterEach(() => {
        jest.useRealTimers()
      })

      it("shows an error after a timeout", async () => {
        render(<SalesSellerAccount />)
        const button = await screen.findByText("Set up payouts")
        jest.useFakeTimers()
        fireEvent.click(button)

        act(() => {
          jest.advanceTimersByTime(15_000)
        })

        expect(
          screen.getByText(/Something went wrong setting up payouts/),
        ).toBeInTheDocument()
        expect(screen.queryByText("Stripe onboarding")).not.toBeInTheDocument()
      })

      it("does not time out once Stripe has started", async () => {
        render(<SalesSellerAccount />)
        const button = await screen.findByText("Set up payouts")
        jest.useFakeTimers()
        fireEvent.click(button)
        act(() => {
          mockOnboardingProps.onLoaderStart()
        })

        act(() => {
          jest.advanceTimersByTime(30_000)
        })

        expect(screen.getByText("Stripe onboarding")).toBeInTheDocument()
        expect(
          screen.queryByText(/Something went wrong setting up payouts/),
        ).not.toBeInTheDocument()
      })
    })

    it("shows an error when onboarding fails", async () => {
      render(<SalesSellerAccount />)
      fireEvent.click(await screen.findByText("Set up payouts"))

      mockOnboardingProps.onLoadError()

      expect(
        await screen.findByText(/Something went wrong setting up payouts/),
      ).toBeInTheDocument()
      expect(screen.queryByText("Stripe onboarding")).not.toBeInTheDocument()
      expect(screen.getByText("Set up payouts")).toBeInTheDocument()
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
