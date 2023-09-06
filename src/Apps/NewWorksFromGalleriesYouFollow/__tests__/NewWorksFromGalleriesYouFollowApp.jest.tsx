import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { NewWorksFromGalleriesYouFollowAppPaginationContainer } from "Apps/NewWorksFromGalleriesYouFollow/NewWorksFromGalleriesYouFollowApp"
import { useSystemContext } from "System/useSystemContext"

jest.unmock("react-relay")
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))
jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn().mockReturnValue({ route: { path: "/new-for-you" } }),
}))
jest.mock("System/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: true })
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: NewWorksFromGalleriesYouFollowAppPaginationContainer,
  query: graphql`
    query NewWorksFromGalleriesYouFollowApp_test_Query($first: Int)
      @relay_test_operation {
      me {
        newWorksFromGalleriesYouFollowConnection(first: $first) {
          ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection
        }
      }
    }
  `,
})

describe("NewWorksFromGalleriesYouFollowApp", () => {
  it("renders", () => {
    renderWithRelay({
      Me: () => meResponse,
    })

    expect(screen.getByText("MetaTags")).toBeInTheDocument()

    expect(
      screen.getByText("New Works from Galleries You Follow")
    ).toBeInTheDocument()
  })

  it("displays expected messaging for logged out users", () => {
    ;(useSystemContext as jest.Mock).mockReturnValue({ isLoggedIn: false })
    renderWithRelay()

    expect(screen.getByText(/(^Log in)/g)).toBeInTheDocument()
    expect(
      screen.getByText(/(to see your personalized recommendations\.$)/g)
    ).toBeInTheDocument()
  })

  it("does not display messaging for a logged in user", () => {
    renderWithRelay()

    expect(
      screen.queryByText(/(^Already have an account\?)/g)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/(^Log in)/g)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/(to see your personalized recommendations\.$)/g)
    ).not.toBeInTheDocument()
  })

  it("shows expected no-results messaging", () => {
    renderWithRelay({
      Me: () => ({
        newWorksFromGalleriesYouFollowConnection: null,
      }),
    })

    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})

const meResponse = {
  newWorksFromGalleriesYouFollowConnection: {
    totalCount: 10,
    edges: [
      {
        node: {
          internalID: "64e8110c21afcb000b7874cd",
          slug: "francine-tint-the-world-as-i-found-it",
          href: "/artwork/francine-tint-the-world-as-i-found-it",
          title: "The World As I Found It",
          date: "2023",
          sale_message: "Contact for price",
          cultural_maker: null,
          artist: {
            targetSupply: {
              isP1: false,
            },
            id: "QXJ0aXN0OjU0ZTYyNjk1NzI2MTY5M2VhZjY4MDkwMA==",
          },
          marketPriceInsights: null,
          artists: [
            {
              id: "QXJ0aXN0OjU0ZTYyNjk1NzI2MTY5M2VhZjY4MDkwMA==",
              href: "/artist/francine-tint",
              name: "Francine Tint",
            },
          ],
          collecting_institution: null,
          partner: {
            name: "Upsilon Gallery",
            href: "/partner/upsilon-gallery",
            id: "UGFydG5lcjo1NzgzYmRhNjc2MjJkZDY1ZWQwMDAzNTU=",
          },
          sale: null,
          sale_artwork: null,
          id: "QXJ0d29yazo2NGU4MTEwYzIxYWZjYjAwMGI3ODc0Y2Q=",
          isSaved: false,
          artistNames: "Francine Tint",
          preview: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/lB2BlZvr-Yhjcenhd222gg/square.jpg",
          },
          customCollections: {
            totalCount: 0,
          },
          attributionClass: {
            name: "Unique",
            id: "QXR0cmlidXRpb25DbGFzczp1bmlxdWU=",
          },
          mediumType: {
            filterGene: {
              name: "Painting",
              id: "R2VuZTo0ZDkwZDE4ZWRjZGQ1ZjQ0YTUwMDAwMTA=",
            },
          },
          image: {
            src:
              "https://d32dm0rphc51dk.cloudfront.net/lB2BlZvr-Yhjcenhd222gg/larger.jpg",
            width: 1578,
            height: 1539,
          },
        },
      },
    ],
  },
}
