import { useEventTiming } from "../useEventTiming"
import { DateTime } from "luxon"
import { mount } from "enzyme"

type Time = Partial<{
  day: number
  hours: number
  minutes: number
  seconds: number
}>

type WrapperProps = {
  currentTime: Time
  startAt: Time
  endAt: Time
}

const Wrapper = ({ currentTime, startAt, endAt }: WrapperProps) => {
  return (
    <>
      {JSON.stringify(
        useEventTiming({
          currentTime: DateTime.fromObject({
            year: 2000,
            ...currentTime,
          }).toISO(),
          startAt: DateTime.fromObject({
            year: 2000,
            ...startAt,
          }).toISO(),
          endAt: DateTime.fromObject({
            year: 2000,
            ...endAt,
          }).toISO(),
        })
      )}
    </>
  )
}

const renderHook = (props: WrapperProps) =>
  JSON.parse(mount(<Wrapper {...props} />).html())

describe("useEventTiming", () => {
  it("returns the correct values if the event is already over", () => {
    expect(
      renderHook({
        currentTime: { seconds: 21 },
        startAt: { seconds: 0 },
        endAt: { seconds: 20 },
      })
    ).toStrictEqual({
      closesSoon: false,
      closesToday: false,
      daysTilEnd: -0.000011574074074074073,
      durationTilEnd: "PT-1S",
      formattedTime: "Closed",
      hasEnded: true,
      hasStarted: true,
      hours: "00",
      hoursTillEnd: -0.0002777777777777778,
      minutes: "00",
      seconds: "00",
      secondsTilEnd: -1,
    })
  })

  it("returns the correct value if the event is opening soon", () => {
    expect(
      renderHook({
        currentTime: { seconds: 0 },
        startAt: { seconds: 10 },
        endAt: { seconds: 20 },
      })
    ).toStrictEqual({
      closesSoon: false,
      closesToday: true,
      daysTilEnd: 0.0002314814814814815,
      durationTilEnd: "PT20S",
      formattedTime: "Opening Soon",
      hasEnded: false,
      hasStarted: false,
      hours: "00",
      hoursTillEnd: 0.005555555555555556,
      minutes: "00",
      seconds: "20",
      secondsTilEnd: 20,
    })
  })

  it("returns the correct values if the event is ending soon", () => {
    expect(
      renderHook({
        currentTime: { seconds: 10 },
        startAt: { seconds: 0 },
        endAt: { day: 2, seconds: 10 },
      })
    ).toStrictEqual({
      closesSoon: true,
      closesToday: false,
      daysTilEnd: 1,
      durationTilEnd: "PT86400S",
      formattedTime: "Closes in 1 day",
      hasEnded: false,
      hasStarted: true,
      hours: "00",
      hoursTillEnd: 24,
      minutes: "00",
      seconds: "00",
      secondsTilEnd: 86400,
    })
  })

  it("returns the correct values if the event is ending today", () => {
    expect(
      renderHook({
        currentTime: { seconds: 10 },
        startAt: { seconds: 0 },
        endAt: { seconds: 20 },
      })
    ).toStrictEqual({
      closesSoon: false,
      closesToday: true,
      daysTilEnd: 0.00011574074074074075,
      durationTilEnd: "PT10S",
      formattedTime: "Closes in 00 : 00 : 10",
      hasEnded: false,
      hasStarted: true,
      hoursTillEnd: 0.002777777777777778,
      hours: "00",
      minutes: "00",
      seconds: "10",
      secondsTilEnd: 10,
    })
  })
})
