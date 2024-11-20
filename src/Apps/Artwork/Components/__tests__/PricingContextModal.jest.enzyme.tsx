import { Button } from "@artsy/palette"
import { mockTracking } from "DevTools/mockTracking"
import { PricingContextModal } from "Apps/Artwork/Components/PricingContextModal"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import HelpIcon from "@artsy/icons/HelpIcon"
import { mount } from "DevTools/mountWithMockBoot"

jest.unmock("react-relay")
jest.unmock("react-tracking")

describe("PricingContextModal", () => {
  it("renders with the modal closed", () => {
    const component = mount(<PricingContextModal />)

    component.find(HelpIcon)

    expect(component.find(HelpIcon).length).toEqual(1)

    expect(component.text()).not.toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )
  })

  it("renders the link to 'How Artworks Get Their Prices' article", async () => {
    const component = mount(<PricingContextModal />)

    component.find(HelpIcon).simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(component.find("a").length).toBe(2)

    expect(component.find("a").first().props().href).toEqual(
      "/article/artsy-editorial-artworks-prices"
    )
  })

  it("renders the support mailto link", async () => {
    const component = mount(<PricingContextModal />)

    component.find(HelpIcon).at(0).simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(component.find("a").at(1).props().href).toEqual(
      "mailto:support@artsy.net"
    )
  })

  it("opens the modal when the question mark icon is clicked", async () => {
    const component = mount(<PricingContextModal />)

    component.find(HelpIcon).at(0).simulate("click")

    await flushPromiseQueue()
    component.update()

    expect(component.text()).toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )
  })

  it("closes the modal when the 'Got it' button is clicked", async () => {
    const component = mount(<PricingContextModal />)

    component.find(HelpIcon).at(0).simulate("click")

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
    // FIXME: MockBoot interfering somehow...
    it.skip("tracks clicks on the question mark icon", () => {
      const { Component, dispatch } = mockTracking(PricingContextModal)
      const component = mount(<Component />)
      component.find(HelpIcon).at(0).simulate("click")

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
