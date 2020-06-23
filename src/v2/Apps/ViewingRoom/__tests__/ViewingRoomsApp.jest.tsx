import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import ViewingRoomsApp from "../ViewingRoomsApp"
import { graphql } from "react-relay"
import { ViewingRoomsApp_Test_QueryRawResponse } from "v2/__generated__/ViewingRoomsApp_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "subscription-demo-gg-guy-yanai",
      },
    },
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
        Component: ({ viewingRooms }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <ViewingRoomsApp viewingRooms={viewingRooms} />
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomsApp_Test_Query @raw_response_type {
            viewingRooms {
              ...ViewingRoomsApp_viewingRooms
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
        expect(html).not.toContain("Draft VR")
        expect(html).toContain("Scheduled VR")
        expect(html).toContain("Live VR")
        expect(html).not.toContain("Closed VR")
      })
    })
  })
})

const ViewingRoomsAppFixture: ViewingRoomsApp_Test_QueryRawResponse = {
  viewingRooms: {
    edges: [
      {
        node: {
          status: "draft",
          slug: "test-draft",
          title: "Draft VR",
        },
      },
      {
        node: {
          status: "scheduled",
          slug: "test-scheduled",
          title: "Scheduled VR",
        },
      },
      {
        node: {
          status: "live",
          slug: "test-live",
          title: "Live VR",
        },
      },
      {
        node: {
          status: "closed",
          slug: "test-closed",
          title: "Closed VR",
        },
      },
    ],
  },
}
