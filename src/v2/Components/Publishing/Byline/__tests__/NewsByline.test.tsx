import { NewsArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { NewsByline } from "../NewsByline"

describe("News Byline", () => {
  const dateNow = Date.now

  beforeAll(() => {
    Date.now = () => Date.parse("01 Jan 2009 00:00:00 EST")
  })

  afterAll(() => {
    Date.now = dateNow
  })
  it("renders properly", () => {
    const byline = renderer.create(<NewsByline article={NewsArticle} />)
    expect(byline).toMatchSnapshot()
  })

  it("renders without a news source", () => {
    const article = NewsArticle
    article.news_source = {}

    const byline = renderer.create(<NewsByline article={NewsArticle} />)
    expect(byline).toMatchSnapshot()
  })

  it("renders properly when truncated", () => {
    const byline = renderer.create(
      <NewsByline article={NewsArticle} isTruncated />
    )

    expect(byline).toMatchSnapshot()
  })

  it("renders on mobile", () => {
    const byline = renderer.create(
      <NewsByline article={NewsArticle} isMobile />
    )
    expect(byline).toMatchSnapshot()
  })

  it("renders on mobile truncated", () => {
    const byline = renderer.create(
      <NewsByline article={NewsArticle} isMobile isTruncated />
    )
    expect(byline).toMatchSnapshot()
  })

  it("renders author when expanded", () => {
    const component = mount(<NewsByline article={NewsArticle} />)
    expect(component.text()).toMatch("Casey Lesser")
  })

  it("does not render author when truncated", () => {
    const component = mount(<NewsByline article={NewsArticle} isTruncated />)
    expect(component.text()).not.toMatch("Casey Lesser")
  })
})
