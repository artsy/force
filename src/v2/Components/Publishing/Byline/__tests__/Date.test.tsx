import { getDate } from "v2/Components/Publishing/Constants"
import { mount } from "enzyme"
import "jest-styled-components"
import { DateTime } from "luxon"
import React from "react"
import renderer from "react-test-renderer"
import { Date } from "../Date"

describe("Date", () => {
  const date = "2017-05-19T13:09:18.567Z"

  describe("Snapshots", () => {
    it("renders a date", () => {
      const snapshot = renderer.create(<Date date={date} layout="split" />)
      expect(snapshot).toMatchSnapshot()
    })

    it("renders a condensed date", () => {
      const snapshot = renderer.create(<Date date={date} layout="condensed" />)
      expect(snapshot).toMatchSnapshot()
    })
  })

  describe("Unit", () => {
    it("renders the date", () => {
      const component = mount(<Date date={date} layout="split" />)
      expect(component.text()).toBe("May 19, 2017 9:09am")
    })

    it("renders condensed date", () => {
      const component = mount(<Date date={date} layout="condensed" />)
      expect(component.text()).toBe("May 19, 2017")
    })
  })
})

describe("#getDate", () => {
  const timestamp = "2017-02-22T19:22:05.709Z"
  const expectedFormattedDates = {
    monthYear: "Feb 2017",
    condensed: "Feb 22, 2017",
    verbose: "Feb 22, 2017 at 2:22pm",
    verboseToday: "Today at 2:22pm",
    default: "Feb 22, 2017 2:22pm",
  }

  it("returns the correct date for monthYear format", () => {
    const date = getDate(timestamp, "monthYear")
    expect(date).toEqual(expectedFormattedDates.monthYear)
  })

  it("returns the correct date for condensed format", () => {
    const date = getDate(timestamp, "condensed")
    expect(date).toEqual(expectedFormattedDates.condensed)
  })

  it("returns the correct date for verbose format", () => {
    const date = getDate(timestamp, "verbose")
    expect(date).toEqual(expectedFormattedDates.verbose)
  })

  it("returns the correct date for default format", () => {
    const date = getDate(timestamp, "default")
    expect(date).toEqual(expectedFormattedDates.default)
  })

  // FIXME: Reenable test (fails CI at certain times)
  xit("returns the correct verbose date for same-day timestamps", () => {
    let today = DateTime.local().setZone("America/New_York")
    today = today.set({
      hour: 14,
      minute: 22,
    })

    const date = getDate(today, "verbose")
    expect(date).toEqual(expectedFormattedDates.verboseToday)
  })
})
