import { ArtworkTopContextBarFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/ArtworkTopContextBar"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { getENV } from "Utils/getENV"
import type { ArtworkTopContextBar_Test_Query } from "__generated__/ArtworkTopContextBar_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))

describe("ArtworkTopContextBar", () => {
  const { getWrapper } = setupTestWrapper<ArtworkTopContextBar_Test_Query>({
    Component: ArtworkTopContextBarFragmentContainer,
    query: graphql`
      query ArtworkTopContextBar_Test_Query @relay_test_operation {
        artwork(id: "richard-anuszkiewicz-lino-yellow-318") {
          ...ArtworkTopContextBar_artwork
        }
      }
    `,
  })

  beforeEach(() => {
    ;(getENV as jest.Mock).mockImplementation(key => {
      if (key === "APP_URL") return "https://artsy.net"
      return process.env[key]
    })
  })

  it("returns null if no artist data", () => {
    const { wrapper } = getWrapper({
      Artwork: () => ({
        artist: null,
      }),
    })

    expect(wrapper.html()).toEqual("")
  })

  it("renders artist information by default", () => {
    const { wrapper } = getWrapper({
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

    expect(wrapper.text()).toContain("Andy Warhol")
    expect(wrapper.find("TopContextBar").prop("href")).toBe(
      "/artist/andy-warhol",
    )
    expect(wrapper.find("TopContextBar").prop("displayBackArrow")).toBe(true)
  })

  it("renders structured data for breadcrumbs", () => {
    const { wrapper } = getWrapper({
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

    const structuredData = wrapper.find("StructuredData")
    expect(structuredData.length).toBe(1)
    expect(structuredData.prop("schemaData")).toEqual({
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
  })
})
