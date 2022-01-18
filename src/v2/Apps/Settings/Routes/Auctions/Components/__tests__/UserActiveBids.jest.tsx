import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { UserActiveBidsFragmentContainer } from "../UserActiveBids"
import { UserActiveBids_Test_Query } from "v2/__generated__/UserActiveBids_Test_Query.graphql"

jest.unmock("react-relay")

describe("UserActiveBids", () => {
  const { getWrapper } = setupTestWrapper<UserActiveBids_Test_Query>({
    Component: UserActiveBidsFragmentContainer,
    query: graphql`
      query UserActiveBids_Test_Query @relay_test_operation {
        me {
          ...UserActiveBids_me
        }
      }
    `,
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Me: () => ({
        lotStandings: [
          {
            saleArtwork: {
              artwork: {
                title: "monk by the sea",
              },
            },
          },
        ],
      }),
    })

    expect(wrapper.text()).toContain("monk by the sea")
  })

  it("renders -Nothing to Show- message when no lot found", () => {
    const wrapper = getWrapper({
      Me: () => ({
        lotStandings: null,
      }),
    })

    expect(wrapper.text()).toContain("Nothing to Show")
  })

  it("renders -Active Bids- title even if data is not there", () => {
    const wrapper = getWrapper({
      Me: () => ({
        lotStandings: null,
      }),
    })

    expect(wrapper.text()).toContain("Active Bids")
  })

  it("renders a router link with correct href", () => {
    const wrapper = getWrapper({
      Me: () => ({
        lotStandings: [
          {
            saleArtwork: {
              artwork: {
                href: "/monk-by-the-sea",
              },
            },
          },
        ],
      }),
    })

    expect(wrapper.find("RouterLink").first().props().to).toEqual(
      "/monk-by-the-sea"
    )
  })

  it("when user is the highest bidder, renders -Highest bid- text with correct icon", () => {
    const wrapper = getWrapper({
      Me: () => ({
        lotStandings: [
          {
            isLeadingBidder: true,
            saleArtwork: {
              artwork: {
                title: "monk by the sea",
              },
            },
          },
        ],
      }),
    })

    expect(wrapper.text()).toContain("Highest bid")
    expect(wrapper.find("ArrowUpCircleIcon").length).toBe(1)
  })
})
