import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistSearchResultsContentContainer } from "../ArtistSearchResults"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  commitMutation: jest.fn(),
}))

import { commitMutation } from "react-relay"

describe("ArtistSearchResults", () => {
  const mockedOnArtistFollow = jest.fn()
  const mockedOnNoResults = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <ArtistSearchResultsContentContainer
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          onArtistFollow={mockedOnArtistFollow}
          onNoResults={mockedOnNoResults}
          term={""}
          viewer={props.viewer}
        />
      )
    },
    query: graphql`
      query ArtistSearchResults_Test_Query($term: String!)
        @relay_test_operation {
        viewer {
          ...ArtistSearchResults_viewer
        }
      }
    `,
    variables: {
      term: "",
    },
  })

  it("follows and then unfollows an artist", () => {
    const wrapper = getWrapper()
    const onClick = wrapper.find("Link").first().prop("onClick")

    const mutationCalls = (commitMutation as any).mock.calls

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    onClick({} as any)
    expect(mutationCalls[0][1].variables.input.unfollow).toBe(false)

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    onClick({} as any)
    expect(mutationCalls[1][1].variables.input.unfollow).toBe(true)
  })
})
