import { AuctionCard_sale$data } from "__generated__/AuctionCard_sale.graphql"
import { DateTime } from "luxon"
import { relativeTime, upcomingLabel } from "../AuctionCard"

const now = () => DateTime.fromISO("2019-04-16").setZone("America/New_York")

describe("relativeTime", () => {
  it("formats properly when >= 1 day", () => {
    expect(
      relativeTime(now().plus({ hours: 25 }), now())
    ).toMatchInlineSnapshot(`"1d"`)
  })

  it("formats properly when >= 1 hours", () => {
    expect(
      relativeTime(now().plus({ minutes: 61 }), now())
    ).toMatchInlineSnapshot(`"1h"`)
  })

  it("formats properly when >= 1 minutes", () => {
    expect(
      relativeTime(now().plus({ seconds: 61 }), now())
    ).toMatchInlineSnapshot(`"1m"`)
  })

  it("formats properly otherwise", () => {
    expect(
      relativeTime(now().plus({ seconds: 1 }), now())
    ).toMatchInlineSnapshot(`"1s"`)
  })
})

describe("upcomingLabel", () => {
  const sale: AuctionCard_sale$data = {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    " $refType": null,
    cover_image: {
      cropped: {
        url: "",
      },
    },
    isBenefit: false,
    isGalleryAuction: false,
    endAt: "",
    href: "",
    slug: "",
    isLiveOpen: false,
    isPreview: false,
    liveStartAt: "",
    registrationStatus: null,
    isRegistrationClosed: false,
    name: "",
    startAt: "",
    isClosed: false,
    partner: {
      name: "",
    },
  }

  it("handles preview sales", () => {
    expect(
      upcomingLabel(
        {
          ...sale,
          isPreview: true,
          startAt: now().plus({ hours: 25 }).toISO(),
        },
        now()
      )
    ).toMatchInlineSnapshot(`"Opens in 1d"`)
  })

  it("handles closed auctions", () => {
    expect(
      upcomingLabel({
        ...sale,
        isClosed: true,
      })
    ).toMatchInlineSnapshot(`"Auction closed"`)
  })

  describe("LAI sales", () => {
    it("handles in-progress sales", () => {
      expect(
        upcomingLabel(
          {
            ...sale,
            isLiveOpen: true,
            liveStartAt: now().minus({ minutes: 1 }).toISO(),
          },
          now()
        )
      ).toMatchInlineSnapshot(`"In progress"`)
    })

    it.skip("handles upcoming sales", () => {
      expect(
        upcomingLabel(
          {
            ...sale,
            liveStartAt: now().plus({ days: 1 }).toISO(),
          },
          now()
        )
      ).toMatchInlineSnapshot(`"Register by Apr 17"`)
    })

    it("handles upcoming sales with closed registration", () => {
      expect(
        upcomingLabel(
          {
            ...sale,
            isRegistrationClosed: true,
            liveStartAt: now().plus({ days: 1 }).toISO(),
          },
          now()
        )
      ).toMatchInlineSnapshot(`"Live in 1d"`)
    })

    it("handles upcoming sales the user is registered for", () => {
      expect(
        upcomingLabel(
          {
            ...sale,
            registrationStatus: { internalID: "" },
            liveStartAt: now().plus({ days: 1 }).toISO(),
          },
          now()
        )
      ).toMatchInlineSnapshot(`"Live in 1d"`)
    })
  })
})
