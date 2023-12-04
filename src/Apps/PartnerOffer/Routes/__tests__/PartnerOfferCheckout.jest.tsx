import { render, waitFor } from "@testing-library/react"
import { PartnerOfferCheckout } from "Apps/PartnerOffer/Routes/PartnerOfferCheckout"
import { useSystemContext } from "System/SystemContext"
import { useMutation } from "Utils/Hooks/useMutation"

jest.mock("System/SystemContext")
jest.mock("Utils/Hooks/useMutation")

const mockUseMutation = useMutation as jest.Mock
const submitMutation = jest.fn()
const mockRouterPush = jest.fn()

jest.mock("System/Router/useRouter", () => ({
  useRouter: () => ({ match: { params: { partnerOfferID: "123" } } }),
}))

describe("PartnerOfferCheckout", () => {
  beforeEach(() => {
    mockUseMutation.mockImplementation(() => {
      return { submitMutation }
    })
  })

  beforeEach(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      router: { push: mockRouterPush },
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("redirects to artwork page if expired_partner_offer", async () => {
    submitMutation.mockImplementation(() => {
      return {
        commerceCreatePartnerOfferOrder: {
          orderOrError: {
            error: {
              code: "expired_partner_offer",
              data: JSON.stringify({ artwork_id: "1234" }),
            },
          },
        },
      }
    })

    render(<PartnerOfferCheckout />)

    expect(submitMutation).toHaveBeenCalledTimes(1)
    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: { partnerOfferId: "123" },
        },
      })
    )
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/artwork/1234")
    })
  })

  it("redirects to artwork page if not_acquireable", async () => {
    submitMutation.mockImplementation(() => {
      return {
        commerceCreatePartnerOfferOrder: {
          orderOrError: {
            error: {
              code: "not_acquireable",
              data: JSON.stringify({ artwork_id: "1235" }),
            },
          },
        },
      }
    })

    render(<PartnerOfferCheckout />)

    expect(submitMutation).toHaveBeenCalledTimes(1)
    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: { partnerOfferId: "123" },
        },
      })
    )
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/artwork/1235")
    })
  })

  it("redirects to the order page if successful", async () => {
    submitMutation.mockImplementation(() => {
      return {
        commerceCreatePartnerOfferOrder: {
          orderOrError: {
            order: {
              internalID: "1236",
              mode: "BUY",
            },
          },
        },
      }
    })

    render(<PartnerOfferCheckout />)

    expect(submitMutation).toHaveBeenCalledTimes(1)
    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: { partnerOfferId: "123" },
        },
      })
    )
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/orders/1236")
    })
  })

  it("redirects to home with any other error", async () => {
    submitMutation.mockImplementationOnce(() => {
      return {
        commerceCreatePartnerOfferOrder: {
          orderOrError: {
            error: {
              code: "some_other_error",
              data: JSON.stringify({ artwork_id: "123" }),
            },
          },
        },
      }
    })

    render(<PartnerOfferCheckout />)

    expect(submitMutation).toHaveBeenCalledTimes(1)
    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: { partnerOfferId: "123" },
        },
      })
    )
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/")
    })
  })
})
