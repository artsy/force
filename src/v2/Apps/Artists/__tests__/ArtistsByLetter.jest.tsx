import React from "react"
import { graphql } from "react-relay"
import { ArtistsByLetterFragmentContainer } from "../Routes/ArtistsByLetter"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistsByLetter_Test_Query } from "v2/__generated__/ArtistsByLetter_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({ match: { params: { letter: "a" } } }),
}))

const { getWrapper } = setupTestWrapper<ArtistsByLetter_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <ArtistsByLetterFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtistsByLetter_Test_Query(
      $letter: String!
      $first: Int
      $after: String
    ) {
      viewer {
        ...ArtistsByLetter_viewer
          @arguments(letter: $letter, first: $first, after: $after)
      }
    }
  `,
  variables: {
    first: 100,
    letter: "a",
  },
})

describe("ArtistsByLetter", () => {
  it("renders the page", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Artists – A")
  })
})
