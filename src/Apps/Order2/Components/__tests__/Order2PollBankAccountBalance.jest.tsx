import { screen, waitFor } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import {
  BankAccountBalanceCheckResult,
  Order2PollBankAccountBalanceRefetchContainer,
} from "../Order2PollBankAccountBalance"

jest.unmock("react-relay")
jest.useFakeTimers()

describe("Order2PollBankAccountBalance", () => {
  const mockOnBalanceCheckComplete = jest.fn()
  const orderId = "order-123"

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      if (!props.me?.order) return null
      return (
        <Order2PollBankAccountBalanceRefetchContainer
          order={props.me.order}
          orderId={orderId}
          onBalanceCheckComplete={mockOnBalanceCheckComplete}
        />
      )
    },
    query: graphql`
      query Order2PollBankAccountBalanceTestQuery @relay_test_operation {
        me {
          order(id: "order-123") {
            ...Order2PollBankAccountBalance_order
          }
        }
      }
    `,
  })

  it("renders SavingPaymentSpinner", () => {
    renderWithRelay({
      Order: () => ({
        bankAccountBalanceCheck: {
          result: "PENDING",
          message: null,
        },
      }),
    })

    expect(screen.getByText(/saving/i)).toBeInTheDocument()
  })

  it("calls onBalanceCheckComplete with SUFFICIENT when result is SUFFICIENT", async () => {
    renderWithRelay({
      Order: () => ({
        bankAccountBalanceCheck: {
          result: "SUFFICIENT",
          message: null,
        },
      }),
    })

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.SUFFICIENT,
      )
    })
  })

  it("calls onBalanceCheckComplete with INSUFFICIENT when result is INSUFFICIENT", async () => {
    const message = "Not enough funds"
    renderWithRelay({
      Order: () => ({
        bankAccountBalanceCheck: {
          result: "INSUFFICIENT",
          message,
        },
      }),
    })

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.INSUFFICIENT,
        message,
      )
    })
  })

  it("continues polling when result is PENDING", async () => {
    renderWithRelay({
      Order: () => ({
        bankAccountBalanceCheck: {
          result: "PENDING",
          message: null,
        },
      }),
    })

    // Should not call callback immediately for PENDING
    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).not.toHaveBeenCalled()
    })
  })

  it("calls onBalanceCheckComplete with OTHER when result is INVALID", async () => {
    renderWithRelay({
      Order: () => ({
        bankAccountBalanceCheck: {
          result: "INVALID",
          message: null,
        },
      }),
    })

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.OTHER,
      )
    })
  })

  it("calls onBalanceCheckComplete with OTHER when result is NOT_SUPPORTED", async () => {
    renderWithRelay({
      Order: () => ({
        bankAccountBalanceCheck: {
          result: "NOT_SUPPORTED",
          message: null,
        },
      }),
    })

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.OTHER,
      )
    })
  })

  it("calls onBalanceCheckComplete with TIMEOUT after 10 seconds if still PENDING", async () => {
    renderWithRelay({
      Order: () => ({
        bankAccountBalanceCheck: {
          result: "PENDING",
          message: null,
        },
      }),
    })

    // Advance timer by 10 seconds
    jest.advanceTimersByTime(10000)

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.TIMEOUT,
      )
    })
  })
})
