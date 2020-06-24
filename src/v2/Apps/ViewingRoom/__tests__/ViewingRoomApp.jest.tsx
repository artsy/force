import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import ViewingRoomApp from "../ViewingRoomApp"
import { graphql } from "react-relay"
import { ViewingRoomApp_OpenTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_OpenTest_Query.graphql"
import { ViewingRoomApp_ClosedTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_ClosedTest_Query.graphql"
import { ViewingRoomApp_UnfoundTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_UnfoundTest_Query.graphql"
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

describe("ViewingRoomApp", () => {
  const slug = "subscription-demo-gg-guy-yanai"

  describe("with open viewing room", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_OpenTest_QueryRawResponse = OpenViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <ViewingRoomApp viewingRoom={viewingRoom}>
                some child
              </ViewingRoomApp>
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomApp_OpenTest_Query($slug: ID!) @raw_response_type {
            viewingRoom(id: $slug) {
              ...ViewingRoomApp_viewingRoom
            }
          }
        `,
        variables: {
          slug,
        },
        mockData: response,
      })
    }

    it("renders the correct components", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ViewingRoomMeta").length).toBe(1)
      expect(wrapper.find("AppContainer").length).toBe(1)
      expect(wrapper.find("ViewingRoomHeader").length).toBe(1)
      expect(wrapper.find("ViewingRoomTabBar").length).toBe(1)
      expect(wrapper.find("ViewingRoomClosed").length).toBe(0)
      expect(wrapper.html()).toContain("some child")
    })

    describe("ViewingRoomHeader", () => {
      describe("desktop", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          expect(wrapper.find("ResponsiveImage").length).toBe(1)
          const html = wrapper.html()
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Closes in about 1 month")
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          expect(wrapper.find("ResponsiveImage").length).toBe(1)
          const html = wrapper.html()
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Closes in about 1 month")
        })
      })
    })

    describe("ViewingRoomTabBar", () => {
      it("renders correct tabs", async () => {
        const wrapper = await getWrapper()
        expect(wrapper.find("Tab").length).toBe(2)
        const html = wrapper.html()
        expect(html).toContain(`href="/viewing-room/${slug}"`)
        expect(html).toContain(`href="/viewing-room/${slug}/works"`)
      })
    })
  })

  describe("with closed viewing room", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_ClosedTest_QueryRawResponse = ClosedViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <ViewingRoomApp viewingRoom={viewingRoom}>
                some child
              </ViewingRoomApp>
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomApp_ClosedTest_Query($slug: ID!) @raw_response_type {
            viewingRoom(id: $slug) {
              ...ViewingRoomApp_viewingRoom
            }
          }
        `,
        variables: {
          slug,
        },
        mockData: response,
      })
    }

    it("renders the correct components", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ViewingRoomMeta").length).toBe(1)
      expect(wrapper.find("AppContainer").length).toBe(1)
      expect(wrapper.find("ViewingRoomHeader").length).toBe(1)
      expect(wrapper.find("ViewingRoomTabBar").length).toBe(0)
      expect(wrapper.find("ViewingRoomClosed").length).toBe(1)
      expect(wrapper.html()).not.toContain("some child")
    })

    describe("ViewingRoomHeader", () => {
      describe("desktop", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          expect(wrapper.find("ResponsiveImage").length).toBe(1)
          const html = wrapper.html()
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Closed")
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          expect(wrapper.find("ResponsiveImage").length).toBe(1)
          const html = wrapper.html()
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Closed")
        })
      })
    })
  })

  describe("with unfound viewing room", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_UnfoundTest_QueryRawResponse = UnfoundViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <ViewingRoomApp viewingRoom={viewingRoom}>
                some child
              </ViewingRoomApp>
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomApp_UnfoundTest_Query($slug: ID!) @raw_response_type {
            viewingRoom(id: $slug) {
              ...ViewingRoomApp_viewingRoom
            }
          }
        `,
        variables: {
          slug,
        },
        mockData: response,
      })
    }
    it("returns 404 page", async () => {
      const wrapper = await getWrapper()
      const html = wrapper.html()
      expect(html).toContain("Sorry, the page you were looking for doesn’t exist at this URL.")
    })
  })
})

const OpenViewingRoomAppFixture: ViewingRoomApp_OpenTest_QueryRawResponse = {
  viewingRoom: {
    title: "Guy Yanai",
    heroImageURL:
      "https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F0RnxWDsVmKuALfpmd75YyA%2FCTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg&width=1200&quality=80",
    partner: {
      name: "Subscription Demo GG",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      href: "/partner-demo-gg",
    },
    formattedEndAt: "Closes in about 1 month",
    status: "live",
  },
}

const ClosedViewingRoomAppFixture: ViewingRoomApp_ClosedTest_QueryRawResponse = {
  viewingRoom: {
    title: "Guy Yanai",
    heroImageURL:
      "https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F0RnxWDsVmKuALfpmd75YyA%2FCTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg&width=1200&quality=80",
    partner: {
      name: "Subscription Demo GG",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      href: "/partner-demo-gg",
    },
    formattedEndAt: "Closed",
    status: "closed",
  },
}

const UnfoundViewingRoomAppFixture: ViewingRoomApp_UnfoundTest_QueryRawResponse = {
  viewingRoom: null,
}