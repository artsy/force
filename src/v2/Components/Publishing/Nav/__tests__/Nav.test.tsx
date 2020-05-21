import { SponsoredArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Nav } from "../Nav"

describe("Nav", () => {
  it("renders a Nav", () => {
    const nav = renderer.create(<Nav />)
    expect(nav).toMatchSnapshot()
  })
  it("renders a transparent nav", () => {
    const nav = renderer.create(<Nav transparent />)
    expect(nav).toMatchSnapshot()
  })
  it("renders a sponsored nav", () => {
    const nav = renderer.create(<Nav sponsor={SponsoredArticle.sponsor} />)
    expect(nav).toMatchSnapshot()
  })
  it("includes a partner logo in a sponsored nav", () => {
    const nav = mount(<Nav sponsor={SponsoredArticle.sponsor} />)
    expect(nav.html()).toMatch("cloudfront")
    expect(nav.html()).toMatch("Wort-Bildmarke_negative")
  })
  it("renders a custom title", () => {
    const nav = mount(<Nav title="Custom Title" />)
    expect(nav.text()).toMatch("Custom Title")
  })

  it("setPosition sets the state if props.canFix", () => {
    const nav = mount(<Nav />) as any
    nav.instance().setPosition(true)
    expect(nav.state().isFixed).toBe(true)
  })

  it("setPosition does not set state if without props.canFix", () => {
    const nav = mount(<Nav canFix={false} />) as any
    nav.instance().setPosition(true)
    expect(nav.state().isFixed).toBe(false)
  })
})
