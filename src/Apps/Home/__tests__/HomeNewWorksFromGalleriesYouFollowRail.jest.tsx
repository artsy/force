import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { HomeNewWorksFromGalleriesYouFollowRailFragmentContainer } from "Apps/Home/Components/HomeNewWorksFromGalleriesYouFollowRail"
import { HomeNewWorksFromGalleriesYouFollowRail_Test_Query } from "__generated__/HomeNewWorksFromGalleriesYouFollowRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<
  HomeNewWorksFromGalleriesYouFollowRail_Test_Query
>({
  Component: props => {
    return (
      <HomeNewWorksFromGalleriesYouFollowRailFragmentContainer
        newWorksFromGalleriesYouFollowConnection={
          props.me?.newWorksFromGalleriesYouFollowConnection!
        }
      />
    )
  },
  query: graphql`
    query HomeNewWorksFromGalleriesYouFollowRail_Test_Query
      @relay_test_operation {
      me {
        newWorksFromGalleriesYouFollowConnection(first: 20) {
          ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection
        }
      }
    }
  `,
})

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomeNewWorksFromGalleriesYouFollowRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Me: () => meResponse,
    })

    expect(wrapper.text()).toContain("The World As I Found It")
    expect(wrapper.html()).toContain(
      "/artwork/francine-tint-the-world-as-i-found-it"
    )
  })

  describe("tracking", () => {
    it("tracks view all clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").at(1).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: undefined,
        context_module: "newWorksByGalleriesYouFollowRail",
        context_page_owner_id: undefined,
        context_page_owner_slug: undefined,
        context_page_owner_type: undefined,
        destination_page_owner_id: undefined,
        destination_page_owner_slug: undefined,
        destination_page_owner_type: "newWorksFromGalleriesYouFollow",
        horizontal_slide_position: undefined,
        type: "viewAll",
      })
    })

    it("tracks item clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").at(2).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "newWorksByGalleriesYouFollowRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Artwork-mock-id-1>",
        destination_page_owner_slug: "<Artwork-mock-id-2>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})

const meResponse = {
  newWorksFromGalleriesYouFollowConnection: {
    edges: [
      {
        node: {
          internalID: "64e8110c21afcb000b7874cd",
          slug: "francine-tint-the-world-as-i-found-it",
          href: "/artwork/francine-tint-the-world-as-i-found-it",
          title: "The World As I Found It",
          date: "2023",
          sale_message: "Contact for price",
          cultural_maker: null,
          artist: {
            targetSupply: {
              isP1: false,
            },
            id: "QXJ0aXN0OjU0ZTYyNjk1NzI2MTY5M2VhZjY4MDkwMA==",
          },
          marketPriceInsights: null,
          artists: [
            {
              id: "QXJ0aXN0OjU0ZTYyNjk1NzI2MTY5M2VhZjY4MDkwMA==",
              href: "/artist/francine-tint",
              name: "Francine Tint",
            },
          ],
          collecting_institution: null,
          partner: {
            name: "Upsilon Gallery",
            href: "/partner/upsilon-gallery",
            id: "UGFydG5lcjo1NzgzYmRhNjc2MjJkZDY1ZWQwMDAzNTU=",
          },
          sale: null,
          sale_artwork: null,
          id: "QXJ0d29yazo2NGU4MTEwYzIxYWZjYjAwMGI3ODc0Y2Q=",
          isSaved: false,
          artistNames: "Francine Tint",
          preview: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/lB2BlZvr-Yhjcenhd222gg/square.jpg",
          },
          customCollections: {
            totalCount: 0,
          },
          attributionClass: {
            name: "Unique",
            id: "QXR0cmlidXRpb25DbGFzczp1bmlxdWU=",
          },
          mediumType: {
            filterGene: {
              name: "Painting",
              id: "R2VuZTo0ZDkwZDE4ZWRjZGQ1ZjQ0YTUwMDAwMTA=",
            },
          },
          image: {
            src:
              "https://d32dm0rphc51dk.cloudfront.net/lB2BlZvr-Yhjcenhd222gg/larger.jpg",
            width: 1578,
            height: 1539,
          },
        },
      },
    ],
  },
}
