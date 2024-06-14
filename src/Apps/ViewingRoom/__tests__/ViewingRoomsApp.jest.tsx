import { renderRelayTree } from "DevTools/renderRelayTree"
import { MockBoot } from "DevTools/MockBoot"
import { ViewingRoomsAppFragmentContainer } from "Apps/ViewingRoom/ViewingRoomsApp"
import { graphql } from "react-relay"
import { ViewingRoomsApp_Test_Query$rawResponse } from "__generated__/ViewingRoomsApp_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useIsRouteActive: () => false,
  useRouter: () => ({
    match: {},
  }),
}))
jest.mock("Utils/Hooks/useStableShuffle", () => ({
  useStableShuffle: ({ items }) => ({ shuffled: items }),
}))

describe("ViewingRoomsApp", () => {
  describe("with viewing rooms", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomsApp_Test_Query$rawResponse = ViewingRoomsAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ allViewingRooms, featuredViewingRooms }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <ViewingRoomsAppFragmentContainer
                allViewingRooms={allViewingRooms}
                featuredViewingRooms={featuredViewingRooms}
              />
            </MockBoot>
          )
        },
        mockData: response,
        query: graphql`
          query ViewingRoomsApp_Test_Query
            @raw_response_type
            @relay_test_operation {
            allViewingRooms: viewer {
              ...ViewingRoomsApp_allViewingRooms
            }
            featuredViewingRooms: viewingRooms(featured: true) {
              ...ViewingRoomsApp_featuredViewingRooms
            }
          }
        `,
      })
    }

    it("renders the correct components", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Viewing Rooms")
      expect(wrapper.find("ViewingRoomsMeta").length).toBe(1)
      expect(wrapper.find("ViewingRoomsMeta").html()).toContain(
        "Artsy Viewing Rooms"
      )
      expect(wrapper.find("ViewingRoomsMeta").html()).toContain(
        "Discover in-demand works and storytelling from the world’s leading galleries and artists — all in one place."
      )
    })

    describe("Viewing rooms grid", () => {
      it("renders correct viewing rooms", async () => {
        const wrapper = await getWrapper()
        const html = wrapper.html()
        expect(wrapper.find("Card").length).toBe(3)
        expect(html).not.toContain("Draft VR")
        expect(html).toContain("Scheduled VR")
        expect(html).toContain("Live VR")
        expect(html).not.toContain("Closed VR")
      })

      it("renders proper tags", async () => {
        const wrapper = await getWrapper()
        const html = wrapper.html()
        expect(html).toContain("Opens in 1 week")
        expect(html).toContain("3 days left")
        expect(html).not.toContain("Closed")
      })

      it("renders proper links to VRs", async () => {
        const wrapper = await getWrapper()
        const html = wrapper.html()
        expect(html).not.toContain(`href="/viewing-room/test-draft"`)
        expect(html).toContain(`href="/viewing-room/test-scheduled"`)
        expect(html).toContain(`href="/viewing-room/test-live"`)
        expect(html).not.toContain(`href="/viewing-room/test-closed"`)
      })
    })

    describe("Viewing rooms featured rail", () => {
      it("renders correct viewing rooms", async () => {
        const wrapper = await getWrapper()
        const featuredRail = wrapper.find("ViewingRoomsFeaturedRail")
        const html = featuredRail.html()
        expect(html).toContain("Featured Live VR")
      })

      it("renders proper tags", async () => {
        const wrapper = await getWrapper()
        const featuredRail = wrapper.find("ViewingRoomsFeaturedRail")
        const html = featuredRail.html()
        expect(html).toContain("4 days left")
      })

      it("renders proper links to VRs", async () => {
        const wrapper = await getWrapper()
        const featuredRail = wrapper.find("ViewingRoomsFeaturedRail")
        const html = featuredRail.html()
        expect(html).not.toContain(`href="/viewing-room/test-draft"`)
        expect(html).not.toContain(`href="/viewing-room/test-scheduled"`)
        expect(html).not.toContain(`href="/viewing-room/test-live"`)
        expect(html).not.toContain(`href="/viewing-room/test-closed"`)
        expect(html).toContain(`href="/viewing-room/test-featured-live"`)
      })
    })
  })
})

const ViewingRoomsAppFixture: ViewingRoomsApp_Test_Query$rawResponse = {
  allViewingRooms: {
    viewingRoomsConnection: {
      edges: [
        {
          cursor: "one",
          node: {
            __typename: "ViewingRoom",
            distanceToClose: null,
            distanceToOpen: null,
            image: {
              imageURLs: {
                normalized: "https://www.example.com/rikki.jpg",
              },
            },
            partner: {
              id: "rikki",
              name: "Rikki",
            },
            slug: "test-draft",
            status: "draft",
            title: "Draft VR",
          },
        },
        {
          cursor: "two",
          node: {
            __typename: "ViewingRoom",
            distanceToClose: null,
            distanceToOpen: "1 week",
            image: {
              imageURLs: {
                normalized: "https://www.example.com/tikki.jpg",
              },
            },
            partner: {
              id: "tikki",
              name: "Tikki",
            },
            slug: "test-scheduled",
            status: "scheduled",
            title: "Scheduled VR",
          },
        },
        {
          cursor: "three",
          node: {
            __typename: "ViewingRoom",
            distanceToClose: "3 days",
            distanceToOpen: null,
            image: {
              imageURLs: {
                normalized: "https://www.example.com/tavi.jpg",
              },
            },
            partner: {
              id: "tavi",
              name: "Tavi",
            },
            slug: "test-live",
            status: "live",
            title: "Live VR",
          },
        },
        {
          cursor: "four",
          node: {
            __typename: "ViewingRoom",
            distanceToClose: null,
            distanceToOpen: null,
            image: {
              imageURLs: {
                normalized: "https://www.example.com/nag.jpg",
              },
            },
            partner: {
              id: "nag",
              name: "Nag",
            },
            slug: "test-closed",
            status: "closed",
            title: "Closed VR",
          },
        },
      ],
      pageInfo: {
        endCursor: "ten",
        hasNextPage: true,
      },
    },
  },
  featuredViewingRooms: {
    edges: [
      {
        node: {
          distanceToClose: "4 days",
          distanceToOpen: null,
          image: {
            imageURLs: {
              normalized: "https://www.example.com/featured-live.jpg",
            },
          },
          partner: {
            id: "featured",
            name: "Featured",
          },
          slug: "test-featured-live",
          status: "live",
          title: "Featured Live VR",
        },
      },
    ],
  },
}
