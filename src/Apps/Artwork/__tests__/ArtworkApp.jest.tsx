import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { ArtworkAppTestQuery } from "__generated__/ArtworkAppTestQuery.graphql"
import { ArtworkResultFragmentContainer } from "Apps/Artwork/ArtworkApp"
import {
  RelayMockEnvironment,
  createMockEnvironment,
} from "relay-test-utils/lib/RelayModernMockEnvironment"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { useRouter } from "System/Hooks/useRouter"
import { mockLocation } from "DevTools/mockLocation"

let mockRelayEnv: RelayMockEnvironment
let mockShowAuthDialog: jest.Mock

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("Components/AuthDialog", () => {
  const actual = jest.requireActual("Components/AuthDialog")
  return {
    ...actual,
    useAuthDialog: () => {
      return {
        showAuthDialog: mockShowAuthDialog,
      }
    },
  }
})

const { renderWithRelay } = setupTestWrapperTL<ArtworkAppTestQuery>({
  Component: props => {
    return (
      <MockBoot relayEnvironment={mockRelayEnv}>
        <ArtworkResultFragmentContainer
          artworkResult={props.artworkResult!}
          me={props.me!}
          // @ts-ignore - Several more props
          // TODO: We inject `match` here from useRouter, prob not necessary
          match={routerMock.match}
        />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtworkAppTestQuery {
      artworkResult(id: "artwork-id") {
        ...ArtworkApp_artworkResult
      }
      me {
        ...ArtworkApp_me @arguments(artworkID: "artwork-id")
      }
    }
  `,
})

const defaultMockResolvers = {
  ArtworkResult: () => ({
    __typename: "Artwork",
  }),
  Artwork: () => ({
    isInAuction: false,
    sale: null,
    partner: {
      cities: ["Busytown USA"],
    },
  }),
  Query: () => ({
    me: {},
  }),
}

const useRouterMock = useRouter as jest.Mock
let routerMock: any

beforeEach(() => {
  mockRelayEnv = createMockEnvironment()
  mockShowAuthDialog = jest.fn()
  routerMock = {
    silentReplace: jest.fn(),
    silentPush: jest.fn(),
    push: jest.fn(),
    match: {
      location: {
        query: { artworkID: "artwork-id" },
        pathname: "artwork/some-artwork",
        params: { artworkID: "artwork-id" },
      },
    },
  }
  useRouterMock.mockReturnValue(routerMock)
})

describe("ArtworkApp", () => {
  describe("partner_offer_id param is present", () => {
    beforeEach(() => {
      routerMock.match = {
        location: {
          query: { partner_offer_id: "po-id" },
          pathname: "artwork/test-artwork?partner_offer_id=po-id",
        },
        params: { artworkID: "artwork-id" },
      }
      useRouterMock.mockReturnValue(routerMock)
      mockLocation({
        href: "https://artsy.net/artwork/test-artwork?partner_offer_id=po-id",
      })
    })

    it("requires login if there is no user", async () => {
      await renderWithRelay(
        {
          ...defaultMockResolvers,
          Query: () => ({
            me: null,
          }),
        },
        {},
        mockRelayEnv
      )

      await flushPromiseQueue()

      expect(mockShowAuthDialog).toHaveBeenCalledWith({
        analytics: {
          contextModule: "artworkSidebar",
        },
        mode: "Login",
        options: {
          title: expect.any(Function),
        },
      })
    })

    it("cleans up the URL if the user is logged in", async () => {
      await renderWithRelay(defaultMockResolvers, {}, mockRelayEnv)
      await flushPromiseQueue()

      expect(mockShowAuthDialog).not.toHaveBeenCalled()
      expect(routerMock.silentReplace).toHaveBeenCalledWith(
        "https://artsy.net/artwork/test-artwork"
      )
    })
  })
})
