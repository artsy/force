import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { Mediator, SystemContextProvider } from "v2/Artsy"
import ViewingRoomApp from "../ViewingRoomApp"
import { graphql } from "react-relay"
import { ViewingRoomApp_DraftTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_DraftTest_Query.graphql"
import { ViewingRoomApp_ScheduledTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_ScheduledTest_Query.graphql"
import { ViewingRoomApp_OpenTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_OpenTest_Query.graphql"
import { ViewingRoomApp_ClosedTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_ClosedTest_Query.graphql"
import { ViewingRoomApp_UnfoundTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_UnfoundTest_Query.graphql"
import { ViewingRoomApp_LoggedOutTest_QueryRawResponse } from "v2/__generated__/ViewingRoomApp_LoggedOutTest_Query.graphql.ts"
import { Breakpoint } from "@artsy/palette"
import { mockLocation } from "v2/DevTools/mockLocation"

jest.useFakeTimers()
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
  let user
  let mediator: Mediator
  const slug = "subscription-demo-gg-guy-yanai"

  beforeEach(() => {
    mockLocation()
    user = { id: "blah" }
    mediator = { trigger: jest.fn() }
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
      response: ViewingRoomApp_DraftTest_QueryRawResponse = DraftViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <SystemContextProvider mediator={mediator} user={user}>
                <ViewingRoomApp viewingRoom={viewingRoom}>
                  some child
                </ViewingRoomApp>
              </SystemContextProvider>
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomApp_DraftTest_Query($slug: ID!) @raw_response_type {
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
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(0)
      const html = wrapper.html()
      expect(html).toContain("This is a preview of your viewing room.")
    })
  })

  // SCHEDULED viewing room
  describe("with scheduled viewing room", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_ScheduledTest_QueryRawResponse = ScheduledViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <SystemContextProvider mediator={mediator} user={user}>
                <ViewingRoomApp viewingRoom={viewingRoom}>
                  some child
                </ViewingRoomApp>
              </SystemContextProvider>
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomApp_ScheduledTest_Query($slug: ID!)
            @raw_response_type {
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
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(1)
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
          expect(html).toContain("Opens in 8 days")
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          expect(wrapper.find("ResponsiveImage").length).toBe(1)
          const html = wrapper.html()
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
      response: ViewingRoomApp_OpenTest_QueryRawResponse = OpenViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <SystemContextProvider mediator={mediator} user={user}>
                <ViewingRoomApp viewingRoom={viewingRoom}>
                  some child
                </ViewingRoomApp>
              </SystemContextProvider>
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
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(0)
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
          expect(html).toContain("Closes in 1 month")
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          expect(wrapper.find("ResponsiveImage").length).toBe(1)
          const html = wrapper.html()
          expect(html).toContain("Guy Yanai")
          expect(html).toContain("Subscription Demo GG")
          expect(html).toContain("Closes in 1 month")
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

  // CLOSED viewing room
  describe("with closed viewing room", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_ClosedTest_QueryRawResponse = ClosedViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <SystemContextProvider mediator={mediator} user={user}>
                <ViewingRoomApp viewingRoom={viewingRoom}>
                  some child
                </ViewingRoomApp>
              </SystemContextProvider>
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
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(1)
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
            <MockBoot
              breakpoint={breakpoint}
              user={user}
              context={{ mediator }}
            >
              <ViewingRoomApp viewingRoom={viewingRoom}>
                some child
              </ViewingRoomApp>
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomApp_UnfoundTest_Query($slug: ID!)
            @raw_response_type {
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
      expect(html).toContain(
        "Sorry, the page you were looking for doesn’t exist at this URL."
      )
    })
  })

  describe("with logged out user", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ViewingRoomApp_LoggedOutTest_QueryRawResponse = LoggedOutViewingRoomAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ viewingRoom }) => {
          return (
            <MockBoot
              breakpoint={breakpoint}
              user={null}
              context={{ mediator }}
            >
              <ViewingRoomApp viewingRoom={viewingRoom}>
                some child
              </ViewingRoomApp>
            </MockBoot>
          )
        },
        query: graphql`
          query ViewingRoomApp_LoggedOutTest_Query($slug: ID!)
            @raw_response_type {
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
    it("shows sign up modal", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ViewingRoomMeta").length).toBe(1)
      expect(wrapper.find("AppContainer").length).toBe(1)
      expect(wrapper.find("ViewingRoomHeader").length).toBe(1)
      expect(wrapper.find("ViewingRoomTabBar").length).toBe(0)
      expect(wrapper.find("ViewingRoomContentNotAccessible").length).toBe(0)
      expect(wrapper.html()).not.toContain("some child")
      jest.runAllTimers()
      expect(mediator.trigger).toHaveBeenCalled()
    })
  })
})

const DraftViewingRoomAppFixture: ViewingRoomApp_DraftTest_QueryRawResponse = {
  viewingRoom: {
    title: "Not published room",
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      name: "Subscription Demo GG",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      href: "/partner-demo-gg",
      internalID: "00001",
    },
    distanceToOpen: null,
    distanceToClose: null,
    status: "draft",
  },
}

const ScheduledViewingRoomAppFixture: ViewingRoomApp_ScheduledTest_QueryRawResponse = {
  viewingRoom: {
    title: "Guy Yanai",
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      name: "Subscription Demo GG",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      href: "/partner-demo-gg",
      internalID: "12345",
    },
    distanceToOpen: "8 days",
    distanceToClose: null,
    status: "scheduled",
  },
}

const OpenViewingRoomAppFixture: ViewingRoomApp_OpenTest_QueryRawResponse = {
  viewingRoom: {
    title: "Guy Yanai",
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      name: "Subscription Demo GG",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      href: "/partner-demo-gg",
      internalID: "6789",
    },
    distanceToOpen: null,
    distanceToClose: "1 month",
    status: "live",
  },
}

const ClosedViewingRoomAppFixture: ViewingRoomApp_ClosedTest_QueryRawResponse = {
  viewingRoom: {
    title: "Guy Yanai",
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      name: "Subscription Demo GG",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      href: "/partner-demo-gg",
      internalID: "212121",
    },
    distanceToOpen: null,
    distanceToClose: null,
    status: "closed",
  },
}

const UnfoundViewingRoomAppFixture: ViewingRoomApp_UnfoundTest_QueryRawResponse = {
  viewingRoom: null,
}

const LoggedOutViewingRoomAppFixture: ViewingRoomApp_LoggedOutTest_QueryRawResponse = {
  viewingRoom: {
    title: "Guy Yanai",
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg",
      },
    },
    partner: {
      name: "Subscription Demo GG",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=",
      href: "/partner-demo-gg",
      internalID: "123123123",
    },
    distanceToOpen: null,
    distanceToClose: "Closes in 1 month",
    status: "live",
  },
}
