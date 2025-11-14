import { ViewingRoomStatementRouteFragmentContainer } from "Apps/ViewingRoom/Routes/Statement/ViewingRoomStatementRoute"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { ViewingRoomStatementRouteTestQuery$rawResponse } from "__generated__/ViewingRoomStatementRouteTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "subscription-demo-gg-guy-yanai",
      },
    },
  }),
}))

describe("ViewingRoomStatementRoute", () => {
  const slug = "subscription-demo-gg-guy-yanai"
  const trackEvent = jest.fn()
  const mockTracking = useTracking as jest.Mock

  beforeEach(() => {
    mockTracking.mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    mockTracking.mockReset()
    trackEvent.mockReset()
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ viewingRoom }: any) => {
      return (
        <MockBoot breakpoint="lg">
          <ViewingRoomStatementRouteFragmentContainer
            viewingRoom={viewingRoom}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query ViewingRoomStatementRouteTestQuery($slug: ID!)
      @raw_response_type
      @relay_test_operation {
        viewingRoom(id: $slug) {
          ...ViewingRoomStatementRoute_viewingRoom
        }
      }
    `,
    variables: {
      slug,
    },
  })

  it("renders the correct components", async () => {
    renderWithRelay({
      ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
    })

    // Check for main sections
    expect(
      screen.getByText(/Checked into a Club Med in the French Alps/),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/View works \(5\)/)).toHaveLength(2)
    expect(
      screen.getByText(/I have everything I need right here/),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Life can only be understood backwards/),
    ).toBeInTheDocument()
    expect(screen.getByText("Guy Yanai")).toBeInTheDocument()
  })

  it("renders view works", async () => {
    renderWithRelay({
      ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
    })

    const viewWorksButtons = screen.getAllByText(/View works \(5\)/)
    expect(viewWorksButtons).toHaveLength(2)
  })

  describe("ViewingRoomIntro", () => {
    it("renders an intro statement", async () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
      })

      expect(
        screen.getByText(/Checked into a Club Med in the French Alps/),
      ).toBeInTheDocument()
    })
  })

  describe("ViewingRoomWorks", () => {
    it("renders artworks", () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
      })

      // Check for artwork artist names (these should be visible)
      expect(screen.getByText("Bill Miles")).toBeInTheDocument()
      expect(screen.getByText("Emma Johnson")).toBeInTheDocument()
    })

    it("renders buttons", async () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
      })

      // Check for links containing the viewing room slug
      const links = screen.getAllByRole("link")
      const worksLinks = links.filter(link =>
        link.getAttribute("href")?.includes(`/viewing-room/${slug}/works`),
      )
      expect(worksLinks.length).toBeGreaterThan(0)
    })

    it("tracks artwork image clicks", () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
      })

      // Find artwork links by their href pattern
      const artworkLinks = screen
        .getAllByRole("link")
        .filter(link =>
          link.getAttribute("href")?.includes(`/viewing-room/${slug}/works`),
        )

      if (artworkLinks[0]) {
        fireEvent.click(artworkLinks[0])

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "clickedArtworkGroup",
          context_module: "viewingRoomArtworkRail",
          destination_path:
            "/viewing-room/subscription-demo-gg-guy-yanai/works",
          subject: "ArtworkThumbnail",
        })
      }
    })

    it("tracks view works button clicks", () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
      })

      // Find the button by its text content - there are multiple "View works" links
      const viewWorksButtons = screen.getAllByText(/View works/)
      const targetButton = viewWorksButtons.find(el =>
        el.closest('[data-test="viewingRoomWorksButton"]'),
      )

      if (targetButton) {
        fireEvent.click(targetButton)

        expect(trackEvent).toHaveBeenCalledWith({
          action_type: "clickedArtworkGroup",
          context_module: "viewingRoomArtworkRail",
          destination_path:
            "/viewing-room/subscription-demo-gg-guy-yanai/works",
          subject: "View works",
        })
      }
    })
  })

  describe("ViewingRoomPullQuote", () => {
    it("displays the correct text", async () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
      })

      expect(
        screen.getByText(/I have everything I need right here/),
      ).toBeInTheDocument()
    })
  })

  describe("ViewingRoomBody", () => {
    it("displays the correct text", async () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
      })

      expect(
        screen.getByText(
          /Life can only be understood backwards; but it must be lived forwards\./,
        ),
      ).toBeInTheDocument()
    })
  })

  describe("ViewingRoomSubsections", () => {
    it("displays the correct text", async () => {
      renderWithRelay({
        ViewingRoom: () => ViewingRoomStatementRouteFixture.viewingRoom,
      })

      expect(screen.getByText("Guy Yanai")).toBeInTheDocument()
      expect(
        screen.getByText(/His visual tools are both ubiquitous and obscure/),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/View of Guy Yanai's studio in February 2019/),
      ).toBeInTheDocument()
    })
  })
})

const ViewingRoomStatementRouteFixture: ViewingRoomStatementRouteTestQuery$rawResponse =
  {
    viewingRoom: {
      introStatement:
        'Checked into a Club Med in the French Alps, and quickly discovered it was not what he expected. The hotel was an outdated ski lodge without any snow. "It was this horrible vacation," the fortysomething artist said of his family trip there, a few years back. Still, he wanted to paint the drab resort—maybe so he could get a do-over of his vacation, this time in colorful and glorious surroundings.',
      artworksConnection: {
        totalCount: 5,
        edges: [
          {
            node: {
              internalID: "5de6b49aa665fc000db78197",
              image: {
                resized: {
                  width: 800,
                  height: 800,
                  src: "https://d2v80f5yrouhh2.cloudfront.net/gUpBURq8BNCVXmeF7X-1ZQ/square.jpg",
                  srcSet:
                    "https://d2v80f5yrouhh2.cloudfront.net/gUpBURq8BNCVXmeF7X-1ZQ/square.jpg",
                },
              },
              artistNames: "Bill Miles",
              title: "Beep Beep",
              date: "2015",
              saleMessage: "Sell me",
              id: "QXJ0d29yazo1ZGU2YjQ5YWE2NjVmYzAwMGRiNzgxOTc=", // pragma: allowlist secret
            },
          },
          {
            node: {
              internalID: "5de6b3a46882b7000eee31f8",
              image: {
                resized: {
                  width: 800,
                  height: 800,
                  src: "https://d2v80f5yrouhh2.cloudfront.net/gUpBURq8BNCVXmeF7X-1ZQ/square.jpg",
                  srcSet:
                    "https://d2v80f5yrouhh2.cloudfront.net/gUpBURq8BNCVXmeF7X-1ZQ/square.jpg",
                },
              },
              artistNames: "Emma Johnson",
              title: "Please Do Not Touch",
              date: "2018",
              saleMessage: "Buy me",
              id: "QXJ0d29yazo1ZGU2YjNhNDY4ODJiNzAwMGVlZTMxZjg=", // pragma: allowlist secret
            },
          },
        ],
      },
      pullQuote:
        "I have everything I need right here. I have this kind of self-sufficiency, and now it's even more valuable.",
      body: "Life can only be understood backwards; but it must be lived forwards.",
      subsections: [
        {
          internalID: "0ea3e292-8bf4-48c4-815a-f342cb4eaf65",
          title: "Guy Yanai",
          body: 'His visual tools are both ubiquitous and obscure, seemingly random but also all somehow personal. Yanai has used the New York Times, Vitra furniture catalogs, Peanuts comic strips, his iPhone photos, and classic films like Claire\'s Knee (1970), directed by Eric Rohmer. "I\'ve done so many paintings from this movie," he said, showing me a reproduction of Lake Annecy (2019), which he painted from a still photo last year. "And honestly, I could do the whole rest of my life just painting from this movie."',
          image: {
            width: 800,
            height: 800,
            imageURLs: {
              normalized:
                "https://artsy-media-uploads.s3.amazonaws.com/QxcoFTsyj4gBuvUFZwrL9g/Studio+shot+February+2019.jpg",
            },
          },
          caption:
            "View of Guy Yanai's studio in February 2019. Photo by Elad Sarig. Courtesy of the artist.",
        },
      ],
    },
  }
