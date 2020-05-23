import { Link } from "@artsy/palette"
import { SystemContextProvider } from "v2/Artsy"
import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import { StickyFooter } from "../StickyFooter"
jest.unmock("react-tracking")

describe("Sticky footer", () => {
  const mediatorMock = {
    trigger: jest.fn(),
  }

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

    component
      .find("a")
      .at(0)
      .simulate("click")

    expect(window.open).toHaveBeenCalledWith(
      "https://www.artsy.net/buy-now-feature-faq",
      "_blank"
    )
  })

  it("handles contact specialist modal", () => {
    const component = mount(
      <SystemContextProvider mediator={mediatorMock}>
        <StickyFooter orderType="OFFER" artworkId="whatever" />
      </SystemContextProvider>
    )

    component
      .find("a")
      .at(1)
      .simulate("click")

    expect(mediatorMock.trigger).toHaveBeenCalledWith(
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
      "Need help? Read our FAQ or ask a question."
    )
  })

  describe("Analytics", () => {
    describe("on a make offer page", () => {
      it("tracks click on 'Read our FAQ'", () => {
        const { Component, dispatch } = mockTracking(StickyFooter)
        const component = mount(
          <Component orderType="OFFER" artworkId="whatever" />
        )
        component
          .find(Link)
          .at(0)
          .simulate("click")
        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          subject: "read faq",
          flow: "make offer",
          type: "button",
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
      })

      it("tracks click on 'ask a question'", () => {
        const { Component, dispatch } = mockTracking(StickyFooter)
        const component = mount(
          <SystemContextProvider mediator={mediatorMock}>
            <Component orderType="OFFER" artworkId="whatever" />
          </SystemContextProvider>
        )
        component
          .find(Link)
          .last()
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
        const { Component, dispatch } = mockTracking(StickyFooter)
        const component = mount(
          <Component orderType="BUY" artworkId="whatever" />
        )
        component
          .find(Link)
          .at(0)
          .simulate("click")
        expect(dispatch).toBeCalledWith({
          action_type: "Click",
          subject: "read faq",
          flow: "buy now",
          type: "button",
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
      })

      it("tracks click on 'ask a question'", () => {
        const { Component, dispatch } = mockTracking(StickyFooter)
        const component = mount(
          <SystemContextProvider mediator={mediatorMock}>
            <Component orderType="BUY" artworkId="whatever" />
          </SystemContextProvider>
        )
        component
          .find(Link)
          .last()
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
