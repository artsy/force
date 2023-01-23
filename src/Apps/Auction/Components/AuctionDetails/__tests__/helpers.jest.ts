import {
  formatIsoDateNoZoneOffset,
  generateGoogleCalendarUrl,
  generateIcsCalendarUrl,
} from "Apps/Auction/Components/AuctionDetails/helpers"

describe("AddToCalendar date helpers", () => {
  let event

  beforeEach(() => {
    event = {
      description: "Artsy presents an auction.",
      endDate: new Date("2024-01-11").toISOString(),
      href: "http://artsy.net/auction/auction-slug",
      startDate: new Date("2024-01-10").toISOString(),
      title: "Heritage: Signature Urban Art",
    }
  })

  describe("#generateGoogleCalendarUrl", () => {
    it("Creates a link to open google calendar", () => {
      const link = generateGoogleCalendarUrl(event)
      expect(link).toBe(
        "https://www.google.com/calendar/render?action=TEMPLATE&text=Heritage:%20Signature%20Urban%20Art&dates=20240110T000000Z/20240111T000000Z&details=Artsy%20presents%20an%20auction.%3Cp%3E%3Ca%20href='http://artsy.net/auction/auction-slug'%3Ehttp://artsy.net/auction/auction-slug%3C/a%3E%3C/p%3E&location="
      )
    })

    it("Adds an end date if missing", () => {
      delete event.endDate
      const link = generateGoogleCalendarUrl(event)
      expect(link).toContain("dates=20240110T000000Z/20240110T010000Z")
    })

    it("Inlcudes live auction link if provided", () => {
      event.liveAuctionUrl = "http://live.artsy.net/auction-slug"
      const link = generateGoogleCalendarUrl(event)
      expect(link).toContain("href='http://live.artsy.net/auction-slug'")
    })
  })

  describe("#generateIcsCalendarUrl", () => {
    it("Creates a link to download ics file", () => {
      const link = generateIcsCalendarUrl(event)
      expect(link).toContain(
        "ADTSTART:20240110T000000Z%0ADTEND:20240111T000000Z%0ASUMMARY:Heritage:%20Signature%20Urban%20Art%0AURL:http://artsy.net/auction/auction-slug%0AURL:%0ADESCRIPTION:Artsy%20presents%20an%20auction.%0ALOCATION:%0AEND:VEVENT%0AEND:VCALENDAR"
      )
    })

    it("Adds an end date if missing", () => {
      delete event.endDate
      const link = generateIcsCalendarUrl(event)
      expect(link).toContain("ADTSTART:20240110T000000Z")
      expect(link).toContain("ADTEND:20240110T010000Z")
    })

    it("Inlcudes live auction link if provided", () => {
      event.liveAuctionUrl = "http://live.artsy.net/auction-slug"
      const link = generateIcsCalendarUrl(event)
      expect(link).toContain("AURL:http://live.artsy.net/auction-slug")
    })
  })

  describe("#formatIsoDateNoZoneOffset", () => {
    it("Adds zone difference to a date and returns as ISO string", () => {
      expect(formatIsoDateNoZoneOffset("2024-01-09T11:00:00.000-05:00")).toBe(
        "2024-01-09T16:00:00.000Z"
      )
      expect(formatIsoDateNoZoneOffset("2024-01-09T11:00:00.000+04:00")).toBe(
        "2024-01-09T07:00:00.000Z"
      )
    })

    it("Can add offset hours to a provided date", () => {
      expect(
        formatIsoDateNoZoneOffset("2024-01-09T11:00:00.000+04:00", 12)
      ).toBe("2024-01-09T19:00:00.000Z")
      expect(
        formatIsoDateNoZoneOffset("2024-01-09T11:00:00.000+04:00", -2)
      ).toBe("2024-01-09T05:00:00.000Z")
    })
  })
})
