import { mount } from "enzyme"
import { useFormContext } from "Apps/Auction/Hooks/useFormContext"
import { ErrorStatus } from "../ErrorStatus"

jest.mock("Apps/Auction/Hooks/useFormContext")

describe("ErrorStatus", () => {
  const mockUseFormContext = useFormContext as jest.Mock
  let status

  const getWrapper = () => {
    mockUseFormContext.mockImplementation(() => {
      return {
        status,
      }
    })

    return mount(<ErrorStatus />)
  }

  beforeAll(() => {
    console.error = jest.fn()
  })

  it("does not render if status=null", () => {
    status = null
    const wrapper = getWrapper()
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders the correct components", () => {
    status = "ERROR"
    const wrapper = getWrapper()
    expect(wrapper.find("Banner")).toHaveLength(1)
  })

  describe("status messages", () => {
    it("BIDDER_NOT_QUALIFIED", () => {
      status = "BIDDER_NOT_QUALIFIED"
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Bidder Not Qualified")
    })

    it("LIVE_BIDDING_STARTED", () => {
      status = "LIVE_BIDDING_STARTED"
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Live Auction in Progress")
    })

    it("OUTBID", () => {
      status = "OUTBID"
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Outbid")
    })

    it("RESERVE_NOT_MET", () => {
      status = "RESERVE_NOT_MET"
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Reserve Not Met")
    })

    it("SALE_CLOSED", () => {
      status = "SALE_CLOSED"
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Sale Closed")
    })

    it("LOT_CLOSED", () => {
      status = "LOT_CLOSED"
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Lot Closed")
    })

    it("ERROR", () => {
      status = "ERROR"
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Submission Failed")
    })

    it("SUBMISSION_FAILED", () => {
      status = "SUBMISSION_FAILED"
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Submission Failed")
      expect(wrapper.html()).toContain("mailto:support@artsy.net")
    })
  })
})
