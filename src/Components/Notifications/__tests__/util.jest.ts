import { DateTime, Settings } from "luxon"
import {
  getDateLabel,
  shouldDisplayNotification,
} from "Components/Notifications/util"

describe("getDateLabel", () => {
  it("returns 'Today' label", () => {
    const result1 = getDateLabel(DateTime.now().startOf("day").toString())
    expect(result1).toEqual("Today")

    const result2 = getDateLabel(DateTime.now().endOf("day").toString())
    expect(result2).toEqual("Today")

    const result3 = getDateLabel(DateTime.now().toString())
    expect(result3).toEqual("Today")
  })

  it("returns 'x days ago' label", () => {
    const result2 = getDateLabel(DateTime.now().minus({ days: 2 }).toString())
    expect(result2).toEqual("2 days ago")

    const result3 = getDateLabel(DateTime.now().minus({ days: 31 }).toString())
    expect(result3).toEqual("31 days ago")

    const result4 = getDateLabel(DateTime.now().minus({ days: 365 }).toString())
    expect(result4).toEqual("365 days ago")
  })

  it("returns 'Yesterday' label", () => {
    const result1 = getDateLabel(DateTime.now().minus({ days: 1 }).toString())
    expect(result1).toEqual("Yesterday")

    // 00:00:00 today
    const startOfToday = DateTime.now().startOf("day").toMillis()
    Settings.now = () => startOfToday

    // 23:59:59 yesterday
    const endOfPrevDay = DateTime.now().endOf("day").minus({ days: 1 })
    const result2 = getDateLabel(endOfPrevDay.toString())
    expect(result2).toEqual("Yesterday")
  })
})

describe("shouldDisplayNotification", () => {
  it("returns true when notification is not artworks based", () => {
    const result = shouldDisplayNotification({
      notificationType: "VIEWING_ROOM_PUBLISHED",
    })
    expect(result).toEqual(true)
  })

  it("returns true when notification is artworks based, but has artworks", () => {
    const result = shouldDisplayNotification({
      notificationType: "ARTWORK_ALERT",
      artworksConnection: { edges: [{ node: { id: "artwork_id" } }] },
    })
    expect(result).toEqual(true)

    const result2 = shouldDisplayNotification({
      notificationType: "ARTWORK_PUBLISHED",
      artworksConnection: { edges: [{ node: { id: "artwork_id" } }] },
    })
    expect(result2).toEqual(true)
  })

  it("returns false when notification is artworks based, and has no artworks", () => {
    const result = shouldDisplayNotification({
      notificationType: "ARTWORK_ALERT",
      artworksConnection: [],
    })
    expect(result).toEqual(false)
  })
})
