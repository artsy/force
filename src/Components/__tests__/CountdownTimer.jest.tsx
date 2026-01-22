import { render, waitFor } from "@testing-library/react"
import { CountdownTimer } from "Components/CountdownTimer"
import type { ExtractProps } from "Utils/ExtractProps"
import { DateTime, Duration, Settings } from "luxon"

const DATE = "2018-12-03T13:50:31.641Z"
const SUMMER_DATE = "2018-08-03T13:50:31.641Z"

jest.mock("Utils/getCurrentTimeAsIsoString")
jest.mock("Utils/time")

import { getOffsetBetweenGravityClock } from "Utils/time"

const mockGetOffsetBetweenGravityClock =
  getOffsetBetweenGravityClock as jest.Mock
const realSetInterval = global.setInterval

const defaultProps: ExtractProps<typeof CountdownTimer> = {
  action: "Respond",
  note: "Expired offers end the negotiation process permanently.",
  countdownStart: DateTime.fromISO(DATE).minus({ days: 1 }).toString(),
  countdownEnd: DateTime.fromISO(DATE).plus({ days: 1 }).toString(),
}

const summerProps: typeof defaultProps = {
  ...defaultProps,
  countdownStart: DateTime.fromISO(SUMMER_DATE).minus({ days: 1 }).toString(),
  countdownEnd: DateTime.fromISO(SUMMER_DATE).plus({ days: 1 }).toString(),
}

const getPropsWithTimeRemaining = duration => ({
  ...defaultProps,
  countdownStart: DateTime.fromISO(DATE).minus({ days: 1 }).toString(),
  countdownEnd: DateTime.fromISO(DATE).plus(duration).toString(),
})

describe("CountdownTimer", () => {
  beforeEach(() => {
    require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(DATE)
    mockGetOffsetBetweenGravityClock.mockReturnValue(Promise.resolve(0))
    Settings.defaultZone = "America/New_York"
  })

  afterEach(() => {
    global.setInterval = realSetInterval
  })

  describe("in winter", () => {
    it("shows timezone as EST", () => {
      const { container } = render(<CountdownTimer {...defaultProps} />)

      const text = container.textContent
      expect(text).toMatchInlineSnapshot(
        `"01d 00h 00m 00s leftRespond by Dec 4, 8:50am ESTExpired offers end the negotiation process permanently."`,
      )
    })

    it("shows timezone as UTC in when in UTC", () => {
      Settings.defaultZone = "UTC"
      const { container } = render(<CountdownTimer {...defaultProps} />)

      const text = container.textContent
      expect(text).toMatchInlineSnapshot(
        `"01d 00h 00m 00s leftRespond by Dec 4, 1:50pm UTCExpired offers end the negotiation process permanently."`,
      )
    })
  })

  describe("in summer", () => {
    beforeEach(() => {
      require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(SUMMER_DATE)
    })
    it("shows timezone as EDT", () => {
      const { container } = render(<CountdownTimer {...summerProps} />)

      const text = container.textContent
      expect(text).toMatchInlineSnapshot(
        `"01d 00h 00m 00s leftRespond by Aug 4, 9:50am EDTExpired offers end the negotiation process permanently."`,
      )
    })

    it("shows timezone as UTC when in UTC", () => {
      Settings.defaultZone = "UTC"
      const { container } = render(<CountdownTimer {...summerProps} />)

      const text = container.textContent
      expect(text).toMatchInlineSnapshot(
        `"01d 00h 00m 00s leftRespond by Aug 4, 1:50pm UTCExpired offers end the negotiation process permanently."`,
      )
    })
  })

  it("handles gravity time offsets", async () => {
    let timeIsSynced = false
    mockGetOffsetBetweenGravityClock.mockImplementation(async () => {
      timeIsSynced = true
      return 1800 * 1000 // The user's clock is a half hour off of gravity's.
    })

    const { container } = render(<CountdownTimer {...defaultProps} />)

    await waitFor(() => {
      expect(timeIsSynced).toBe(true)
    })

    const text = container.textContent
    expect(text).toMatchInlineSnapshot(
      `"01d 00h 30m 00s leftRespond by Dec 4, 8:50am ESTExpired offers end the negotiation process permanently."`,
    )
  })

  it("shows the time remaining properly", () => {
    expect(
      render(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            Duration.fromObject({
              days: 1,
              hours: 15,
              minutes: 10,
              seconds: 5,
            }),
          )}
        />,
      ).container.textContent,
    ).toMatchInlineSnapshot(
      `"01d 15h 10m 05s leftRespond by Dec 5, 12:00am ESTExpired offers end the negotiation process permanently."`,
    )

    expect(
      render(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            Duration.fromObject({ hours: 15, minutes: 10, seconds: 5 }),
          )}
        />,
      ).container.textContent,
    ).toMatchInlineSnapshot(
      `"00d 15h 10m 05s leftRespond by Dec 4, 12:00am ESTExpired offers end the negotiation process permanently."`,
    )

    expect(
      render(
        <CountdownTimer
          {...getPropsWithTimeRemaining(
            Duration.fromObject({ minutes: 15, seconds: 10 }),
          )}
        />,
      ).container.textContent,
    ).toMatchInlineSnapshot(
      `"00d 00h 15m 10s leftRespond by Dec 3, 9:05am ESTExpired offers end the negotiation process permanently."`,
    )

    expect(
      render(
        <CountdownTimer
          {...getPropsWithTimeRemaining(Duration.fromObject({ seconds: 1 }))}
        />,
      ).container.textContent,
    ).toMatchInlineSnapshot(
      `"00d 00h 00m 01s leftRespond by Dec 3, 8:50am ESTExpired offers end the negotiation process permanently."`,
    )

    expect(
      render(
        <CountdownTimer
          {...getPropsWithTimeRemaining(Duration.fromObject({ seconds: -1 }))}
        />,
      ).container.textContent,
    ).toMatchInlineSnapshot(
      `"0 days leftRespond by Dec 3, 8:50am ESTExpired offers end the negotiation process permanently."`,
    )
  })
})
