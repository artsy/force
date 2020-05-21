import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import ViewingRoomApp from "../ViewingRoomApp"
import { graphql } from "react-relay"
import { ViewingRoomApp_Test_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"

jest.unmock("react-relay")
jest.mock("Artsy/Router/useRouter", () => ({
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

  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: ViewingRoomApp_Test_QueryRawResponse = ViewingRoomAppFixture
  ) => {
    return await renderRelayTree({
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
        query ViewingRoomApp_Test_Query($slug: ID!) @raw_response_type {
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

const ViewingRoomAppFixture: ViewingRoomApp_Test_QueryRawResponse = {
  viewingRoom: {
    title: "Guy Yanai",
    heroImageURL:
      "https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F0RnxWDsVmKuALfpmd75YyA%2FCTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg&width=1200&quality=80",
    partner: {
      name: "Subscription Demo GG",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
    },
    formattedEndAt: "Closes in about 1 month",
  },
}
