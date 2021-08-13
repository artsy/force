import { graphql } from "react-relay"
import moment from "moment"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairOrganizerHeaderFragmentContainer } from "../FairOrganizerHeader"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairOrganizerHeaderFragmentContainer,
  query: graphql`
    query FairOrganizerHeader_Test_Query {
      fairOrganizer(id: "example") {
        ...FairOrganizerHeader_fairOrganizer
      }
    }
  `,
})

describe("FairOrganizerHeader", () => {
  it("displays title with organizer name", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({
        name: "Art Paris",
      }),
    })
    expect(wrapper.text()).toContain("Explore Art Paris on Artsy")
  })

  it("displays icon, follow button, and info", () => {
    const wrapper = getWrapper({})
    expect(wrapper.find("FairOrganizerHeaderIcon").length).toBe(1)
    expect(wrapper.find("FairOrganizerFollowButton").length).toBe(1)
    expect(wrapper.find("FairOrganizerInfo").length).toBe(1)
  })

  it("displays period", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        exhibitionPeriod: "Sep 10 - 19",
      }),
    })
    expect(wrapper.text()).toContain("Sep 10 - 19")
  })

  it("doesn't display timer if event is passed", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        startAt: "2020-09-01T05:00:00+03:00",
      }),
    })
    expect(wrapper.find("Timer").length).toBe(0)
  })

  it("displays timer if event starts in future", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        startAt: moment().add(1, "day"),
      }),
    })
    expect(wrapper.find("Timer").length).toBe(1)
    expect(wrapper.text()).toContain("Opens in:")
  })
})
