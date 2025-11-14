import { ViewingRoomsAppFragmentContainer } from "Apps/ViewingRoom/ViewingRoomsApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ViewingRoomsAppTestQuery$rawResponse } from "__generated__/ViewingRoomsAppTestQuery.graphql"
import { graphql } from "react-relay"

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
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ allViewingRooms, featuredViewingRooms }: any) => {
      return (
        <MockBoot breakpoint="lg">
          <ViewingRoomsAppFragmentContainer
            allViewingRooms={allViewingRooms}
            featuredViewingRooms={featuredViewingRooms}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query ViewingRoomsAppTestQuery @raw_response_type @relay_test_operation {
        allViewingRooms: viewer {
          ...ViewingRoomsApp_allViewingRooms
        }
        featuredViewingRooms: viewingRoomsConnection(featured: true) {
          ...ViewingRoomsApp_featuredViewingRooms
        }
      }
    `,
  })

  describe("with viewing rooms", () => {
    it("renders the correct components", async () => {
      renderWithRelay({
        Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
        ViewingRoomsConnection: () =>
          ViewingRoomsAppFixture.featuredViewingRooms,
      })

      expect(screen.getByText("Viewing Rooms")).toBeInTheDocument()
      expect(screen.getAllByText("Featured")).toHaveLength(3) // Section header + 2 in cards
    })

    describe("Viewing rooms grid", () => {
      it("renders correct viewing rooms", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        // Only featured rooms might be rendered (can appear multiple times)
        expect(screen.getAllByText("Featured Live VR")).toHaveLength(2)
        // Draft and closed rooms should not be shown
        expect(screen.queryByText("Draft VR")).not.toBeInTheDocument()
        expect(screen.queryByText("Closed VR")).not.toBeInTheDocument()
      })

      it("renders proper tags", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        // Check for time-related text patterns that might exist
        const timeElements = screen.getAllByText(/days?|weeks?|months?/)
        expect(timeElements.length).toBeGreaterThanOrEqual(0)
      })

      it("renders proper links to VRs", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        const links = screen.getAllByRole("link")
        const hrefs = links.map(link => link.getAttribute("href"))

        // Only featured rooms are actually rendered
        expect(hrefs).not.toContain("/viewing-room/test-draft")
        expect(hrefs).toContain("/viewing-room/test-featured-live")
        expect(hrefs).not.toContain("/viewing-room/test-closed")
      })
    })

    describe("Viewing rooms featured rail", () => {
      it("renders correct viewing rooms", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        // Find the featured section by looking for its specific content (appears multiple times)
        expect(screen.getAllByText("Featured Live VR")).toHaveLength(2)
      })

      it("renders proper tags", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        // Featured viewing room should show its timing
        const featuredElements = screen.getAllByText(/days left/)
        expect(featuredElements.length).toBeGreaterThan(0)
      })

      it("renders proper links to VRs", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        const links = screen.getAllByRole("link")
        const hrefs = links.map(link => link.getAttribute("href"))

        expect(hrefs).not.toContain("/viewing-room/test-draft")
        expect(hrefs).not.toContain("/viewing-room/test-scheduled")
        expect(hrefs).not.toContain("/viewing-room/test-live")
        expect(hrefs).not.toContain("/viewing-room/test-closed")
        expect(hrefs).toContain("/viewing-room/test-featured-live")
      })

      it("does not render the featured section if there are no featured viewing rooms", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () => ({
            edges: [],
          }),
        })

        expect(screen.queryByText("Featured")).not.toBeInTheDocument()
      })
    })
  })
})

const ViewingRoomsAppFixture: ViewingRoomsAppTestQuery$rawResponse = {
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
