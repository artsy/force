import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { GeneSearchResultsContentContainer } from "../GeneSearchResults"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  commitMutation: jest.fn(),
}))

import { commitMutation } from "react-relay"

describe("GeneSearchResults", () => {
  const mockedOnGeneFollow = jest.fn()
  const mockedOnNoResults = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <GeneSearchResultsContentContainer
          onGeneFollow={mockedOnGeneFollow}
          onNoResults={mockedOnNoResults}
          term={"some term"}
          viewer={props.viewer}
        />
      )
    },
    query: graphql`
      query GeneSearchResults_Test_Query($term: String!) {
        viewer {
          ...GeneSearchResults_viewer
        }
      }
    `,
  })

  it("follows and then unfollows a gene", () => {
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
