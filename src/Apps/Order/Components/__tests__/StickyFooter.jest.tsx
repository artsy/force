import { SystemContextProvider } from "System/Contexts/SystemContext"
import { useTracking } from "react-tracking"
import { mount } from "enzyme"
import {
  StickyFooterWithInquiry,
  StickyFooter,
} from "Apps/Order/Components/StickyFooter"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("react-tracking")

const trackEvent = jest.fn()

describe("Sticky footer", () => {
  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("handles FAQ modal", () => {
    const component = mount(
      <MockBoot>
        <StickyFooterWithInquiry
          orderType="OFFER"
          artworkID="whatever"
          orderSource="artwork_page"
        />
      </MockBoot>
    )

    component.find("Clickable[data-test='help-center-link']").simulate("click")

    expect(window.open).toHaveBeenCalledWith(
      "https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy",
      "_blank"
    )
  })

  it("handles contact specialist modal", () => {
    const showInquiry = jest.fn()

    const component = mount(
      <MockBoot>
        <SystemContextProvider>
          <StickyFooter
            orderSource="artwork_page"
            orderType="OFFER"
            artworkID="whatever"
            showInquiry={showInquiry}
            hideInquiry={jest.fn()}
            isInquiryVisible={false}
            inquiryComponent={<></>}
          />
        </SystemContextProvider>
      </MockBoot>
    )

    component.find("Clickable[data-test='ask-question-link']").simulate("click")

    expect(showInquiry).toHaveBeenCalledWith({ askSpecialist: true })
  })

  it("displays the 'Need help?' message", () => {
    const component = mount(
      <MockBoot>
        <StickyFooterWithInquiry
          orderSource="artwork_page"
          orderType="OFFER"
          artworkID="whatever"
        />
      </MockBoot>
    )
    expect(component.text()).toContain(
      "Need help? Visit our help center or ask a question."
    )
  })

  describe("for private sale orders", () => {
    it("renders private sale email link", () => {
      const component = mount(
        <MockBoot>
          <StickyFooterWithInquiry
            orderSource="private_sale"
            orderType="BUY"
            artworkID="whatever"
          />
        </MockBoot>
      )
      const privateSalesEmail = component.find(
        "Clickable[data-test='private-sales-email-link']"
      )

      expect(privateSalesEmail).toBeTruthy()
    })
  })

  describe("Analytics", () => {
    describe("on a make offer page", () => {
      it("tracks click on 'Read our FAQ'", () => {
        // const { Component, dispatch } = mockTracking(StickyFooterWithInquiry)
        const component = mount(
          <MockBoot>
            <StickyFooterWithInquiry
              orderSource="artwork_page"
              orderType="OFFER"
              artworkID="whatever"
            />
          </MockBoot>
        )
        component
          .find("Clickable[data-test='help-center-link']")
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          subject: "Visit our help center",
          flow: "make offer",
          type: "button",
        })
      })

      it("tracks click on 'ask a question'", () => {
        const component = mount(
          <MockBoot>
            <SystemContextProvider>
              <StickyFooterWithInquiry
                orderSource="artwork_page"
                orderType="OFFER"
                artworkID="whatever"
              />
            </SystemContextProvider>
          </MockBoot>
        )
        component
          .find("Clickable[data-test='ask-question-link']")
          .simulate("click")

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          subject: "ask a specialist",
          flow: "make offer",
          type: "button",
        })
      })
    })

    describe("on a buy now page", () => {
      it("tracks click on 'Read our FAQ'", () => {
        const component = mount(
          <MockBoot>
            <StickyFooterWithInquiry
              orderSource="artwork_page"
              orderType="BUY"
              artworkID="whatever"
            />
          </MockBoot>
        )
        component
          .find("Clickable[data-test='help-center-link']")
          .simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          subject: "Visit our help center",
          flow: "buy now",
          type: "button",
        })
      })

      it("tracks click on 'ask a question'", () => {
        const component = mount(
          <MockBoot>
            <SystemContextProvider>
              <StickyFooterWithInquiry
                orderSource="artwork_page"
                orderType="BUY"
                artworkID="whatever"
              />
            </SystemContextProvider>
          </MockBoot>
        )
        component
          .find("Clickable[data-test='ask-question-link']")
          .simulate("click")

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "Click",
          subject: "ask a specialist",
          flow: "buy now",
          type: "button",
        })
      })
    })
  })
})
