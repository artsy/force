import { CascadingEndTimesBanner } from "../CascadingEndTimesBanner"
import { mount } from "enzyme"

describe("CascadingEndTimesBanner", () => {
  describe("explanatory banner for extended end times", () => {
    it("includes banner when extended bidding are enabled", () => {
      const props = {
        cascadingEndTimeIntervalMinutes: 1,
        extendedBiddingIntervalMinutes: 2,
      }
      const getWrapper = () => {
        return mount(<CascadingEndTimesBanner {...props} />)
      }
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain(
        "Closing times may be extended due to last minute competitive bidding"
      )
    })

    it("shows the cascading bidding banner when cascading is enabled but extended bidding is disabled", () => {
      const props = {
        cascadingEndTimeIntervalMinutes: 1,
        extendedBiddingIntervalMinutes: null,
      }
      const getWrapper = () => {
        return mount(<CascadingEndTimesBanner {...props} />)
      }
      const wrapper = getWrapper()
      expect(wrapper.text()).not.toContain(
        "Closing times may be extended due to last minute competitive bidding"
      )
    })
  })
})
