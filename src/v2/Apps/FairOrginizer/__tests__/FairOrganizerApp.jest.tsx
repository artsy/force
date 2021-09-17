import React from "react"
import { graphql } from "react-relay"
import { FairOrganizerApp_Test_Query } from "v2/__generated__/FairOrganizerApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairOrganizerAppFragmentContainer } from "../FairOrganizerApp"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<FairOrganizerApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <FairOrganizerAppFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query FairOrganizerApp_Test_Query {
      fairOrganizer(id: "example") {
        ...FairOrganizerApp_fairOrganizer
      }
    }
  `,
})

describe("FairOrganizerApp", () => {
  it("sets a title tag", () => {
    const wrapper = getWrapper({
      FairOrganizer: () => ({ name: "Art Paris", slug: "art-paris" }),
    })
    expect(wrapper.find("Title").first().text()).toEqual("Art Paris | Artsy")
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("MetaTags").length).toBe(1)
    expect(wrapper.find("FairOrganizerHeaderImage").length).toBe(1)
    expect(wrapper.find("FairOrganizerHeader").length).toBe(1)
    expect(wrapper.find("FairOrganizerPastEventsRail").length).toBe(1)
    expect(wrapper.find("FairOrganizerLatestArticles").length).toBe(1)
  })
})
