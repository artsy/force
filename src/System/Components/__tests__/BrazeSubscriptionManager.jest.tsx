import { render } from "@testing-library/react"
import { useBrazeSubscription } from "System/Hooks/useBrazeSubscription"
import { BrazeSubscriptionManager } from "../BrazeSubscriptionManager"

jest.mock("System/Hooks/useBrazeSubscription")

const mockUseBrazeSubscription = useBrazeSubscription as jest.Mock

describe("BrazeSubscriptionManager", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("calls useBrazeSubscription hook", () => {
    render(<BrazeSubscriptionManager />)

    expect(mockUseBrazeSubscription).toHaveBeenCalledTimes(1)
  })

  it("renders nothing (returns null)", () => {
    const { container } = render(<BrazeSubscriptionManager />)

    expect(container.firstChild).toBeNull()
  })
})
