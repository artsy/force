import { mount } from "enzyme"
import { DateTime, Duration, Settings } from "luxon"
import React from "react"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { CountdownTimer } from "../CountdownTimer"

const DATE = "2018-12-03T13:50:31.641Z"
const SUMMER_DATE = "2018-08-03T13:50:31.641Z"

jest.mock("v2/Utils/getCurrentTimeAsIsoString")
jest.mock("v2/Utils/time")

import { renderUntil } from "v2/DevTools"
import { getOffsetBetweenGravityClock } from "v2/Utils/time"

const mockGetOffsetBetweenGravityClock = getOffsetBetweenGravityClock as jest.Mock
const realSetInterval = global.setInterval

const defaultProps: ExtractProps<typeof CountdownTimer> = {
  action: "Respond",
  note: "Expired offers end the negotiation process permanently.",
  countdownStart: DateTime.fromISO(DATE)
    .minus({ days: 1 })
    .toString(),
  countdownEnd: DateTime.fromISO(DATE)
    .plus({ days: 1 })
    .toString(),
}

const summerProps: typeof defaultProps = {
  ...defaultProps,
  countdownStart: DateTime.fromISO(SUMMER_DATE)
    .minus({ days: 1 })
    .toString(),
  countdownEnd: DateTime.fromISO(SUMMER_DATE)
    .plus({ days: 1 })
    .toString(),
}

const getPropsWithTimeRemaining = duration => ({
  ...defaultProps,
  countdownStart: DateTime.fromISO(DATE)
    .minus({ days: 1 })
    .toString(),
  countdownEnd: DateTime.fromISO(DATE)
    .plus(duration)
    .toString(),
})

describe("CountdownTimer", () => {
  beforeEach(() => {
    require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(DATE)
    mockGetOffsetBetweenGravityClock.mockReturnValue(Promise.resolve(0))
    Settings.defaultZoneName = "America/New_York"
  })

  afterEach(() => {
    global.setInterval = realSetInterval
  })

  describe("in winter", () => {
    it("shows timezone as EST", () => {
      const timer = mount(<CountdownTimer {...defaultProps} />)

      const text = timer.text()
      expect(text).toMatchInlineSnapshot(
        `"Time remaining01d 00h 00m 00s leftRespond by Dec 4, 8:50am ESTExpired offers end the negotiation process permanently."`
      )
    })

    it("shows timezone as UTC in when in UTC", () => {
      Settings.defaultZoneName = "UTC"
      const timer = mount(<CountdownTimer {...defaultProps} />)

      const text = timer.text()
      expect(text).toMatchInlineSnapshot(
        `"Time remaining01d 00h 00m 00s leftRespond by Dec 4, 1:50pm UTCExpired offers end the negotiation process permanently."`
      )
    })
  })

  describe("in summer", () => {
    beforeEach(() => {
      require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(
        SUMMER_DATE
      )
    })
    it("shows timezone as EDT", () => {
      const timer = mount(<CountdownTimer {...summerProps} />)

      const text = timer.text()
      expect(text).toMatchInlineSnapshot(
        `"Time remaining01d 00h 00m 00s leftRespond by Aug 4, 9:50am EDTExpired offers end the negotiation process permanently."`
      )
    })

    it("shows timezone as UTC when in UTC", () => {
      Settings.defaultZoneName = "UTC"
      const timer = mount(<CountdownTimer {...summerProps} />)

      const text = timer.text()
      expect(text).toMatchInlineSnapshot(
        `"Time remaining01d 00h 00m 00s leftRespond by Aug 4, 1:50pm UTCExpired offers end the negotiation process permanently."`
      )
    })
  })

  it("handles gravity time offsets", async () => {
    let timeIsSynced = false
    mockGetOffsetBetweenGravityClock.mockImplementation(async () => {
      timeIsSynced = true
      return 1800 * 1000 // The user's clock is a half hour off of gravity's.
    })

    const timer = await renderUntil(
      _wrapper => timeIsSynced,
      <CountdownTimer {...defaultProps} />
    )

    const text = timer.text()
    expect(text).toMatchInlineSnapshot(
      `"Time remaining01d 00h 00m 00s leftRespond by Dec 4, 8:50am ESTExpired offers end the negotiation process permanently."`
    )
  })

  it("shows the time remaining properly", () => {
    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            Duration.fromObject({ days: 1, hours: 15, minutes: 10, seconds: 5 })
          )}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"Time remaining01d 15h 10m 05s leftRespond by Dec 5, 12:00am ESTExpired offers end the negotiation process permanently."`
    )

    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            Duration.fromObject({ hours: 15, minutes: 10, seconds: 5 })
          )}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"Time remaining00d 15h 10m 05s leftRespond by Dec 4, 12:00am ESTExpired offers end the negotiation process permanently."`
    )

    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            Duration.fromObject({ minutes: 15, seconds: 10 })
          )}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"Time remaining00d 00h 15m 10s leftRespond by Dec 3, 9:05am ESTExpired offers end the negotiation process permanently."`
    )

    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(Duration.fromObject({ seconds: 1 }))}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"Time remaining00d 00h 00m 01s leftRespond by Dec 3, 8:50am ESTExpired offers end the negotiation process permanently."`
    )

    expect(
      mount(
        <CountdownTimer
          {...getPropsWithTimeRemaining(Duration.fromObject({ seconds: -1 }))}
        />
      ).text()
    ).toMatchInlineSnapshot(
      `"Time remaining0 days leftRespond by Dec 3, 8:50am ESTExpired offers end the negotiation process permanently."`
    )
  })
})
