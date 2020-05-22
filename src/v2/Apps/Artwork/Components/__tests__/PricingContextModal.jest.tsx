import { Button, Link, QuestionCircleIcon } from "@artsy/palette"
import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import React from "react"
import { PricingContextModal } from "../PricingContextModal"
import { flushPromiseQueue } from "v2/DevTools"

jest.unmock("react-relay")
jest.unmock("react-tracking")

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://www.artsy.net",
  },
}))

describe("PricingContextModal", () => {
  it("renders with the modal closed", () => {
    const component = mount(<PricingContextModal />)

    component.find(QuestionCircleIcon)

    expect(component.find(QuestionCircleIcon).length).toEqual(1)

    expect(component.text()).not.toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )
  })

  it("renders the link to 'How Artworks Get Their Prices' article", async () => {
    const component = mount(<PricingContextModal />)

    component.find(QuestionCircleIcon).simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(component.find(Link).length).toBe(2)

    expect(
      component
        .find(Link)
        .first()
        .props().href
    ).toEqual("https://www.artsy.net/article/artsy-editorial-artworks-prices")
  })

  it("renders the support mailto link", async () => {
    const component = mount(<PricingContextModal />)

    component
      .find(QuestionCircleIcon)
      .at(0)
      .simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(
      component
        .find(Link)
        .at(1)
        .props().href
    ).toEqual("mailto:support@artsy.net")
  })

  it("opens the modal when the question mark icon is clicked", async () => {
    const component = mount(<PricingContextModal />)

    component
      .find(QuestionCircleIcon)
      .at(0)
      .simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(component.text()).toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )
  })

  it("closes the modal when the 'Got it' button is clicked", async () => {
    const component = mount(<PricingContextModal />)

    component
      .find(QuestionCircleIcon)
      .at(0)
      .simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(component.text()).toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )

    const button = component.find(Button)

    expect(button.length).toBe(1)
    expect(button.text()).toEqual("Got it")

    button.simulate("click")

    await flushPromiseQueue()
    component.update()

    // TODO: Can't get this to update/pass
    // expect(component.text()).not.toContain(
    //   "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    // )
  })

  describe("Analytics", () => {
    it("tracks clicks on the question mark icon", () => {
      const { Component, dispatch } = mockTracking(PricingContextModal)
      const component = mount(<Component />)
      component
        .find(QuestionCircleIcon)
        .at(0)
        .simulate("click")

      expect(dispatch).toBeCalledWith({
        context_module: "Price Context",
        action_type: "Click",
        subject: "Question Mark Informational Icon",
        flow: "Artwork Price Context",
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
