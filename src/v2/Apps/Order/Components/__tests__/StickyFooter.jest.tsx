import { SystemContextProvider } from "v2/System"
import { mockTracking } from "v2/System/Analytics"
import { mount } from "enzyme"
import React from "react"
import { StickyFooterWithInquiry, StickyFooter } from "../StickyFooter"
import { mediator } from "lib/mediator"
jest.unmock("react-tracking")

describe("Sticky footer", () => {
  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
  })

  it("handles FAQ modal", () => {
    const component = mount(
      <StickyFooterWithInquiry orderType="OFFER" artworkID="whatever" />
    )

    component.find("Clickable[data-test='help-center-link']").simulate("click")

    expect(window.open).toHaveBeenCalledWith(
      "https://support.artsy.net/hc/en-us/sections/360008203114-Buy-Now-and-Make-Offer",
      "_blank"
    )
  })

  it("handles contact specialist modal", () => {
    const showInquiry = jest.fn()

    const component = mount(
      <SystemContextProvider>
        <StickyFooter
          orderType="OFFER"
          artworkID="whatever"
          showInquiry={showInquiry}
          hideInquiry={jest.fn()}
          isInquiryVisible={false}
          inquiryComponent={<></>}
        />
      </SystemContextProvider>
    )

    component.find("Clickable[data-test='ask-question-link']").simulate("click")

    expect(showInquiry).toHaveBeenCalledWith({ askSpecialist: true })
  })

  it("displays the 'Need help?' message", () => {
    const component = mount(
      <StickyFooterWithInquiry orderType="OFFER" artworkID="whatever" />
    )
    expect(component.text()).toContain(
      "Need help? Visit our help center or ask a question."
    )
  })

  describe("Analytics", () => {
    describe("on a make offer page", () => {
      it("tracks click on 'Read our FAQ'", () => {
        const { Component, dispatch } = mockTracking(StickyFooterWithInquiry)
        const component = mount(
          <Component orderType="OFFER" artworkID="whatever" />
        )
        component
          .find("Clickable[data-test='help-center-link']")
          .simulate("click")
        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          subject: "Visit our help center",
          flow: "make offer",
          type: "button",
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
      })

      it("tracks click on 'ask a question'", () => {
        const { Component, dispatch } = mockTracking(StickyFooterWithInquiry)
        const component = mount(
          <SystemContextProvider>
            <Component orderType="OFFER" artworkID="whatever" />
          </SystemContextProvider>
        )
        component
          .find("Clickable[data-test='ask-question-link']")
          .simulate("click")

        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          subject: "ask a specialist",
          flow: "make offer",
          type: "button",
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
      })
    })

    describe("on a buy now page", () => {
      it("tracks click on 'Read our FAQ'", () => {
        const { Component, dispatch } = mockTracking(StickyFooterWithInquiry)
        const component = mount(
          <Component orderType="BUY" artworkID="whatever" />
        )
        component
          .find("Clickable[data-test='help-center-link']")
          .simulate("click")
        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          subject: "Visit our help center",
          flow: "buy now",
          type: "button",
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
      })

      it("tracks click on 'ask a question'", () => {
        const { Component, dispatch } = mockTracking(StickyFooterWithInquiry)
        const component = mount(
          <SystemContextProvider>
            <Component orderType="BUY" artworkID="whatever" />
          </SystemContextProvider>
        )
        component
          .find("Clickable[data-test='ask-question-link']")
          .simulate("click")

        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          subject: "ask a specialist",
          flow: "buy now",
          type: "button",
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
      })
    })
  })
})
