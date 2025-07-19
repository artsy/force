import { LiveAuctionToolTip } from "Apps/Auction/Components/AuctionDetails/LiveAuctionToolTip"
import { render } from "@testing-library/react"

describe("LiveAuctionToolTip", () => {
  it("hides tooltip if show=false", () => {
    const { container } = render(<LiveAuctionToolTip show={false} />)
    expect(container.firstChild).toBeFalsy()
  })

  it("shows correct components", () => {
    expect(() => render(<LiveAuctionToolTip show={true} />)).not.toThrow()
  })
})
