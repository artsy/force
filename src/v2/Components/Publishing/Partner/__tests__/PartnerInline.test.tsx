import { mockTracking } from "v2/Artsy/Analytics"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { PartnerInline } from "../PartnerInline"

jest.unmock("react-tracking")

const Props = {
  url: "https://qq.com",
  logo:
    "https://artsy-media-uploads.s3.amazonaws.com/kq-CcNCHEgAuPadHtOveeg%2FPlanetArt_Black.png",
}

it("renders artsy logo", () => {
  const wrapper = mount(<PartnerInline {...Props} />)
  const icon = wrapper.find("Icon")
  expect(icon.exists()).toBe(true)
})

it("renders partner logo", () => {
  const wrapper = mount(<PartnerInline {...Props} />)
  const icon = wrapper.find("img").getElement()
  expect(icon.props.src).toMatch("cloudfront")
  expect(icon.props.src).toMatch("PlanetArt_Black")
})

it("track a click event", () => {
  const { Component, dispatch } = mockTracking(PartnerInline)
  const component = mount(<Component {...Props} />)

  component
    .find("a")
    .at(1)
    .simulate("click")

  expect(dispatch).toBeCalledWith({
    action: "Click",
    type: "external_link",
    destination_path: Props.url,
  })
})
