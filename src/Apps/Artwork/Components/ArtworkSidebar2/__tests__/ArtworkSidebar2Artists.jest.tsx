import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkSidebar2ArtistsFragmentContainer } from "../ArtworkSidebar2Artists"
import { ArtworkSidebar2Artists_Test_Query } from "__generated__/ArtworkSidebar2Artists_Test_Query.graphql"
import { fireEvent, screen } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  ArtworkSidebar2Artists_Test_Query
>({
  Component: ({ artwork }) => {
    return <ArtworkSidebar2ArtistsFragmentContainer artwork={artwork!} />
  },
  query: graphql`
    query ArtworkSidebar2Artists_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebar2Artists_artwork
      }
    }
  `,
})

describe("ArtworkSidebar2Artists", () => {
  it("renders correctly when artwork has one artist", () => {
    renderWithRelay({
      Artwork: () => ({
        artists: [
          {
            name: "Josef Albers",
            href: "/artist/josef-albers",
          },
        ],
      }),
    })

    expect(screen.queryByText("Josef Albers")).toBeInTheDocument()
    expect(screen.queryByText("Show more")).not.toBeInTheDocument()
  })

  it("renders correctly when artwork has four artists", () => {
    renderWithRelay({
      Artwork: () => ({
        artists: [
          {
            name: "Josef Albers",
            href: "/artist/josef-albers",
          },
          {
            name: "Banksy",
            href: "/artist/banksy",
          },
          {
            name: "Monica Kim Garza",
            href: "/artist/monica-kim-garza",
          },
          {
            name: "Yayoi Kusama",
            href: "/artist/yayoi-kusama",
          },
        ],
      }),
    })

    expect(screen.queryByText("Josef Albers,")).toBeInTheDocument()
    expect(screen.queryByText("Banksy,")).toBeInTheDocument()
    expect(screen.queryByText("Monica Kim Garza,")).toBeInTheDocument()
    expect(screen.queryByText("Yayoi Kusama")).toBeInTheDocument()

    expect(screen.queryByText("Show more")).not.toBeInTheDocument()
  })

  it("renders show more button when artwork has more than four artists", () => {
    renderWithRelay({
      Artwork: () => ({
        artists: [
          {
            name: "Josef Albers",
            href: "/artist/josef-albers",
          },
          {
            name: "Banksy",
            href: "/artist/banksy",
          },
          {
            name: "Monica Kim Garza",
            href: "/artist/monica-kim-garza",
          },
          {
            name: "Yayoi Kusama",
            href: "/artist/yayoi-kusama",
          },
          {
            name: "Joan Cornella",
            href: "/artist/joan-cornella",
          },
        ],
      }),
    })

    expect(screen.queryByText("Josef Albers,")).toBeInTheDocument()
    expect(screen.queryByText("Banksy,")).toBeInTheDocument()
    expect(screen.queryByText("Monica Kim Garza,")).toBeInTheDocument()
    expect(screen.queryByText("Yayoi Kusama,")).toBeInTheDocument()

    expect(screen.queryByText(/Joan Cornella/)).not.toBeInTheDocument()

    expect(screen.queryByText("1 more")).toBeInTheDocument()

    fireEvent.click(screen.getByText("1 more"))

    expect(screen.queryByText(/Joan Cornella/)).toBeInTheDocument()

    expect(screen.queryByText("1 more")).not.toBeInTheDocument()
    expect(screen.queryByText("Show less")).toBeInTheDocument()
  })

  it("renders cultural maker when artwork has cultural maker", () => {
    renderWithRelay({
      Artwork: () => ({
        culturalMaker: "Cultural Maker",
        artists: [],
      }),
    })

    expect(screen.queryByText("Cultural Maker")).toBeInTheDocument()
  })
})
