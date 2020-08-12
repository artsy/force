import { mount } from "enzyme"
import React from "react"
import { MoreNavMenu } from "../MoreNavMenu"

jest.mock("v2/Artsy/Analytics/useTracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
}))

describe("MoreNavMenu", () => {
  const getWrapper = () => {
    return mount(<MoreNavMenu />)
  }

  const defaultLinks = [
    ["/viewing-rooms", "Viewing Rooms"],
    ["/galleries", "Galleries"],
    ["/fairs", "Fairs"],
    ["/shows", "Shows"],
    ["/institutions", "Museums"],
    ["/consign", "Consign"],
    ["https://partners.artsy.net", "Artsy for Galleries"],
  ]

  describe("nav structure", () => {
    it("renders the correct items", () => {
      const wrapper = getWrapper()
      const links = wrapper.find("MenuItem")

      defaultLinks.forEach(([href, linkLabel], index) => {
        const navLink = links.at(index)
        expect(href).toEqual(navLink.prop("href"))
        expect(linkLabel).toEqual(navLink.text())
      })
    })
  })
})
