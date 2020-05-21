import { mount, shallow } from "enzyme"
import "jest-styled-components"
import React from "react"

import { MinimalCtaBanner } from "../../../MinimalCtaBanner"
import { StandardArticle } from "../../Fixtures/Articles"
import { BannerWrapper } from "../Banner"

describe("Banner", () => {
  it("it sets state appropriately based on scroll direction", () => {
    const aWindow: any = window

    const wrapper = shallow(<BannerWrapper article={StandardArticle} />)
    const article = wrapper.instance() as any

    // User scrolls back up which should show the banner
    article.handleScroll()
    expect(article.state.showCtaBanner).toBe(false)

    aWindow.scrollY = 500
    article.handleScroll()
    wrapper.update()
    expect(article.state.showCtaBanner).toBe(true)
  })

  it("links to signup with expected URL", () => {
    const wrapper = mount(<BannerWrapper article={StandardArticle} />)
    expect(wrapper.find(MinimalCtaBanner).getElement().props.href).toBe(
      "/sign_up?action=editorialSignup&intent=viewEditorial&contextModule=minimalCTABanner&redirectTo=https%3A%2F%2Fwww.artsy.net%2Farticle%2Fnew-yorks-next-art-district"
    )
  })
})
