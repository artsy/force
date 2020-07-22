import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import ViewingRoomsApp from "../ViewingRoomsApp"
import { graphql } from "react-relay"
import { ViewingRoomsApp_Test_QueryRawResponse } from "v2/__generated__/ViewingRoomsApp_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {},
  }),
  useIsRouteActive: () => false,
}))

describe("ViewingRoomsApp", () => {
  describe("with viewing rooms", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomsApp_Test_QueryRawResponse = ViewingRoomsAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ allViewingRooms, featuredViewingRooms }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <ViewingRoomsApp
                allViewingRooms={allViewingRooms}
                featuredViewingRooms={featuredViewingRooms}
              />
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomsApp_Test_Query @raw_response_type {
            allViewingRooms: viewer {
              ...ViewingRoomsApp_allViewingRooms
            }
            featuredViewingRooms: viewingRooms(featured: true) {
              ...ViewingRoomsApp_featuredViewingRooms
            }
          }
        `,
        mockData: response,
      })
    }

    it("renders the correct components", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.html()).toContain("Viewing Rooms")
    })

    describe("Viewing rooms grid", () => {
      it("renders correct viewing rooms", async () => {
        const wrapper = await getWrapper()
        const html = wrapper.html()
        expect(wrapper.find("SmallCard").length).toBe(2)
        expect(html).not.toContain("Draft VR")
        expect(html).toContain("Scheduled VR")
        expect(html).toContain("Live VR")
        expect(html).not.toContain("Closed VR")
      })

      it("renders proper tags", async () => {
        const wrapper = await getWrapper()
        const html = wrapper.html()
        expect(wrapper.find("CardTag").length).toBe(3)
        expect(html).toContain("Opening soon")
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
        expect(featuredRail.find("CardTag").length).toBe(1)
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

const ViewingRoomsAppFixture: ViewingRoomsApp_Test_QueryRawResponse = {
  allViewingRooms: {
    viewingRoomsConnection: {
      edges: [
        {
          node: {
            __typename: "ViewingRoom",
            status: "draft",
            slug: "test-draft",
            title: "Draft VR",
            heroImageURL: "https://www.example.com/rikki.jpg",
            distanceToClose: null,
            distanceToOpen: null,
            partner: {
              id: "rikki",
              name: "Rikki",
            },
            artworksConnection: {
              totalCount: 0,
              edges: [],
            },
          },
          cursor: "one",
        },
        {
          node: {
            __typename: "ViewingRoom",
            status: "scheduled",
            slug: "test-scheduled",
            title: "Scheduled VR",
            heroImageURL: "https://www.example.com/tikki.jpg",
            distanceToOpen: "soon",
            distanceToClose: null,
            partner: {
              id: "tikki",
              name: "Tikki",
            },
            artworksConnection: {
              totalCount: 1,
              edges: [
                {
                  node: {
                    id: "hello",
                    image: {
                      square: "https://www.example.com/square-mat.jpg",
                      regular: "https://www.example.com/regular-mat.jpg",
                    },
                  },
                },
              ],
            },
          },
          cursor: "two",
        },
        {
          node: {
            __typename: "ViewingRoom",
            status: "live",
            slug: "test-live",
            title: "Live VR",
            heroImageURL: "https://www.example.com/tavi.jpg",
            distanceToOpen: null,
            distanceToClose: "3 days",
            partner: {
              id: "tavi",
              name: "Tavi",
            },
            artworksConnection: {
              totalCount: 2,
              edges: [
                {
                  node: {
                    id: "hello",
                    image: {
                      square: "https://www.example.com/square-fat.jpg",
                      regular: "https://www.example.com/regular-fat.jpg",
                    },
                  },
                },
                {
                  node: {
                    id: "there",
                    image: {
                      square: "https://www.example.com/square-pet.jpg",
                      regular: "https://www.example.com/regular-pet.jpg",
                    },
                  },
                },
              ],
            },
          },
          cursor: "three",
        },
        {
          node: {
            __typename: "ViewingRoom",
            status: "closed",
            slug: "test-closed",
            title: "Closed VR",
            heroImageURL: "https://www.example.com/nag.jpg",
            distanceToOpen: null,
            distanceToClose: null,
            partner: {
              id: "nag",
              name: "Nag",
            },
            artworksConnection: {
              totalCount: 3,
              edges: [
                {
                  node: {
                    id: "hello",
                    image: {
                      square: "https://www.example.com/square-cat.jpg",
                      regular: "https://www.example.com/regular-cat.jpg",
                    },
                  },
                },
                {
                  node: {
                    id: "there",
                    image: {
                      square: "https://www.example.com/square-bat.jpg",
                      regular: "https://www.example.com/regular-bat.jpg",
                    },
                  },
                },
              ],
            },
          },
          cursor: "four",
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
          status: "live",
          slug: "test-featured-live",
          title: "Featured Live VR",
          heroImageURL: "https://www.example.com/featured-live.jpg",
          distanceToOpen: null,
          distanceToClose: "4 days",
          partner: {
            id: "featured",
            name: "Featured",
          },
        },
      },
    ],
  },
}
