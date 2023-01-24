import {
  shouldDisplayNotification,
  hasNewNotifications,
  LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY,
} from "Components/Notifications/util"

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
      artworks: { totalCount: 1 },
    })
    expect(result).toEqual(true)

    const result2 = shouldDisplayNotification({
      notificationType: "ARTWORK_PUBLISHED",
      artworks: { totalCount: 1 },
    })
    expect(result2).toEqual(true)
  })

  it("returns false when notification is artworks based, and has no artworks", () => {
    const result = shouldDisplayNotification({
      notificationType: "ARTWORK_ALERT",
      artworks: { totalCount: 0 },
    })
    expect(result).toEqual(false)
  })
})

describe("hasNewNotifications", () => {
  it("returns false if parameter was not passed", () => {
    let result = hasNewNotifications("")
    expect(result).toEqual(false)
  })

  it("returns true if there were no notifications seen previously", () => {
    const result = hasNewNotifications("2023-01-17T16:58:39Z")
    expect(result).toEqual(true)
  })

  it("compares the datetime of the last seen notification and the passed one", () => {
    window.localStorage.setItem(
      LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY,
      "2023-01-17T16:58:39Z"
    )

    let result = hasNewNotifications("2023-01-15T16:58:39Z")
    expect(result).toEqual(false)

    result = hasNewNotifications("2023-01-18T16:58:39Z")
    expect(result).toEqual(true)

    window.localStorage.removeItem(LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY)
  })
})
