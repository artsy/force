import { ContextModule } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { useTracking } from "v2/System"
import { BuyerGuarantee } from "../BuyerGuarantee"

jest.mock("v2/System/Analytics/useTracking")

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
