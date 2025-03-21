import { LiveAuctionToolTip } from "Apps/Auction/Components/AuctionDetails/LiveAuctionToolTip"
import { mount } from "enzyme"

describe("LiveAuctionToolTip", () => {
  const getWrapper = props => {
    return mount(<LiveAuctionToolTip {...props} />)
  }

  it("hides tooltip if show=false", () => {
    const wrapper = getWrapper({ show: false })
    expect(wrapper.html()).toBeFalsy()
  })

  it("shows correct components", () => {
    const wrapper = getWrapper({ show: true })
    expect(wrapper.find("Tooltip")).toHaveLength(1)
  })
})
