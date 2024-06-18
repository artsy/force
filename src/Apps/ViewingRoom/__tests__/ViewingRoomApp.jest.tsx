import { renderRelayTree } from "DevTools/renderRelayTree"
import { MockBoot } from "DevTools/MockBoot"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { ViewingRoomAppFragmentContainer } from "Apps/ViewingRoom/ViewingRoomApp"
import { graphql } from "react-relay"
import { ViewingRoomApp_DraftTest_Query$rawResponse } from "__generated__/ViewingRoomApp_DraftTest_Query.graphql"
import { ViewingRoomApp_ScheduledTest_Query$rawResponse } from "__generated__/ViewingRoomApp_ScheduledTest_Query.graphql"
import { ViewingRoomApp_OpenTest_Query$rawResponse } from "__generated__/ViewingRoomApp_OpenTest_Query.graphql"
import { ViewingRoomApp_ClosedTest_Query$rawResponse } from "__generated__/ViewingRoomApp_ClosedTest_Query.graphql"
import { ViewingRoomApp_LoggedOutTest_Query$rawResponse } from "__generated__/ViewingRoomApp_LoggedOutTest_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { mockLocation } from "DevTools/mockLocation"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useIsRouteActive: () => false,
  useRouter: () => ({
    match: {
      params: {
        slug: "subscription-demo-gg-guy-yanai",
      },
    },
  }),
}))

describe("ViewingRoomApp", () => {
  let user
  const slug = "subscription-demo-gg-guy-yanai"

  beforeEach(() => {
    mockLocation()
    user = { id: "blah" }
    window.history.pushState({}, "Viewing Room Title", slug)
  })

  // DRAFT viewing room
  describe("for draft viewing room when viewed by user that has access to viewing rooms partner", () => {
    // encoded through https://jwt.io with data of "partner_ids": ["00001", "12345"]
    beforeEach(() => {
      user.accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicGFydG5lcl9pZHMiOlsiMDAwMDEiLCIxMjM0NSJdfQ.3mH8dg__KaPBEA5jSU8mHMEExttDIP2-nk3NJ2yb0ok"
    })

    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_DraftTest_Query$rawResponse = DraftViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <SystemContextProvider user={user}>
                <ViewingRoomAppFragmentContainer viewingRoom={viewingRoom}>
                  some child
                </ViewingRoomAppFragmentContainer>
              </SystemContextProvider>
            </MockBoot>
          )
        },
        mockData: response,
        query: graphql`
          query ViewingRoomApp_DraftTest_Query($slug: ID!)
            @raw_response_type
            @relay_test_operation {
            viewingRoom(id: $slug) {
              ...ViewingRoomApp_viewingRoom
            }
          }
        `,
        variables: {
          slug,
        },
      })
    }

    it("renders the correct components", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ViewingRoomMeta").length).toBe(1)
      expect(wrapper.find("ViewingRoomHeader").length).toBe(1)
      expect(wrapper.find("ViewingRoomTabBar").length).toBe(1)
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(0)
      const html = wrapper.html()
      expect(html).toContain("This is a preview of your viewing room.")
    })
  })

  // SCHEDULED viewing room
  describe("with scheduled viewing room", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_ScheduledTest_Query$rawResponse = ScheduledViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <SystemContextProvider user={user}>
                <ViewingRoomAppFragmentContainer viewingRoom={viewingRoom}>
                  some child
                </ViewingRoomAppFragmentContainer>
              </SystemContextProvider>
            </MockBoot>
          )
        },
        mockData: response,
        query: graphql`
          query ViewingRoomApp_ScheduledTest_Query($slug: ID!)
            @raw_response_type
            @relay_test_operation {
            viewingRoom(id: $slug) {
              ...ViewingRoomApp_viewingRoom
            }
          }
        `,
        variables: {
          slug,
        },
      })
    }

    it("renders the correct components", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ViewingRoomMeta").length).toBe(1)
      expect(wrapper.find("ViewingRoomHeader").length).toBe(1)
      expect(wrapper.find("ViewingRoomTabBar").length).toBe(0)
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(1)
      expect(wrapper.html()).not.toContain("some child")
    })

    describe("ViewingRoomHeader", () => {
      describe("desktop", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          const html = wrapper.html()
          expect(html).toContain("<img")
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Opens in 8 days")
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          const html = wrapper.html()
          expect(html).toContain("<img")
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Opens in 8 days")
        })
      })
    })
  })

  // OPEN Viewing Room
  describe("with open viewing room", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_OpenTest_Query$rawResponse = OpenViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <SystemContextProvider user={user}>
                <ViewingRoomAppFragmentContainer viewingRoom={viewingRoom}>
                  some child
                </ViewingRoomAppFragmentContainer>
              </SystemContextProvider>
            </MockBoot>
          )
        },
        mockData: response,
        query: graphql`
          query ViewingRoomApp_OpenTest_Query($slug: ID!)
            @raw_response_type
            @relay_test_operation {
            viewingRoom(id: $slug) {
              ...ViewingRoomApp_viewingRoom
            }
          }
        `,
        variables: {
          slug,
        },
      })
    }

    it("renders the correct components", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ViewingRoomMeta").length).toBe(1)
      expect(wrapper.find("ViewingRoomHeader").length).toBe(1)
      expect(wrapper.find("ViewingRoomTabBar").length).toBe(1)
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(0)
      expect(wrapper.html()).toContain("some child")
    })

    describe("ViewingRoomHeader", () => {
      describe("desktop", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          const html = wrapper.html()
          expect(html).toContain("<img")
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("1 month left")
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()

          const html = wrapper.html()
          expect(html).toContain("<img")
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("1 month left")
        })
      })
    })

    describe("ViewingRoomTabBar", () => {
      it("renders correct tabs", async () => {
        const wrapper = await getWrapper()
        expect(wrapper.find("RouteTab").length).toBe(2)
        const html = wrapper.html()
        expect(html).toContain(`href="/viewing-room/${slug}"`)
        expect(html).toContain(`href="/viewing-room/${slug}/artworks"`)
      })
    })
  })

  // CLOSED viewing room
  describe("with closed viewing room", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_ClosedTest_Query$rawResponse = ClosedViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <SystemContextProvider user={user}>
                <ViewingRoomAppFragmentContainer viewingRoom={viewingRoom}>
                  some child
                </ViewingRoomAppFragmentContainer>
              </SystemContextProvider>
            </MockBoot>
          )
        },
        mockData: response,
        query: graphql`
          query ViewingRoomApp_ClosedTest_Query($slug: ID!)
            @raw_response_type
            @relay_test_operation {
            viewingRoom(id: $slug) {
              ...ViewingRoomApp_viewingRoom
            }
          }
        `,
        variables: {
          slug,
        },
      })
    }

    it("renders the correct components", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ViewingRoomMeta").length).toBe(1)
      expect(wrapper.find("ViewingRoomHeader").length).toBe(1)
      expect(wrapper.find("ViewingRoomTabBar").length).toBe(0)
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(1)
      expect(wrapper.html()).not.toContain("some child")
    })

    describe("ViewingRoomHeader", () => {
      describe("desktop", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          const html = wrapper.html()
          expect(html).toContain("<img")
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Closed")
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          const html = wrapper.html()
          expect(html).toContain("<img")
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Closed")
        })
      })
    })
  })

  describe("with logged out user", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_LoggedOutTest_Query$rawResponse = LoggedOutViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint} user={null}>
              <ViewingRoomAppFragmentContainer viewingRoom={viewingRoom}>
                some child
              </ViewingRoomAppFragmentContainer>
            </MockBoot>
          )
        },
        mockData: response,
        query: graphql`
          query ViewingRoomApp_LoggedOutTest_Query($slug: ID!)
            @raw_response_type
            @relay_test_operation {
            viewingRoom(id: $slug) {
              ...ViewingRoomApp_viewingRoom
            }
          }
        `,
        variables: {
          slug,
        },
      })
    }

    it("shows viewing room content", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ViewingRoomMeta").length).toBe(1)
      expect(wrapper.find("ViewingRoomHeader").length).toBe(1)
      expect(wrapper.find("ViewingRoomTabBar").length).toBe(1)
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(0)
      expect(wrapper.html()).toContain("some child")
      jest.runAllTimers()
    })
  })
})

const DraftViewingRoomAppFixture: ViewingRoomApp_DraftTest_Query$rawResponse = {
  viewingRoom: {
    internalID: "example",
    href: "/viewing-room/example",
    pullQuote: "Example pull quote",
    distanceToClose: null,
    distanceToOpen: null,
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      href: "/partner-demo-gg",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      internalID: "00001",
      name: "Subscription Demo GG",
    },
    status: "draft",
    title: "Not published room",
  },
}

const ScheduledViewingRoomAppFixture: ViewingRoomApp_ScheduledTest_Query$rawResponse = {
  viewingRoom: {
    internalID: "example",
    href: "/viewing-room/example",
    pullQuote: "Example pull quote",
    distanceToClose: null,
    distanceToOpen: "8 days",
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      href: "/partner-demo-gg",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      internalID: "12345",
      name: "Subscription Demo GG",
    },
    status: "scheduled",
    title: "Guy Yanai",
  },
}

const OpenViewingRoomAppFixture: ViewingRoomApp_OpenTest_Query$rawResponse = {
  viewingRoom: {
    internalID: "example",
    href: "/viewing-room/example",
    pullQuote: "Example pull quote",
    distanceToClose: "1 month",
    distanceToOpen: null,
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      href: "/partner-demo-gg",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      internalID: "6789",
      name: "Subscription Demo GG",
    },
    status: "live",
    title: "Guy Yanai",
  },
}

const ClosedViewingRoomAppFixture: ViewingRoomApp_ClosedTest_Query$rawResponse = {
  viewingRoom: {
    internalID: "example",
    href: "/viewing-room/example",
    pullQuote: "Example pull quote",
    distanceToClose: null,
    distanceToOpen: null,
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      href: "/partner-demo-gg",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      internalID: "212121",
      name: "Subscription Demo GG",
    },
    status: "closed",
    title: "Guy Yanai",
  },
}

const LoggedOutViewingRoomAppFixture: ViewingRoomApp_LoggedOutTest_Query$rawResponse = {
  viewingRoom: {
    internalID: "example",
    href: "/viewing-room/example",
    pullQuote: "Example pull quote",
    distanceToClose: "1 month",
    distanceToOpen: null,
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      href: "/partner-demo-gg",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      internalID: "123123123",
      name: "Subscription Demo GG",
    },
    status: "live",
    title: "Guy Yanai",
  },
}
