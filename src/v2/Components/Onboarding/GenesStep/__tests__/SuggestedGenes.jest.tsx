import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { SuggestedGenesContainer } from "../SuggestedGenes"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  commitMutation: jest.fn(),
}))

import { commitMutation } from "react-relay"

describe("SuggestedGenes", () => {
  const mockedOnGeneFollow = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <SuggestedGenesContainer
          onGeneFollow={mockedOnGeneFollow}
          suggested_genes={props.highlights.suggested_genes}
        />
      )
    },
    query: graphql`
      query SuggestedGenes_Test_Query {
        highlights {
          suggested_genes: broadCollectingGenes {
            ...SuggestedGenes_suggested_genes
          }
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
