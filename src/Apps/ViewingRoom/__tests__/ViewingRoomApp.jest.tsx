import type { Breakpoint } from "@artsy/palette"
import { screen } from "@testing-library/react"
import { ViewingRoomAppFragmentContainer } from "Apps/ViewingRoom/ViewingRoomApp"
import { MockBoot } from "DevTools/MockBoot"
import { mockLocation } from "DevTools/mockLocation"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import type { ViewingRoomAppClosedTestQuery$rawResponse } from "__generated__/ViewingRoomAppClosedTestQuery.graphql"
import type { ViewingRoomAppDraftTestQuery$rawResponse } from "__generated__/ViewingRoomAppDraftTestQuery.graphql"
import type { ViewingRoomAppLoggedOutTestQuery$rawResponse } from "__generated__/ViewingRoomAppLoggedOutTestQuery.graphql"
import type { ViewingRoomAppOpenTestQuery$rawResponse } from "__generated__/ViewingRoomAppOpenTestQuery.graphql"
import type { ViewingRoomAppScheduledTestQuery$rawResponse } from "__generated__/ViewingRoomAppScheduledTestQuery.graphql"
import { graphql } from "react-relay"

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

  afterEach(() => {
    // Clean up document head between tests since react-head components
    // render meta tags to <head>, not to the component's DOM container
    document.getElementsByTagName("html")[0].innerHTML = ""
  })

  // DRAFT viewing room
  describe("for draft viewing room when viewed by user that has access to viewing rooms partner", () => {
    // encoded through https://jwt.io with data of "partner_ids": ["00001", "12345"]
    beforeEach(() => {
      user.accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicGFydG5lcl9pZHMiOlsiMDAwMDEiLCIxMjM0NSJdfQ.3mH8dg__KaPBEA5jSU8mHMEExttDIP2-nk3NJ2yb0ok" // pragma: allowlist secret
    })

    const { renderWithRelay } = setupTestWrapperTL({
      Component: ({ viewingRoom }: any, breakpoint: Breakpoint = "lg") => {
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
      query: graphql`
        query ViewingRoomAppDraftTestQuery($slug: ID!)
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

    it("renders the correct components", async () => {
      renderWithRelay({
        ViewingRoom: () => DraftViewingRoomAppFixture.viewingRoom,
      })
      expect(
        screen.getByText("This is a preview of your viewing room."),
      ).toBeInTheDocument()
    })

    it("renders noindex meta tag for draft viewing room", async () => {
      renderWithRelay({
        ViewingRoom: () => DraftViewingRoomAppFixture.viewingRoom,
      })

      const robotsMeta = [...document.getElementsByTagName("meta")].find(
        tag => tag.getAttribute("name") === "robots",
      )
      expect(robotsMeta).toBeTruthy()
      expect(robotsMeta?.getAttribute("content")).toBe("noindex, follow")
    })
  })

  // SCHEDULED viewing room
  describe("with scheduled viewing room", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: ({ viewingRoom }: any, breakpoint: Breakpoint = "lg") => {
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
      query: graphql`
        query ViewingRoomAppScheduledTestQuery($slug: ID!)
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

    it("renders the correct components", async () => {
      const { container } = renderWithRelay({
        ViewingRoom: () => ScheduledViewingRoomAppFixture.viewingRoom,
      })
      expect(container).toBeInTheDocument()
    })

    it("renders noindex meta tag for scheduled viewing room", async () => {
      renderWithRelay({
        ViewingRoom: () => ScheduledViewingRoomAppFixture.viewingRoom,
      })

      const robotsMeta = [...document.getElementsByTagName("meta")].find(
        tag => tag.getAttribute("name") === "robots",
      )
      expect(robotsMeta).toBeTruthy()
      expect(robotsMeta?.getAttribute("content")).toBe("noindex, follow")
    })

    describe("ViewingRoomHeader", () => {
      describe("desktop", () => {
        it("renders correctly", async () => {
          const { container } = renderWithRelay({
            ViewingRoom: () => ScheduledViewingRoomAppFixture.viewingRoom,
          })
          expect(container).toBeInTheDocument()
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const { container } = renderWithRelay(
            {
              ViewingRoom: () => ScheduledViewingRoomAppFixture.viewingRoom,
            },
            "xs",
          )
          expect(container).toBeInTheDocument()
        })
      })
    })
  })

  // OPEN Viewing Room
  describe("with open viewing room", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: ({ viewingRoom }: any, breakpoint: Breakpoint = "lg") => {
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
      query: graphql`
        query ViewingRoomAppOpenTestQuery($slug: ID!)
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

    it("renders the correct components", async () => {
      const { container } = renderWithRelay({
        ViewingRoom: () => OpenViewingRoomAppFixture.viewingRoom,
      })
      expect(container).toBeInTheDocument()
    })

    it("does not render noindex meta tag for live viewing room", async () => {
      renderWithRelay({
        ViewingRoom: () => OpenViewingRoomAppFixture.viewingRoom,
      })

      const robotsMeta = [...document.getElementsByTagName("meta")].find(
        tag => tag.getAttribute("name") === "robots",
      )
      expect(robotsMeta).toBeUndefined()
    })

    describe("ViewingRoomHeader", () => {
      describe("desktop", () => {
        it("renders correctly", async () => {
          const { container } = renderWithRelay({
            ViewingRoom: () => OpenViewingRoomAppFixture.viewingRoom,
          })
          expect(container).toBeInTheDocument()
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const { container } = renderWithRelay(
            {
              ViewingRoom: () => OpenViewingRoomAppFixture.viewingRoom,
            },
            "xs",
          )
          expect(container).toBeInTheDocument()
        })
      })
    })

    describe("ViewingRoomTabBar", () => {
      it("renders correct tabs", async () => {
        const { container } = renderWithRelay({
          ViewingRoom: () => OpenViewingRoomAppFixture.viewingRoom,
        })
        expect(container.innerHTML).toContain(`href="/viewing-room/${slug}"`)
        expect(container.innerHTML).toContain(
          `href="/viewing-room/${slug}/artworks"`,
        )
      })
    })
  })

  // CLOSED viewing room
  describe("with closed viewing room", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: ({ viewingRoom }: any, breakpoint: Breakpoint = "lg") => {
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
      query: graphql`
        query ViewingRoomAppClosedTestQuery($slug: ID!)
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

    it("renders the correct components", async () => {
      const { container } = renderWithRelay({
        ViewingRoom: () => ClosedViewingRoomAppFixture.viewingRoom,
      })
      expect(container).toBeInTheDocument()
      expect(container.innerHTML).not.toContain("some child")
    })

    it("renders noindex meta tag for closed viewing room", async () => {
      renderWithRelay({
        ViewingRoom: () => ClosedViewingRoomAppFixture.viewingRoom,
      })

      const robotsMeta = [...document.getElementsByTagName("meta")].find(
        tag => tag.getAttribute("name") === "robots",
      )
      expect(robotsMeta).toBeTruthy()
      expect(robotsMeta?.getAttribute("content")).toBe("noindex, follow")
    })

    describe("ViewingRoomHeader", () => {
      describe("desktop", () => {
        it("renders correctly", async () => {
          const { container } = renderWithRelay({
            ViewingRoom: () => ClosedViewingRoomAppFixture.viewingRoom,
          })
          expect(container).toBeInTheDocument()
        })
      })

      describe("mobile", () => {
        it("renders correctly", async () => {
          const { container } = renderWithRelay(
            {
              ViewingRoom: () => ClosedViewingRoomAppFixture.viewingRoom,
            },
            "xs",
          )
          expect(container).toBeInTheDocument()
        })
      })
    })
  })

  describe("with logged out user", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: ({ viewingRoom }: any, breakpoint: Breakpoint = "lg") => {
        return (
          <MockBoot breakpoint={breakpoint} user={null}>
            <ViewingRoomAppFragmentContainer viewingRoom={viewingRoom}>
              some child
            </ViewingRoomAppFragmentContainer>
          </MockBoot>
        )
      },
      query: graphql`
        query ViewingRoomAppLoggedOutTestQuery($slug: ID!)
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

    it("shows viewing room content", async () => {
      const { container } = renderWithRelay({
        ViewingRoom: () => LoggedOutViewingRoomAppFixture.viewingRoom,
      })
      expect(container).toBeInTheDocument()
      expect(container.innerHTML).toContain("some child")
      jest.runAllTimers()
    })

    it("does not render noindex meta tag for live viewing room when logged out", async () => {
      renderWithRelay({
        ViewingRoom: () => LoggedOutViewingRoomAppFixture.viewingRoom,
      })

      const robotsMeta = [...document.getElementsByTagName("meta")].find(
        tag => tag.getAttribute("name") === "robots",
      )
      expect(robotsMeta).toBeUndefined()
    })
  })
})

const DraftViewingRoomAppFixture: ViewingRoomAppDraftTestQuery$rawResponse = {
  viewingRoom: {
    internalID: "example",
    href: "/viewing-room/example",
    pullQuote: "Example pull quote",
    introStatement: "Example intro statement",
    startAt: "2024-01-01T00:00:00Z",
    endAt: "2024-02-01T00:00:00Z",
    distanceToClose: null,
    distanceToOpen: null,
    image: {
      imageURLs: {
        normalized:
          "https://artsy-media-uploads.s3.amazonaws.com/0RnxWDsVmKuALfpmd75YyA/CTPHSEPT19_018_JO_Guy_Yanai_TLV_031_20190913.jpg", // pragma: allowlist secret
      },
    },
    partner: {
      href: "/partner-demo-gg",
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=", // pragma: allowlist secret
      internalID: "00001",
      name: "Subscription Demo GG",
    },
    status: "draft",
    title: "Not published room",
  },
}

const ScheduledViewingRoomAppFixture: ViewingRoomAppScheduledTestQuery$rawResponse =
  {
    viewingRoom: {
      internalID: "example",
      href: "/viewing-room/example",
      pullQuote: "Example pull quote",
      introStatement: "Example intro statement",
      startAt: "2024-01-01T00:00:00Z",
      endAt: "2024-02-01T00:00:00Z",
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
        id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=", // pragma: allowlist secret
        internalID: "12345",
        name: "Subscription Demo GG",
      },
      status: "scheduled",
      title: "Guy Yanai",
    },
  }

const OpenViewingRoomAppFixture: ViewingRoomAppOpenTestQuery$rawResponse = {
  viewingRoom: {
    internalID: "example",
    href: "/viewing-room/example",
    pullQuote: "Example pull quote",
    introStatement: "Example intro statement",
    startAt: "2024-01-01T00:00:00Z",
    endAt: "2024-02-01T00:00:00Z",
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
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=", // pragma: allowlist secret
      internalID: "6789",
      name: "Subscription Demo GG",
    },
    status: "live",
    title: "Guy Yanai",
  },
}

const ClosedViewingRoomAppFixture: ViewingRoomAppClosedTestQuery$rawResponse = {
  viewingRoom: {
    internalID: "example",
    href: "/viewing-room/example",
    pullQuote: "Example pull quote",
    introStatement: "Example intro statement",
    startAt: "2024-01-01T00:00:00Z",
    endAt: "2024-02-01T00:00:00Z",
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
      id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=", // pragma: allowlist secret
      internalID: "212121",
      name: "Subscription Demo GG",
    },
    status: "closed",
    title: "Guy Yanai",
  },
}

const LoggedOutViewingRoomAppFixture: ViewingRoomAppLoggedOutTestQuery$rawResponse =
  {
    viewingRoom: {
      internalID: "example",
      href: "/viewing-room/example",
      pullQuote: "Example pull quote",
      introStatement: "Example intro statement",
      startAt: "2024-01-01T00:00:00Z",
      endAt: "2024-02-01T00:00:00Z",
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
        id: "UGFydG5lcjo1NTQxMjM3MzcyNjE2OTJiMTk4YzAzMDA=", // pragma: allowlist secret
        internalID: "123123123",
        name: "Subscription Demo GG",
      },
      status: "live",
      title: "Guy Yanai",
    },
  }
