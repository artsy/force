import {
  ArtworkBuyNow,
  ArtworkBuyNowMakeOffer,
  ArtworkMakeOffer,
  ArtworkOfferableAndInquireable,
  ArtworkSingleEditionHiddenAvailability,
  ArtworkSold,
  ContactForPriceWork,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCommercial"

import {
  OfferOrderWithFailure,
  OfferOrderWithSuccess,
  OrderWithFailure,
  OrderWithSuccess,
} from "Apps/__tests__/Fixtures/Artwork/MutationResults"

import { Button, Toasts, ToastsProvider } from "@artsy/palette"
import { mount } from "enzyme"
import { RelayProp, commitMutation as _commitMutation } from "react-relay"

import { ArtworkSidebarCommercialContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import { mockLocation } from "DevTools/mockLocation"
import { SystemContextProvider } from "System"
import { mediator } from "lib/mediator"
import { withInquiry } from "Components/Inquiry/useInquiry"

const commitMutation = _commitMutation as jest.Mock<any>

const ArtworkSidebarCommercialContainerWithInquiry = withInquiry(
  ArtworkSidebarCommercialContainer
)
// TODO: Migrate these tests from Enzyme to React Testing Library
// If you find yourself needing to add a new test to ArtworkSidebarCommercial please do it
// using RTL in src/Apps/Artwork/Components/ArtworkSidebar/__tests__/ArtworkSidebarCommercial2.jest.tsx
describe("ArtworkSidebarCommercial", () => {
  let user
  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  const getWrapper = (artwork, otherProps = {}) => {
    return mount(
      <SystemContextProvider>
        <ToastsProvider>
          <Toasts />
          <ArtworkSidebarCommercialContainerWithInquiry
            artworkID={artwork.internalID}
            artwork={artwork}
            user={user}
            mediator={mediator}
            relay={{ environment: {} } as RelayProp}
            {...otherProps}
          />
        </ToastsProvider>
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
    user = { id: "blah" }
    window.history.pushState({}, "Artwork Title", "/artwork/the-id")
    commitMutation.mockReset()
  })

  describe("authentication", () => {
    beforeEach(() => {
      user = undefined
    })

    it("opens auth modal with expected args when clicking 'buy now' button", () => {
      const component = getWrapper(ArtworkBuyNow)
      component.find(Button).simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        mode: "signup",
        redirectTo: "http://localhost/artwork/the-id",
        contextModule: "artworkSidebar",
        intent: "buyNow",
      })
    })

    it("opens auth modal with expected args when clicking 'make offer' button", () => {
      const component = getWrapper(ArtworkMakeOffer)
      component.find(Button).simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        mode: "signup",
        redirectTo: "http://localhost/artwork/the-id",
        contextModule: "artworkSidebar",
        intent: "makeOffer",
      })
    })
  })

  it("displays single editioned hidden availability inquire work", async () => {
    const artwork = Object.assign({}, ArtworkSingleEditionHiddenAvailability)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).not.toContain("20 × 24 in")
    expect(wrapper.text()).not.toContain("50.8 × 61 cm")
    expect(wrapper.text()).toContain("Contact Gallery")
  })

  it("displays artwork enrolled in Buy Now", async () => {
    const artwork = Object.assign({}, ArtworkBuyNow)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Purchase")
  })

  it("displays sold acquireable artwork", async () => {
    const artwork = Object.assign({}, ArtworkSold)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Sold")
  })

  it("displays artwork enrolled in Make Offer", async () => {
    const artwork = Object.assign({}, ArtworkMakeOffer)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Make an Offer")
  })

  it("displays artwork enrolled in Make Offer/Contact Gallery when enabled for both", async () => {
    const artwork = Object.assign({}, ArtworkOfferableAndInquireable)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Make an Offer")
    expect(wrapper.text()).toContain("Contact Gallery")
  })

  it("displays artwork enrolled in both Buy Now and Make Offer", async () => {
    const artwork = Object.assign({}, ArtworkBuyNowMakeOffer)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Purchase")
    expect(wrapper.text()).toContain("Make an Offer")
  })

  it("displays artwork enrolled in contact for price", async () => {
    const artwork = Object.assign({}, ContactForPriceWork)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Price on request")
  })

  it("creates a Buy Now order and redirects to the order page", () => {
    const spy = jest.fn()
    const props = {
      router: {
        push: spy,
      },
    }
    const component = getWrapper(ArtworkBuyNow, props)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OrderWithSuccess)
    })

    component.find(Button).simulate("click")

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith("/orders/orderId")
  })

  it("displays an error toast when a Buy Now mutation fails", () => {
    mockLocation()
    const component = getWrapper(ArtworkBuyNow)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OrderWithFailure)
    })

    component.find(Button).simulate("click")

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(window.location.assign).not.toHaveBeenCalled()

    expect(component.text()).toContain(
      "Something went wrong. Please try again or contact orders@artsy.net."
    )
  })

  it("creates a Make Offer order and redirects to the order offer page", () => {
    const spy = jest.fn()
    const props = {
      router: {
        push: spy,
      },
    }
    const component = getWrapper(ArtworkMakeOffer, props)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OfferOrderWithSuccess)
    })

    component.find(Button).simulate("click")

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith("/orders/orderId/offer")
  })

  it("displays an error modal when a Make Offer mutation fails", () => {
    mockLocation()
    const component = getWrapper(ArtworkMakeOffer)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OfferOrderWithFailure)
    })

    component.find(Button).simulate("click")

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(window.location.assign).not.toHaveBeenCalled()

    expect(component.text()).toContain(
      "Something went wrong. Please try again or contact orders@artsy.net."
    )
  })

  it("displays 'Create Alert' button when artwork is sold", () => {
    const artwork = Object.assign({ is_sold: true }, ArtworkBuyNow)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Create Alert")
  })

  it("hide 'Create Alert' button if there are no associated artists", () => {
    const wrapper = getWrapper({
      ...ArtworkBuyNow,
      is_sold: true,
      artists: [],
    })

    expect(wrapper.text()).not.toContain("Create Alert")
  })
})
