import {
  ArtworkBuyNow,
  ArtworkBuyNowMakeOffer,
  ArtworkMakeOffer,
  ArtworkOfferableAndInquireable,
  ArtworkSingleEditionHiddenAvailability,
  ArtworkSold,
  ContactForPriceWork,
  ArtworkOfferableFromInquiryPriceExact,
  ArtworkOfferableFromInquiryPriceRange,
  ArtworkOfferableAndInquireablePriceHidden,
} from "v2/Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCommercial"

import {
  OfferOrderWithFailure,
  OfferOrderWithSuccess,
  OrderWithFailure,
  OrderWithSuccess,
} from "v2/Apps/__tests__/Fixtures/Artwork/MutationResults"

import { Button } from "@artsy/palette"
import { mount } from "enzyme"
import { RelayProp, commitMutation as _commitMutation } from "react-relay"

import { ArtworkSidebarCommercialContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { ModalButton } from "v2/Components/Modal/ModalDialog"
import { mockLocation } from "v2/DevTools/mockLocation"
import { SystemContextProvider } from "v2/System"
import { mediator } from "lib/mediator"
import { withInquiry } from "v2/Components/Inquiry/useInquiry"

const commitMutation = _commitMutation as jest.Mock<any>

const ArtworkSidebarCommercialContainerWithInquiry = withInquiry(
  ArtworkSidebarCommercialContainer
)

describe("ArtworkSidebarCommercial", () => {
  let user
  beforeAll(() => {
    mediator.on("open:auth", () => {})
  })

  const getWrapper = (artwork, otherProps = {}) => {
    return mount(
      <SystemContextProvider>
        <ArtworkSidebarCommercialContainerWithInquiry
          artworkID={artwork.internalID}
          artwork={artwork}
          user={user}
          mediator={mediator}
          relay={{ environment: {} } as RelayProp}
          {...otherProps}
        />
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
  it("displays if the artwork price includes tax", async () => {
    const artwork = Object.assign(
      {},
      {
        ...ArtworkBuyNowMakeOffer,
        priceIncludesTaxDisplay: "VAT included in price",
        is_for_sale: true,
      }
    )

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("VAT included in price")
  })

  it("does not display artwork price includes tax if untrue", async () => {
    const artwork = Object.assign(
      {},
      {
        ...ArtworkSingleEditionHiddenAvailability,
        priceIncludesTaxDisplay: null,
      }
    )

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).not.toContain("VAT included in price")
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

    expect(wrapper.text()).toContain("Buy now")
  })

  it("displays sold acquireable artwork", async () => {
    const artwork = Object.assign({}, ArtworkSold)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Sold")
  })

  it("displays artwork enrolled in Make Offer", async () => {
    const artwork = Object.assign({}, ArtworkMakeOffer)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Make offer")
  })

  it("displays both Make Offer and Contact Gallery CTAs when offerable from inquiry and exact price listed", () => {
    const artwork = Object.assign({}, ArtworkOfferableFromInquiryPriceExact)
    const wrapper = getWrapper(artwork)
    const makeOfferButton = wrapper.find(
      "button[data-test-id='makeOfferButton']"
    )
    const contactGalleryButton = wrapper.find(
      "button[data-test-id='contactGalleryButton']"
    )
    expect(makeOfferButton.text()).toBe("Make offer")
    expect(contactGalleryButton.text()).toBe("Contact Gallery")
  })

  it("displays both Make Offer and Contact Gallery CTAs when offerable from inquiry and price range", () => {
    const artwork = Object.assign({}, ArtworkOfferableFromInquiryPriceRange)
    const wrapper = getWrapper(artwork)
    const makeOfferButton = wrapper.find(
      "button[data-test-id='makeOfferButton']"
    )
    const contactGalleryButton = wrapper.find(
      "button[data-test-id='contactGalleryButton']"
    )

    expect(makeOfferButton.text()).toBe("Make offer")
    expect(contactGalleryButton.text()).toBe("Contact Gallery")
  })

  it("does not display Make Offer CTA and only the Contact Gallery CTA when offerable from inquiry and price hidden", () => {
    const artwork = Object.assign({}, ArtworkOfferableAndInquireablePriceHidden)
    const wrapper = getWrapper(artwork)
    const makeOfferButton = wrapper.find(
      "button[data-test-id='makeOfferButton']"
    )
    const contactGalleryButton = wrapper.find(
      "button[data-test-id='contactGalleryButton']"
    )

    expect(makeOfferButton).toHaveLength(0)
    expect(contactGalleryButton.text()).toBe("Contact Gallery")
  })

  it("displays artwork enrolled in Make Offer when enabled for both make offer and inquiry", async () => {
    const artwork = Object.assign({}, ArtworkOfferableAndInquireable)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Make offer")
    expect(wrapper.text()).not.toContain("Contact Gallery")
  })

  it("displays artwork enrolled in both Buy Now and Make Offer", async () => {
    const artwork = Object.assign({}, ArtworkBuyNowMakeOffer)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Buy now")
    expect(wrapper.text()).toContain("Make offer")
  })

  it("displays artwork enrolled in contact for price", async () => {
    const artwork = Object.assign({}, ContactForPriceWork)

    const wrapper = getWrapper(artwork)

    expect(wrapper.text()).toContain("Contact for Price")
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

  it("displays an error modal when a Buy Now mutation fails", () => {
    mockLocation()
    const component = getWrapper(ArtworkBuyNow)

    commitMutation.mockImplementationOnce((_environment, { onCompleted }) => {
      onCompleted(OrderWithFailure)
    })

    component.find(Button).simulate("click")

    expect(commitMutation).toHaveBeenCalledTimes(1)
    expect(window.location.assign).not.toHaveBeenCalled()

    const errorComponent = component.find(ErrorModal)
    expect(errorComponent.props().show).toBe(true)
    expect(errorComponent.text()).toContain("An error occurred")
    expect(errorComponent.text()).toContain(
      "Something went wrong. Please try again or contact orders@artsy.net."
    )

    component.find(ModalButton).simulate("click")
    expect(component.find(ErrorModal).props().show).toBe(false)
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

    const errorComponent = component.find(ErrorModal)
    expect(errorComponent.props().show).toBe(true)
    expect(errorComponent.text()).toContain("An error occurred")
    expect(errorComponent.text()).toContain(
      "Something went wrong. Please try again or contact orders@artsy.net."
    )

    component.find(ModalButton).simulate("click")
    expect(component.find(ErrorModal).props().show).toBe(false)
  })
})
