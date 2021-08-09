import { graphql } from "react-relay"
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
  it("renders correctly", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({
        name: "Art Paris",
      }),
    })

    expect(wrapper.text()).toContain("Explore Art Paris on Artsy")
    expect(wrapper.find("FairOrganizerHeaderIcon").length).toBe(1)
    expect(wrapper.find("FairOrganizerTiming").length).toBe(1)
    expect(wrapper.find("FairOrganizerFollowButton").length).toBe(1)
    expect(wrapper.find("FairOrganizerInfo").length).toBe(1)
  })
})
