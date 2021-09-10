import React from "react"
import { TagAppFragmentContainer } from "../TagApp"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { TagApp_Test_RTL_Query } from "v2/__generated__/TagApp_Test_RTL_Query.graphql"
import { MockBoot } from "v2/DevTools"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("../Components/TagArtworkFilter", () => ({
  TagArtworkFilterRefetchContainer: () => <div />,
}))

const { renderWithRelay } = setupTestWrapperTL<TagApp_Test_RTL_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <TagAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query TagApp_Test_RTL_Query {
      tag(id: "example") {
        ...TagApp_tag
      }
    }
  `,
})

async function findMetaTagBySelector(selector: string) {
  await waitFor(() =>
    /* eslint-disable testing-library/no-node-access */
    expect(document.querySelectorAll("meta").length).toBeGreaterThan(0)
  )
  return document.querySelector(selector)
}

describe("TagApp", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Tag: () => ({
        name: "Example Tag",
      }),
    })

    expect(screen.getByText("Example Tag")).toBeInTheDocument()
  })
})
