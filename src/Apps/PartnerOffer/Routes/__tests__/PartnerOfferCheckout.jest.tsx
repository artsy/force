import { render } from "@testing-library/react"
import { PartnerOfferCheckout } from "Apps/PartnerOffer/Routes/PartnerOfferCheckout"
import { useSystemContext } from "System/SystemContext"
import { MockEnvironment, createMockEnvironment } from "relay-test-utils"

const mockCommitMutation = jest.fn()
const mockRouterPush = jest.fn()

jest.mock("System/SystemContext")
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  commitMutation: (...args) => mockCommitMutation(...args),
}))
jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({ match: { params: { partnerOfferID: "123" } } }),
}))

describe("PartnerOfferCheckout", () => {
  let relayEnv: MockEnvironment = createMockEnvironment()

  beforeEach(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      router: { push: mockRouterPush },
      relayEnvironment: relayEnv,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("redirects to artwork page if expired_partner_offer", () => {
    mockCommitMutation.mockImplementationOnce((_relayEnv, { onCompleted }) => {
      onCompleted({
        commerceCreatePartnerOfferOrder: {
          orderOrError: {
            error: {
              code: "expired_partner_offer",
              data: JSON.stringify({ artwork_id: "123" }),
            },
          },
        },
      })
    })

    render(<PartnerOfferCheckout />)

    expect(mockCommitMutation).toHaveBeenCalledTimes(1)
    expect(mockCommitMutation).toHaveBeenCalledWith(
      relayEnv,
      expect.objectContaining({
        variables: {
          input: { partnerOfferId: "123" },
        },
      })
    )
    expect(mockRouterPush).toHaveBeenCalledWith("/artwork/123")
  })

  it("redirects to artwork page if not_acquireable", () => {
    mockCommitMutation.mockImplementationOnce((_relayEnv, { onCompleted }) => {
      onCompleted({
        commerceCreatePartnerOfferOrder: {
          orderOrError: {
            error: {
              code: "not_acquireable",
              data: JSON.stringify({ artwork_id: "123" }),
            },
          },
        },
      })
    })

    render(<PartnerOfferCheckout />)

    expect(mockCommitMutation).toHaveBeenCalledTimes(1)
    expect(mockCommitMutation).toHaveBeenCalledWith(
      relayEnv,
      expect.objectContaining({
        variables: {
          input: { partnerOfferId: "123" },
        },
      })
    )
    expect(mockRouterPush).toHaveBeenCalledWith("/artwork/123")
  })

  it("redirects to the order page if successful", () => {
    mockCommitMutation.mockImplementationOnce((_relayEnv, { onCompleted }) => {
      onCompleted({
        commerceCreatePartnerOfferOrder: {
          orderOrError: {
            order: {
              internalID: "123",
              mode: "BUY",
            },
          },
        },
      })
    })

    render(<PartnerOfferCheckout />)

    expect(mockCommitMutation).toHaveBeenCalledTimes(1)
    expect(mockCommitMutation).toHaveBeenCalledWith(
      relayEnv,
      expect.objectContaining({
        variables: {
          input: { partnerOfferId: "123" },
        },
      })
    )
    expect(mockRouterPush).toHaveBeenCalledWith("/orders/123")
  })

  it("redirects to home with any other error", () => {
    mockCommitMutation.mockImplementationOnce((_relayEnv, { onCompleted }) => {
      onCompleted({
        commerceCreatePartnerOfferOrder: {
          orderOrError: {
            error: {
              code: "some_other_error",
              data: JSON.stringify({ artwork_id: "123" }),
            },
          },
        },
      })
    })

    render(<PartnerOfferCheckout />)

    expect(mockCommitMutation).toHaveBeenCalledTimes(1)
    expect(mockCommitMutation).toHaveBeenCalledWith(
      relayEnv,
      expect.objectContaining({
        variables: {
          input: { partnerOfferId: "123" },
        },
      })
    )
    expect(mockRouterPush).toHaveBeenCalledWith("/")
  })
})
