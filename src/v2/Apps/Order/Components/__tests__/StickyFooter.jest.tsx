import { Link } from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy"
import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import { StickyFooter } from "../StickyFooter"
import { mediator } from "lib/mediator"
jest.unmock("react-tracking")

describe("Sticky footer", () => {
  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
  })
  // FIXME: Reenable when React 16.4.5 is release
  // https://github.com/facebook/react/issues/13150#issuecomment-411134477

  // describe("snapshots", () => {
  //   it("renders the StickyFooter properly", () => {
  //     const component = renderer
  //       .create(
  //         <SystemContextProvider>
  //           <StickyFooter artworkId="whatever" />
  //         </SystemContextProvider>
  //       )
  //       .toJSON()
  //     expect(component).toMatchSnapshot()
  //   })
  // })

  it("handles FAQ modal", () => {
    const component = mount(
      <StickyFooter orderType="OFFER" artworkId="whatever" />
    )

    component.find("a").at(0).simulate("click")

    expect(window.open).toHaveBeenCalledWith(
      "https://support.artsy.net/hc/en-us/sections/360008203114-Buy-Now-and-Make-Offer",
      "_blank"
    )
  })

  it("handles contact specialist modal", () => {
    const component = mount(
      <SystemContextProvider>
        <StickyFooter orderType="OFFER" artworkId="whatever" />
      </SystemContextProvider>
    )

    component.find("a").at(1).simulate("click")

    expect(mediator.trigger).toHaveBeenCalledWith(
      "openOrdersContactArtsyModal",
      {
        artworkId: "whatever",
      }
    )
  })

  it("displays the 'Need help?' message", () => {
    const component = mount(
      <StickyFooter orderType="OFFER" artworkId="whatever" />
    )
    expect(component.text()).toContain(
      "Need help? Visit our help center or ask a question."
    )
  })

  describe("Analytics", () => {
    describe("on a make offer page", () => {
      it("tracks click on 'Read our FAQ'", () => {
        const { Component, dispatch } = mockTracking(StickyFooter)
        const component = mount(
          <Component orderType="OFFER" artworkId="whatever" />
        )
        component.find(Link).at(0).simulate("click")
        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          subject: "Visit our help center",
          flow: "make offer",
          type: "button",
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
      })

      it("tracks click on 'ask a question'", () => {
        const { Component, dispatch } = mockTracking(StickyFooter)
        const component = mount(
          <SystemContextProvider>
            <Component orderType="OFFER" artworkId="whatever" />
          </SystemContextProvider>
        )
        component.find(Link).last().simulate("click")

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
        const { Component, dispatch } = mockTracking(StickyFooter)
        const component = mount(
          <Component orderType="BUY" artworkId="whatever" />
        )
        component.find(Link).at(0).simulate("click")
        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          subject: "Visit our help center",
          flow: "buy now",
          type: "button",
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
      })

      it("tracks click on 'ask a question'", () => {
        const { Component, dispatch } = mockTracking(StickyFooter)
        const component = mount(
          <SystemContextProvider>
            <Component orderType="BUY" artworkId="whatever" />
          </SystemContextProvider>
        )
        component.find(Link).last().simulate("click")

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
