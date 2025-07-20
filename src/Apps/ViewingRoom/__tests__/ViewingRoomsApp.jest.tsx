import { screen, within } from "@testing-library/react"
import type { Breakpoint } from "@artsy/palette"
import { ViewingRoomsAppFragmentContainer } from "Apps/ViewingRoom/ViewingRoomsApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ViewingRoomsApp_Test_Query$rawResponse } from "__generated__/ViewingRoomsApp_Test_Query.graphql"
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
      query ViewingRoomsApp_Test_Query
      @raw_response_type
      @relay_test_operation {
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
      expect(screen.getByText("Artsy Viewing Rooms")).toBeInTheDocument()
      expect(
        screen.getByText(/Discover in-demand works and storytelling/),
      ).toBeInTheDocument()
    })

    describe("Viewing rooms grid", () => {
      it("renders correct viewing rooms", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        // Find all cards - using role="link" as cards typically have links
        const cards = screen.getAllByRole("link", { name: /VR$/ })
        expect(cards).toHaveLength(3) // Only scheduled, live, and featured (not draft or closed)

        // Check that specific rooms are rendered or not
        expect(screen.queryByText("Draft VR")).not.toBeInTheDocument()
        expect(screen.getByText("Scheduled VR")).toBeInTheDocument()
        expect(screen.getByText("Live VR")).toBeInTheDocument()
        expect(screen.queryByText("Closed VR")).not.toBeInTheDocument()
      })

      it("renders proper tags", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        expect(screen.getByText("Opens in 1 week")).toBeInTheDocument()
        expect(screen.getByText("3 days left")).toBeInTheDocument()
        expect(screen.queryByText("Closed")).not.toBeInTheDocument()
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
        expect(hrefs).toContain("/viewing-room/test-scheduled")
        expect(hrefs).toContain("/viewing-room/test-live")
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

        // Find the featured section by looking for its specific content
        expect(screen.getByText("Featured Live VR")).toBeInTheDocument()
      })

      it("renders proper tags", async () => {
        renderWithRelay({
          Viewer: () => ViewingRoomsAppFixture.allViewingRooms,
          ViewingRoomsConnection: () =>
            ViewingRoomsAppFixture.featuredViewingRooms,
        })

        expect(screen.getByText("4 days left")).toBeInTheDocument()
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
