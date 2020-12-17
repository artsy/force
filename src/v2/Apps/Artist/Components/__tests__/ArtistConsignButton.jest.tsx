import { Breakpoint } from "@artsy/palette"
import { ArtistConsignButton_Test_Query } from "v2/__generated__/ArtistConsignButton_Test_Query.graphql"

import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { MockBoot } from "v2/DevTools"
import { cloneDeep } from "lodash"
import React from "react"
import { QueryRenderer, graphql } from "react-relay"
import { ArtistConsignButtonFragmentContainer } from "../ArtistConsignButton"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { mount } from "enzyme"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Analytics/useTracking")

describe("ArtistConsignButton", () => {
  const trackEvent = jest.fn()

  let env = createMockEnvironment() as ReturnType<typeof createMockEnvironment>

  const getWrapper = ({ breakpoint = "xs", response }) => {
    const TestRenderer = () => (
      <QueryRenderer<ArtistConsignButton_Test_Query>
        environment={env}
        query={graphql`
          query ArtistConsignButton_Test_Query {
            artist(id: "alex-katz") {
              ...ArtistConsignButton_artist
            }
          }
        `}
        variables={{}}
        render={({ props, error }) => {
          if (props?.artist) {
            return (
              <MockBoot breakpoint={breakpoint as Breakpoint}>
                <ArtistConsignButtonFragmentContainer artist={props.artist} />
              </MockBoot>
            )
          } else if (error) {
            console.error(error)
          }
        }}
      />
    )

    const wrapper = mount(<TestRenderer />)
    env.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        Artist: () => response,
      })
    )
    wrapper.update()
    return wrapper
  }

  beforeEach(() => {
    env = createMockEnvironment()
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Top 20 (Microfunnel) and Target Supply Button", () => {
    const response = {
      href: "/artist/alex-katz",
      id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
      image: {
        cropped: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=75&height=66&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbrHdWfNxoereaVk2VOneuw%2Flarge.jpg",
        },
      },
      internalID: "fooBarBaz",
      name: "Alex Katz",
      slug: "alex-katz",
      targetSupply: {
        isInMicrofunnel: true,
        isTargetSupply: true,
      },
    }

    const analyticsEvent = {
      action_type: "Click",
      context_module: "ArtistConsignment",
      context_page: "Artist",
      context_page_owner_id: response.internalID,
      context_page_owner_slug: response.slug,
      context_page_owner_type: "Artist",
      subject: "Get Started",
    }

    describe("desktop", () => {
      it("renders properly when in microfunnel", () => {
        const wrapper = getWrapper({
          breakpoint: "md",
          response,
        })

        expect(wrapper.find("Image").length).toEqual(1)
        expect(wrapper.text()).toContain("Sell your Alex Katz")
        expect(wrapper.find("RouterLink").html()).toContain(
          `href="/artist/alex-katz/consign"`
        )
      })

      it("renders properly when target supply", async () => {
        const targetSupplyResponse = cloneDeep(response)
        targetSupplyResponse.targetSupply.isInMicrofunnel = false
        targetSupplyResponse.targetSupply.isTargetSupply = true
        const wrapper = await getWrapper({
          breakpoint: "md",
          response: targetSupplyResponse,
        })
        expect(wrapper.find("Image").length).toEqual(1)
        expect(wrapper.text()).toContain("Sell art from your collection")
        expect(wrapper.find("RouterLink").html()).toContain(`href="/consign"`)
      })

      it("guards against missing imageURL", () => {
        const responseWithoutImage = cloneDeep(response)
        responseWithoutImage.image = null
        const wrapper = getWrapper({
          breakpoint: "md",
          response: responseWithoutImage,
        })
        expect(wrapper.find("Image").length).toEqual(0)
      })

      it("tracks clicks", () => {
        const wrapper = getWrapper({
          breakpoint: "md",
          response,
        })
        wrapper.find("RouterLink").simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          ...analyticsEvent,
          destination_path: "/artist/alex-katz/consign",
        })
      })
    })

    describe("mobile", () => {
      it("renders properly when in microfunnel", () => {
        const wrapper = getWrapper({ breakpoint: "xs", response })
        expect(wrapper.find("Image").length).toEqual(1)
        expect(wrapper.text()).toContain("Sell your Alex Katz")
        expect(wrapper.find("RouterLink").html()).toContain(
          `href="/artist/alex-katz/consign"`
        )
      })

      it("renders properly when target supply", () => {
        const targetSupplyResponse = cloneDeep(response)
        targetSupplyResponse.targetSupply.isInMicrofunnel = false
        targetSupplyResponse.targetSupply.isTargetSupply = true
        const wrapper = getWrapper({
          breakpoint: "xs",
          response: targetSupplyResponse,
        })
        expect(wrapper.find("Image").length).toEqual(1)
        expect(wrapper.text()).toContain("Sell art from your collection")
        expect(wrapper.find("RouterLink").html()).toContain(`href="/consign"`)
      })

      it("guards against missing imageURL", () => {
        const responseWithoutImage = cloneDeep(response)
        responseWithoutImage.image = null
        const wrapper = getWrapper({
          breakpoint: "md",
          response: responseWithoutImage,
        })
        expect(wrapper.find("Image").length).toEqual(0)
      })

      it("tracks clicks", () => {
        const wrapper = getWrapper({
          breakpoint: "xs",
          response,
        })
        wrapper.find("RouterLink").simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          ...analyticsEvent,
          destination_path: "/artist/alex-katz/consign",
        })
      })
    })
  })

  describe("Default Button", () => {
    const response = {
      href: "/artist/andy-warhol",
      id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
      image: {
        cropped: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=75&height=66&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbrHdWfNxoereaVk2VOneuw%2Flarge.jpg",
        },
      },
      internalID: "fooBarBaz",
      name: "Andy Warhol",
      slug: "alex-katz",
      targetSupply: {
        isInMicrofunnel: false,
        isTargetSupply: false,
      },
    }

    const analyticsEvent = {
      action_type: "Click",
      context_module: "ArtistConsignment",
      context_page: "Artist",
      context_page_owner_id: response.internalID,
      context_page_owner_slug: response.slug,
      context_page_owner_type: "Artist",
      subject: "Get Started",
    }

    describe("desktop", () => {
      it("renders properly", () => {
        const wrapper = getWrapper({ breakpoint: "md", response })
        expect(wrapper.find("Image").length).toEqual(0)
        expect(wrapper.text()).toContain("Sell art from your collection")
        expect(wrapper.find("RouterLink").html()).toContain(`href="/consign"`)
      })

      it("tracks clicks", () => {
        const wrapper = getWrapper({
          breakpoint: "md",
          response,
        })
        wrapper.find("RouterLink").simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          ...analyticsEvent,
          destination_path: "/consign",
        })
      })
    })

    describe("mobile", () => {
      it("renders properly", () => {
        const wrapper = getWrapper({ breakpoint: "xs", response })
        expect(wrapper.find("Image").length).toEqual(0)
        expect(wrapper.text()).toContain("Sell art from your collection")
        expect(wrapper.find("RouterLink").html()).toContain(`href="/consign"`)
      })

      it("tracks clicks", () => {
        const wrapper = getWrapper({
          breakpoint: "xs",
          response,
        })
        wrapper.find("RouterLink").simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          ...analyticsEvent,
          destination_path: "/consign",
        })
      })
    })
  })
})
