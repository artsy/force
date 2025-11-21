import { render, screen, waitFor } from "@testing-library/react"
import { BankAccountBalanceCheckResult } from "../Order2PollBankAccountBalance"
import { Order2PollBankAccountBalanceRefetchContainer } from "../Order2PollBankAccountBalance"
import type { Order2PollBankAccountBalance_order$data } from "__generated__/Order2PollBankAccountBalance_order.graphql"

jest.useFakeTimers()

describe("Order2PollBankAccountBalance", () => {
  const mockRelay = {
    refetch: jest.fn(),
  }

  const mockOnBalanceCheckComplete = jest.fn()
  const orderId = "order-123"

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
  })

  const createMockOrder = (
    result:
      | "SUFFICIENT"
      | "INSUFFICIENT"
      | "PENDING"
      | "INVALID"
      | "NOT_SUPPORTED"
      | null,
    message?: string,
  ): Order2PollBankAccountBalance_order$data => ({
    internalID: orderId,
    bankAccountBalanceCheck: result
      ? {
          result,
          message: message || null,
        }
      : null,
  })

  it("renders SavingPaymentSpinner", () => {
    const mockOrder = createMockOrder("PENDING")
    render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    expect(screen.getByText(/saving/i)).toBeInTheDocument()
  })

  it("calls refetch every 1 second when result is PENDING", async () => {
    const mockOrder = createMockOrder("PENDING")
    render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    // Advance timer by 1 second
    jest.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(mockRelay.refetch).toHaveBeenCalledTimes(1)
    })

    // Advance another second
    jest.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(mockRelay.refetch).toHaveBeenCalledTimes(2)
    })
  })

  it("calls onBalanceCheckComplete with SUFFICIENT when result is SUFFICIENT", async () => {
    const mockOrder = createMockOrder("SUFFICIENT")
    render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.SUFFICIENT,
      )
    })
  })

  it("calls onBalanceCheckComplete with INSUFFICIENT when result is INSUFFICIENT", async () => {
    const message = "Not enough funds"
    const mockOrder = createMockOrder("INSUFFICIENT", message)
    render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.INSUFFICIENT,
        message,
      )
    })
  })

  it("continues polling when result is PENDING", async () => {
    const mockOrder = createMockOrder("PENDING")
    render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    // Should not call callback immediately for PENDING
    expect(mockOnBalanceCheckComplete).not.toHaveBeenCalled()

    // Should continue polling
    jest.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(mockRelay.refetch).toHaveBeenCalled()
    })
  })

  it("calls onBalanceCheckComplete with OTHER when result is INVALID", async () => {
    const mockOrder = createMockOrder("INVALID")
    render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.OTHER,
      )
    })
  })

  it("calls onBalanceCheckComplete with OTHER when result is NOT_SUPPORTED", async () => {
    const mockOrder = createMockOrder("NOT_SUPPORTED")
    render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.OTHER,
      )
    })
  })

  it("calls onBalanceCheckComplete with TIMEOUT after 10 seconds if still PENDING", async () => {
    const mockOrder = createMockOrder("PENDING")
    render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    // Advance timer by 10 seconds
    jest.advanceTimersByTime(10000)

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.TIMEOUT,
      )
    })
  })

  it("stops polling after receiving a final result", async () => {
    const { rerender } = render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={createMockOrder("PENDING")}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    // Poll once
    jest.advanceTimersByTime(1000)
    await waitFor(() => {
      expect(mockRelay.refetch).toHaveBeenCalledTimes(1)
    })

    // Change to SUFFICIENT
    rerender(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={createMockOrder("SUFFICIENT")}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.SUFFICIENT,
      )
    })

    // Advance timer - should not refetch anymore
    const refetchCountBefore = mockRelay.refetch.mock.calls.length
    jest.advanceTimersByTime(1000)

    // No additional refetch calls
    expect(mockRelay.refetch).toHaveBeenCalledTimes(refetchCountBefore)
  })

  it("calls timeout callback if result arrives after timeout fires", async () => {
    const mockOrder = createMockOrder("PENDING")
    const { rerender } = render(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={mockOrder}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    // Advance past timeout
    jest.advanceTimersByTime(10000)

    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledWith(
        BankAccountBalanceCheckResult.TIMEOUT,
      )
    })

    // Change to SUFFICIENT after timeout
    rerender(
      <Order2PollBankAccountBalanceRefetchContainer
        relay={mockRelay as any}
        orderId={orderId}
        order={createMockOrder("SUFFICIENT")}
        onBalanceCheckComplete={mockOnBalanceCheckComplete}
      />,
    )

    // Timeout already fired, so no additional callback should fire
    // Component should have stopped polling (shouldStopPolling = true)
    // The guard in the useEffect (!shouldStopPolling) prevents the second call
    await waitFor(() => {
      expect(mockOnBalanceCheckComplete).toHaveBeenCalledTimes(1)
    })
  })
})
