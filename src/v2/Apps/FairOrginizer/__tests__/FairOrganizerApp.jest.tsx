import React from "react"
import { graphql } from "react-relay"
import { FairOrganizerApp_Test_Query } from "v2/__generated__/FairOrganizerApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairOrganizerAppFragmentContainer } from "../FairOrganizerApp"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<FairOrganizerApp_Test_Query>({
  Component: props => {
    return <FairOrganizerAppFragmentContainer {...(props as any)} />
  },
  query: graphql`
    query FairOrganizerApp_Test_Query {
      fairOrganizer(id: "example") {
        ...FairOrganizerApp_fairOrganizer
      }
      pastFairs: fairsConnection(
        first: 20
        fairOrganizerID: "example"
        sort: START_AT_DESC
        status: CLOSED
        hasFullFeature: true
      ) {
        ...FairOrganizerApp_pastFairs
      }
    }
  `,
})

describe("FairOrganizerApp", () => {
  it("sets a title tag", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ name: "Art Paris" }),
    })
    expect(wrapper.find("Title").first().text()).toEqual("Art Paris | Artsy")
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("FairHeaderImage").length).toBe(1)
    expect(wrapper.find("FairOrganizerHeader").length).toBe(1)
    expect(wrapper.find("FairOrganizerPastEventsRail").length).toBe(1)
    expect(wrapper.find("FairOrganizerLatestArticles").length).toBe(1)
  })
})
