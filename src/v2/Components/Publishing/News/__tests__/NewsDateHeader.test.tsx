import { mount } from "enzyme"
import "jest-styled-components"
import { DateTime } from "luxon"
import React from "react"
import renderer from "react-test-renderer"
import { NewsArticle } from "../../../../Components/Publishing/Fixtures/Articles"
import { NewsDateHeader } from "../NewsDateHeader"

describe("NewsDateHeader", () => {
  it("renders a news date header properly", () => {
    const component = renderer
      .create(<NewsDateHeader date={NewsArticle.published_at} />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("Renders 'today' if date is today", () => {
    const date = DateTime.local().toString()
    const wrapper = mount(<NewsDateHeader date={date} />)
    expect(wrapper.text()).toMatch("Today")
  })

  // FIXME: Figure out how to make dates pass CI
  xit("Renders date with no year if in current year", () => {
    const date = DateTime.local()
      .minus({ weeks: 1 })
      .toString()
    const wrapper = mount(<NewsDateHeader date={date} />)
    expect(wrapper.text()).toMatch(DateTime.fromISO(date).toFormat("MMM d"))
    expect(wrapper.text()).not.toMatch(DateTime.fromISO(date).toFormat("yyyy"))
  })

  xit("Renders date with year if not in current year", () => {
    const date = DateTime.local()
      .minus({ years: 1 })
      .toString()
    const wrapper = mount(<NewsDateHeader date={date} />)
    expect(wrapper.text()).toMatch(
      DateTime.fromISO(date).toFormat("MMM d, yyyy")
    )
  })
})
