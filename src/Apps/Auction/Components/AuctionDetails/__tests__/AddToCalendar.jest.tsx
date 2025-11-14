import { ContextModule } from "@artsy/cohesion"
import {
  AddToCalendar,
  AddToCalendarLinks,
} from "Apps/Auction/Components/AuctionDetails/AddToCalendar"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { render, screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"

jest.mock("Apps/Auction/Hooks/useAuctionTracking")

describe("AddToCalendar", () => {
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const trackingSpy = jest.fn()

  const props = {
    title: "title",
    startDate: "2020-01-01",
    endDate: "2020-01-02",
    description: "description",
    address: "address",
    href: "href",
    liveAuctionUrl: "liveAuctionUrl",
    contextModule: ContextModule.aboutTheWork,
  }

  beforeAll(() => {
    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        addToCalendar: trackingSpy,
      },
    }))
  })

  it("renders correct components", () => {
    render(<AddToCalendar {...props} />)
    expect(screen.getByText("+ Add to Calendar")).toBeInTheDocument()
  })

  it("computs correct links", () => {
    render(<AddToCalendarLinks {...props} />)
    expect(screen.getByText("Google")).toBeInTheDocument()
    expect(screen.getByText("iCal")).toBeInTheDocument()
    expect(screen.getByText("Outlook")).toBeInTheDocument()
  })

  it("tracks events", () => {
    render(<AddToCalendarLinks {...props} />)

    fireEvent.click(screen.getByText("Google"))
    expect(trackingSpy).toHaveBeenCalledWith({ subject: "google" })

    fireEvent.click(screen.getByText("iCal"))
    expect(trackingSpy).toHaveBeenCalledWith({ subject: "iCal" })

    fireEvent.click(screen.getByText("Outlook"))
    expect(trackingSpy).toHaveBeenCalledWith({ subject: "outlook" })
  })
})
