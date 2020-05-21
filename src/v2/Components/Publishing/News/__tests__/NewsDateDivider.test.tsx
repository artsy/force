import { mount } from "enzyme"
import "jest-styled-components"
import { DateTime, Settings } from "luxon"
import React from "react"
import renderer from "react-test-renderer"

import { NewsArticle } from "v2/Components/Publishing/Fixtures/Articles"
import { NewsDateDivider } from "../NewsDateDivider"

describe("NewsDateDivider", () => {
  const realNow = Settings.now
  const realDefaultZone = Settings.defaultZoneName

  beforeAll(() => {
    Settings.now = () => new Date("01 Jan 2009 00:00:00 EST").valueOf()
    Settings.defaultZoneName = "America/New_York"
  })

  afterAll(() => {
    Settings.now = realNow
    Settings.defaultZoneName = realDefaultZone
  })

  it("renders a news date header properly", () => {
    const component = renderer
      .create(<NewsDateDivider date={NewsArticle.published_at} />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("Renders 'today' if date is today", () => {
    const date = DateTime.local().toString()
    const wrapper = mount(<NewsDateDivider date={date} />)
    expect(wrapper.text()).toMatch("Today")
  })

  it("Renders date with no year if in current year", () => {
    const date = DateTime.local()
      .plus({ days: 1 })
      .toString()
    const wrapper = mount(<NewsDateDivider date={date} />)
    expect(wrapper.text()).toMatch(DateTime.fromISO(date).toFormat("MMM d"))
    expect(wrapper.text()).not.toMatch(DateTime.fromISO(date).toFormat("yyyy"))
  })

  it("Renders date with year if not in current year", () => {
    const date = DateTime.local()
      .minus({ years: 1 })
      .toString()
    const wrapper = mount(<NewsDateDivider date={date} />)
    expect(wrapper.text()).toMatch(
      DateTime.fromISO(date).toFormat("MMM d, yyyy")
    )
  })
})
