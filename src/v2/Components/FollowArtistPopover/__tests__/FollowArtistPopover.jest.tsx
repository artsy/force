import { Breakpoint } from "@artsy/palette"
import { FollowArtistPopover_Test_Query$rawResponse } from "v2/__generated__/FollowArtistPopover_Test_Query.graphql"
import { FollowArtistPopoverFragmentContainer as FollowArtistPopover } from "v2/Components/FollowArtistPopover"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("Follow Artist Popover", () => {
  let wrapper: ReactWrapper

  const artistResponse: FollowArtistPopover_Test_Query$rawResponse = {
    artist: {
      id: "opaque-artist-id",
      related: {
        suggestedConnection: {
          edges: [
            {
              node: {
                id: "francesca-dimattio",
                name: "Francesca DiMattio",
                internalID: "mongo-id",
                formattedNationalityAndBirthday: "example",
                image: {
                  cropped: {
                    url: "/path/to/image.jpg",
                  },
                },
              },
            },
          ],
        },
      },
    },
  }

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: FollowArtistPopover,
      query: graphql`
        query FollowArtistPopover_Test_Query($artistID: String!)
          @raw_response_type
          @relay_test_operation {
          artist(id: $artistID) {
            ...FollowArtistPopover_artist
          }
        }
      `,
      mockData: artistResponse as FollowArtistPopover_Test_Query$rawResponse,
      variables: {
        artistID: "percy-z",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.html()).toContain("Francesca DiMattio")
    })
  })
})
