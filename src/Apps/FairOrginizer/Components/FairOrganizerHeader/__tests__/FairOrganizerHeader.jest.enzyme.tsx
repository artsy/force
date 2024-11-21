import { graphql } from "react-relay"
import { DateTime } from "luxon"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { FairOrganizerHeaderFragmentContainer } from "Apps/FairOrginizer/Components/FairOrganizerHeader/FairOrganizerHeader"

jest.unmock("react-relay")

jest.mock("Components/HeaderIcon", () => ({
  HeaderIcon: () => "HeaderIcon",
}))

const { getWrapper } = setupTestWrapper({
  Component: FairOrganizerHeaderFragmentContainer,
  query: graphql`
    query FairOrganizerHeader_Test_Query @relay_test_operation {
      fairOrganizer(id: "example") {
        ...FairOrganizerHeader_fairOrganizer
      }
    }
  `,
})

describe("FairOrganizerHeader", () => {
  it("displays link to the fair page", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        href: "fair/art-paris-2020",
      }),
    })

    expect(wrapper.find("RouterLink").length).toBe(1)
    expect(wrapper.find("RouterLink").prop("to")).toEqual("fair/art-paris-2020")
  })

  it("displays title with organizer name", () => {
    const { wrapper } = getWrapper({
      FairOrganizer: () => ({
        name: "Art Paris",
      }),
    })
    expect(wrapper.text()).toContain("Explore Art Paris on Artsy")
  })

  it("displays icon, follow button, and info", () => {
    const { wrapper } = getWrapper({})
    expect(wrapper.html()).toContain("HeaderIcon")
    expect(wrapper.find("FairOrganizerFollowButton").length).toBe(1)
    expect(wrapper.find("FairOrganizerInfo").length).toBe(1)
  })

  it("displays period", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({
        exhibitionPeriod: "Sep 10 - 19",
      }),
    })
    expect(wrapper.text()).toContain("Sep 10 - 19")
  })

  it("doesn't display timer if event is passed", () => {
    const startAt = DateTime.local().minus({ days: 1 }).toString()
    const { wrapper } = getWrapper({ Fair: () => ({ startAt }) })
    expect(wrapper.find("Timer").length).toBe(0)
  })

  it("displays timer if event starts in future", () => {
    const startAt = DateTime.local().plus({ days: 1 }).toString()
    const { wrapper } = getWrapper({ Fair: () => ({ startAt }) })
    expect(wrapper.find("Timer").length).toBe(1)
    expect(wrapper.text()).toContain("Opens in:")
  })
})
