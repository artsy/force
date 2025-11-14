import { ArtworkTopContextBarFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBar"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { getENV } from "Utils/getENV"
import type { ArtworkTopContextBarTestQuery } from "__generated__/ArtworkTopContextBarTestQuery.graphql"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("ArtworkTopContextBar", () => {
  const { renderWithRelay } = setupTestWrapperTL<ArtworkTopContextBarTestQuery>(
    {
      Component: (props: any) => (
        <ArtworkTopContextBarFragmentContainer artwork={props.artwork!} />
      ),
      query: graphql`
        query ArtworkTopContextBarTestQuery @relay_test_operation {
          artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
            ...ArtworkTopContextBar_artwork
          }
        }
      `,
    },
  )

  beforeEach(() => {
    ;(getENV as jest.Mock).mockImplementation(key => {
      if (key === "APP_URL") return "https://artsy.net"
      return process.env[key]
    })
  })

  it("returns null if no artist data", () => {
    const { container } = renderWithRelay({
      Artwork: () => ({
        artist: null,
      }),
    })

    expect(container.innerHTML).toBe("")
  })

  it("renders artist information by default", () => {
    renderWithRelay({
      Artwork: () => ({
        artist: {
          name: "Andy Warhol",
          href: "/artist/andy-warhol",
        },
        title: "Campbell's Soup Can",
        href: "/artwork/andy-warhol-campbells-soup-can",
        context: null,
      }),
    })

    expect(screen.getByText("Andy Warhol")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/artist/andy-warhol",
    )
    // Note: Back arrow behavior needs to be tested through visual verification or data attributes
  })

  it("renders structured data for breadcrumbs", () => {
    const { container } = renderWithRelay({
      Artwork: () => ({
        artist: {
          name: "Andy Warhol",
          href: "/artist/andy-warhol",
        },
        title: "Campbell's Soup Can",
        href: "/artwork/andy-warhol-campbells-soup-can",
        context: null,
      }),
    })

    // Look for the structured data script tag in the container or document
    let structuredDataScript = container.querySelector(
      'script[type="application/ld+json"]',
    )

    // If not found in container, check document head (StructuredData might add it there)
    if (!structuredDataScript) {
      structuredDataScript = document.querySelector(
        'script[type="application/ld+json"]',
      )
    }

    expect(structuredDataScript).toBeTruthy()

    if (structuredDataScript) {
      const schemaData = JSON.parse(structuredDataScript.textContent || "{}")
      expect(schemaData).toEqual({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": "https://artsy.net/artist/andy-warhol",
              "@type": "Person",
              name: "Andy Warhol",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id":
                "https://artsy.net/artwork/andy-warhol-campbells-soup-can#visual-artwork",
              "@type": "VisualArtwork",
              name: "Campbell's Soup Can",
            },
          },
        ],
      })
    }
  })
})
