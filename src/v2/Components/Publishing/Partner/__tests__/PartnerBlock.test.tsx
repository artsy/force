import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { PartnerBlock } from "../PartnerBlock"

jest.unmock("react-tracking")

const Props = {
  url: "https://qq.com",
  logo:
    "https://artsy-media-uploads.s3.amazonaws.com/kq-CcNCHEgAuPadHtOveeg%2FPlanetArt_Black.png",
}

it("renders partner logo", () => {
  const wrapper = mount(<PartnerBlock {...Props} />)
  const icon = wrapper.find("img").getElement()
  expect(icon.props.src).toMatch("cloudfront")
  expect(icon.props.src).toMatch("PlanetArt_Black")
})

it("track a click event", () => {
  const { Component, dispatch } = mockTracking(PartnerBlock)
  const component = mount(<Component {...Props} />)

  component
    .find("a")
    .at(0)
    .simulate("click")

  expect(dispatch).toBeCalledWith({
    action: "Click",
    type: "external_link",
    destination_path: Props.url,
  })
})
