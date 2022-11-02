import { shouldDisplayNotification } from "Components/Notifications/util"

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
