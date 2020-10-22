import React from "react"
import { mount } from "enzyme"
import { BannerPopUp, Container } from "../BannerPopUp"
import { mediator } from "lib/mediator"

jest.mock("sharify", () => ({
  data: {
    MARKETING_SIGNUP_MODALS: [
      {
        slug: "ca3",
        copy: "Discover and Buy Works from Art Fairs",
        image: "http://files.artsy.net/images/art-fair.jpg",
      },
    ],
  },
}))

describe("BannerPopUp", () => {
  let props = {
    ctaTitle: "CTA Title",
    ctaImageUrl: "http://image.jpg",
  }

  const getWrapper = props => {
    return mount(<BannerPopUp {...props} />)
  }

  beforeEach(() => {
    jest.spyOn(mediator, "trigger")
  })

  it("renders title and image", () => {
    const component = getWrapper(props)

    expect(component.text()).toMatch(props.ctaTitle)
    expect(component.html()).toMatch(props.ctaImageUrl)
  })

  it("Calls #triggerMarketingModal on click", () => {
    const component = getWrapper(props)
    component.find(Container).simulate("click")
    expect(mediator.trigger).toBeCalledWith("open:auth", {
      copy: "Discover and Buy Works from Art Fairs",
      destination: "https://artsy.net/",
      image: "http://files.artsy.net/images/art-fair.jpg",
      intent: "viewFair",
      mode: "signup",
      contextModule: "bannerPopUp",
    })
  })
})
