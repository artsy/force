import { useAuctionFormContext } from "Apps/Auction/Hooks/useAuctionFormContext"
import { render, screen } from "@testing-library/react"

import { ErrorStatus } from "Apps/Auction/Components/Form/ErrorStatus"

jest.mock("Apps/Auction/Hooks/useAuctionFormContext")

describe("ErrorStatus", () => {
  const mockuseAuctionFormContext = useAuctionFormContext as jest.Mock
  let status: string | null

  const renderComponent = () => {
    mockuseAuctionFormContext.mockImplementation(() => ({
      status,
    }))
    return render(<ErrorStatus />)
  }

  beforeAll(() => {
    console.error = jest.fn()
  })

  it("does not render if status=null", () => {
    status = null
    const { container } = renderComponent()
    expect(container.firstChild).toBeFalsy()
  })

  it("renders the correct components", () => {
    status = "ERROR"
    renderComponent()
    expect(screen.getByText("Submission Failed")).toBeInTheDocument()
  })

  describe("status messages", () => {
    it("BIDDER_NOT_QUALIFIED", () => {
      status = "BIDDER_NOT_QUALIFIED"
      renderComponent()
      expect(screen.getByText("Bidder Not Qualified")).toBeInTheDocument()
    })

    it("LIVE_BIDDING_STARTED", () => {
      status = "LIVE_BIDDING_STARTED"
      renderComponent()
      expect(screen.getByText("Live Auction in Progress")).toBeInTheDocument()
    })

    it("OUTBID", () => {
      status = "OUTBID"
      renderComponent()
      expect(screen.getByText("Outbid")).toBeInTheDocument()
    })

    it("RESERVE_NOT_MET", () => {
      status = "RESERVE_NOT_MET"
      renderComponent()
      expect(screen.getByText("Reserve Not Met")).toBeInTheDocument()
    })

    it("SALE_CLOSED", () => {
      status = "SALE_CLOSED"
      renderComponent()
      expect(screen.getByText("Sale Closed")).toBeInTheDocument()
    })

    it("LOT_CLOSED", () => {
      status = "LOT_CLOSED"
      renderComponent()
      expect(screen.getByText("Lot Closed")).toBeInTheDocument()
    })

    it("ERROR", () => {
      status = "ERROR"
      renderComponent()
      expect(screen.getByText("Submission Failed")).toBeInTheDocument()
    })

    it("SUBMISSION_FAILED", () => {
      status = "SUBMISSION_FAILED"
      const { container } = renderComponent()
      expect(screen.getByText("Submission Failed")).toBeInTheDocument()
      expect(container.innerHTML).toContain("mailto:support@artsy.net")
    })
  })
})
