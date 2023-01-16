import { ContextModule } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useTracking } from "react-tracking"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"

jest.mock("react-tracking")

describe("BuyerGuarantee", () => {
  const trackEvent = jest.fn()
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("when I click on the buyer protection link", () => {
    describe("when the parent specified a context module", () => {
      it("tracks an analytics event", () => {
        render(
          <BuyerGuarantee
            contextModule={ContextModule.ordersShipping}
            contextPageOwnerType="test-owner"
          />
        )

        userEvent.click(screen.getByText("Artsy’s buyer protection."))

        expect(trackEvent).toHaveBeenCalledTimes(1)
        expect(trackEvent.mock.calls[0]).toMatchInlineSnapshot(`
          Array [
            Object {
              "action": "clickedBuyerProtection",
              "context_module": "ordersShipping",
              "context_page_owner_type": "test-owner",
            },
          ]
        `)
      })
    })

    describe("when the parent didn't specify a context module", () => {
      it("does not track an analytics event", () => {
        render(
          <BuyerGuarantee
            contextModule={null as any}
            contextPageOwnerType={null as any}
          />
        )

        userEvent.click(screen.getByText("Artsy’s buyer protection."))

        expect(trackEvent).not.toHaveBeenCalled()
      })
    })
  })
})

describe("with private sale orders", () => {
  beforeEach(() => {
    render(
      <BuyerGuarantee
        contextModule={ContextModule.ordersShipping}
        contextPageOwnerType="test-owner"
        orderSource="private_sale"
      />
    )
  })

  it("renders correct conditions of sale", () => {
    expect(screen.getByText("This purchase is subject to")).toBeInTheDocument()
    expect(
      screen.getByText("Artsy Private Sales LLC Conditions of Sale")
    ).toBeInTheDocument()
  })

  it("renders extra conditions of sale", () => {
    expect(
      screen.getByText("Additional conditions of sale")
    ).toBeInTheDocument()
  })
})
