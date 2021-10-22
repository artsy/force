import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PopularArtistContentContainer } from "../PopularArtists"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  commitMutation: jest.fn(),
}))

import { commitMutation } from "react-relay"

describe("PopularArtists", () => {
  const mockedOnArtistFollow = jest.fn()

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <PopularArtistContentContainer
          popular_artists={props.highlights.popular_artists}
          onArtistFollow={mockedOnArtistFollow}
        />
      )
    },
    query: graphql`
      query PopularArtists_Test_Query {
        highlights {
          popular_artists: popularArtists(excludeFollowedArtists: true) {
            ...PopularArtists_popular_artists
          }
        }
      }
    `,
  })

  it("follows and then unfollows an artist", () => {
    const wrapper = getWrapper()
    const onClick = wrapper.find("Link").first().prop("onClick")

    const mutationCalls = (commitMutation as any).mock.calls

    // @ts-expect-error STRICT_NULL_CHECK
    onClick({} as any)
    expect(mutationCalls[0][1].variables.input.unfollow).toBe(false)

    // @ts-expect-error STRICT_NULL_CHECK
    onClick({} as any)
    expect(mutationCalls[1][1].variables.input.unfollow).toBe(true)
  })
})
