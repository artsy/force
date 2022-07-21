import { Text } from "@artsy/palette"
import * as renderer from "react-test-renderer"
import { Timer } from "../Timer"

jest.useFakeTimers()

jest.mock("Utils/getCurrentTimeAsIsoString")

require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(
  "2018-05-10T20:22:32.000Z"
)

const getTimerText = timerComponent =>
  // eslint-disable-next-line testing-library/await-async-query
  timerComponent.root.findAllByType(Text)[0].props.children.join("")

describe("when the end date is set", () => {
  it("formats the remaining time in '00d  00h  00m  00s'", () => {
    let timer

    // Thursday, May 14, 2018 10:24:31.000 AM UTC
    timer = renderer.create(<Timer endDate="2018-05-14T10:24:31+00:00" />)
    expect(getTimerText(timer)).toMatch("03d")
    expect(getTimerText(timer)).toMatch("14h")
    expect(getTimerText(timer)).toMatch("01m")
    expect(getTimerText(timer)).toMatch("59s")

    // Thursday, May 10, 2018 8:42:32.000 PM UTC
    timer = renderer.create(<Timer endDate="2018-05-10T20:42:32+00:00" />)
    expect(getTimerText(timer)).toMatch("00d")
    expect(getTimerText(timer)).toMatch("00h")
    expect(getTimerText(timer)).toMatch("20m")
    expect(getTimerText(timer)).toMatch("00s")

    // Thursday, May 10, 2018 8:22:42.000 PM UTC
    timer = renderer.create(<Timer endDate="2018-05-10T20:22:42+00:00" />)
    expect(getTimerText(timer)).toMatch("00d")
    expect(getTimerText(timer)).toMatch("00h")
    expect(getTimerText(timer)).toMatch("0m")
    expect(getTimerText(timer)).toMatch("10s")

    // In the past
    timer = renderer.create(<Timer endDate="2018-04-10T20:22:42+00:00" />)
    expect(getTimerText(timer)).toMatch("00d")
    expect(getTimerText(timer)).toMatch("00h")
    expect(getTimerText(timer)).toMatch("00m")
    expect(getTimerText(timer)).toMatch("00s")
  })

  it("counts down to zero", () => {
    let timer = renderer.create(<Timer endDate="2018-05-14T10:23:10+00:00" />)
    expect(getTimerText(timer)).toMatch("03d")
    expect(getTimerText(timer)).toMatch("14h")
    expect(getTimerText(timer)).toMatch("00m")
    expect(getTimerText(timer)).toMatch("38s")

    timer = renderer.create(<Timer endDate="2018-05-14T10:23:08+00:00" />)
    jest.runOnlyPendingTimers()
    expect(getTimerText(timer)).toMatch("03d")
    expect(getTimerText(timer)).toMatch("14h")
    expect(getTimerText(timer)).toMatch("00m")
    expect(getTimerText(timer)).toMatch("36s")

    timer = renderer.create(<Timer endDate="2018-05-14T10:22:08+00:00" />)
    jest.runOnlyPendingTimers()
    expect(getTimerText(timer)).toMatch("03d")
    expect(getTimerText(timer)).toMatch("13h")
    expect(getTimerText(timer)).toMatch("59m")
    expect(getTimerText(timer)).toMatch("36s")
  })
})

describe("when the start and the end dates are set", () => {
  it("formats the remaining time before start when the start date is in the future", () => {
    let timer

    // Starts Thursday, May 12, 2018 10:24:31.000 AM UTC
    timer = renderer.create(
      <Timer
        startDate="2018-05-12T10:24:31+00:00"
        endDate="2018-05-14T10:24:31+00:00"
      />
    )
    expect(getTimerText(timer)).toMatch("01d")
    expect(getTimerText(timer)).toMatch("14h")
    expect(getTimerText(timer)).toMatch("01m")
    expect(getTimerText(timer)).toMatch("59s")

    // Starts Thursday, May 10, 2018 8:42:32.000 PM UTC
    timer = renderer.create(
      <Timer
        startDate="2018-05-10T20:42:32+00:00"
        endDate="2018-05-12T20:42:32+00:00"
      />
    )
    expect(getTimerText(timer)).toMatch("00d")
    expect(getTimerText(timer)).toMatch("00h")
    expect(getTimerText(timer)).toMatch("20m")
    expect(getTimerText(timer)).toMatch("00s")

    // Starts Thursday, May 10, 2018 8:22:42.000 PM UTC
    timer = renderer.create(
      <Timer
        startDate="2018-05-10T20:22:42+00:00"
        endDate="2018-05-12T20:22:42+00:00"
      />
    )
    expect(getTimerText(timer)).toMatch("00d")
    expect(getTimerText(timer)).toMatch("00h")
    expect(getTimerText(timer)).toMatch("0m")
    expect(getTimerText(timer)).toMatch("10s")
  })

  it("formats the time before sale end when the start date has passed", () => {
    const timer = renderer.create(
      <Timer
        startDate="2018-04-10T20:22:42+00:00"
        endDate="2018-05-10T20:22:42+00:00"
      />
    )
    expect(getTimerText(timer)).toMatch("00d")
    expect(getTimerText(timer)).toMatch("00h")
    expect(getTimerText(timer)).toMatch("0m")
    expect(getTimerText(timer)).toMatch("10s")
  })

  it("counts down to zero when the start date is populated", () => {
    let timer = renderer.create(
      <Timer startDate="2018-05-14T10:23:10+00:00" endDate="" />
    )
    expect(getTimerText(timer)).toMatch("03d")
    expect(getTimerText(timer)).toMatch("14h")
    expect(getTimerText(timer)).toMatch("00m")
    expect(getTimerText(timer)).toMatch("38s")

    timer = renderer.create(
      <Timer startDate="2018-05-14T10:23:08+00:00" endDate="" />
    )
    jest.runOnlyPendingTimers()
    expect(getTimerText(timer)).toMatch("03d")
    expect(getTimerText(timer)).toMatch("14h")
    expect(getTimerText(timer)).toMatch("00m")
    expect(getTimerText(timer)).toMatch("36s")

    timer = renderer.create(
      <Timer startDate="2018-05-14T10:22:08+00:00" endDate="" />
    )
    jest.runOnlyPendingTimers()
    expect(getTimerText(timer)).toMatch("03d")
    expect(getTimerText(timer)).toMatch("13h")
    expect(getTimerText(timer)).toMatch("59m")
    expect(getTimerText(timer)).toMatch("36s")
  })
})
