import React from "react"
import { graphql } from "react-relay"
import { Steve_Test_Query } from "v2/__generated__/Steve_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { SteveFragmentContainer } from "../Steve"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/System/useSystemContext")

describe("Steve", () => {
  const { getWrapper } = setupTestWrapper<Steve_Test_Query>({
    Component: (props: any) => {
      return <SteveFragmentContainer viewer={props.viewer} />
    },
    query: graphql`
      query Steve_Test_Query {
        viewer {
          ...Steve_viewer
        }
      }
    `,
  })

  it.only("displays the auctions landing page", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toEqual("steve")
  })
})
