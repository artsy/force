import { ArtistMetaFragmentContainer } from "Apps/Artist/Components/ArtistMeta/ArtistMeta"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const mockLocation = { pathname: "example", query: {} }

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: { location: mockLocation },
  }),
}))

jest.mock("Utils/getENV", () => ({
  getENV: (key: string) => {
    if (key === "APP_URL") return "https://www.artsy.net"
    return undefined
  },
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HeadProvider>
        <ArtistMetaFragmentContainer artist={props.artist} />
      </HeadProvider>
    )
  },
  query: graphql`
    query ArtistMeta_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistMeta_artist
      }
    }
  `,
})

const getMetaBy = (selectors): Element | null => {
  const attributeSelectors = Object.entries(selectors).map(
    ([key, value]) => `[${key}='${value}']`,
  )
  const querySelector = `meta${attributeSelectors.join("")}`
  const matchingTag = document.querySelector(querySelector) // eslint-disable no-node-access
  return matchingTag
}

describe("AdminMeta", () => {
  describe("canonical link", () => {
    beforeEach(() => {
      mockLocation.query = {}
      mockLocation.pathname = "/artist/example-artist"
    })

    it("renders basic canonical URL", () => {
      renderWithRelay()

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual(
        "https://www.artsy.net/artist/example-artist",
      )
    })

    it("strips query parameters from canonical URL", () => {
      mockLocation.query = {
        sort: "recently_updated",
        price_range: "1000-5000",
        additional_gene_ids: ["prints"],
      }

      renderWithRelay()

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual(
        "https://www.artsy.net/artist/example-artist",
      )
    })

    it("includes page parameter in canonical URL when page > 1", () => {
      mockLocation.query = {
        page: "3",
      }

      renderWithRelay()

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual(
        "https://www.artsy.net/artist/example-artist?page=3",
      )
    })

    it("includes page parameter but strips other query parameters", () => {
      mockLocation.query = {
        page: "2",
        sort: "recently_updated",
        additional_gene_ids: ["prints"],
        price_range: "1000-5000",
      }

      renderWithRelay()

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual(
        "https://www.artsy.net/artist/example-artist?page=2",
      )
    })

    it("uses base URL when page is 1", () => {
      mockLocation.query = {
        page: "1",
        sort: "recently_updated",
      }

      renderWithRelay()

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual(
        "https://www.artsy.net/artist/example-artist",
      )
    })
  })

  describe("og tags", () => {
    it("renders them", () => {
      renderWithRelay()

      expect(
        getMetaBy({
          property: "og:url",
          content: "https://www.artsy.net/artist/example-artist",
        }),
      ).not.toBeNull()

      expect(
        getMetaBy({
          property: "og:type",
          content: "undefined:artist",
        }),
      ).not.toBeNull()
    })
  })

  describe("optional og tags", () => {
    it("skips rendering them without the data", () => {
      const artist = {
        birthday: null,
        deathday: null,
        nationality: null,
      }
      renderWithRelay({ Artist: () => artist })

      expect(getMetaBy({ property: "og:birthyear" })).toBeNull()
      expect(getMetaBy({ property: "og:deathyear" })).toBeNull()
      expect(getMetaBy({ property: "og:nationality" })).toBeNull()
    })

    it("renders them with the data", () => {
      const artist = {
        birthday: "March 9",
        deathday: "June 7",
        nationality: "American",
      }
      renderWithRelay({ Artist: () => artist })

      expect(
        getMetaBy({ property: "og:birthyear", content: artist.birthday }),
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:deathyear", content: artist.deathday }),
      ).not.toBeNull()
      expect(
        getMetaBy({ property: "og:nationality", content: artist.nationality }),
      ).not.toBeNull()
    })
  })

  describe("alternate names", () => {
    it("skips rendering them without the data", () => {
      const artist = {
        alternateNames: [],
      }
      renderWithRelay({ Artist: () => artist })
      expect(getMetaBy({ name: "skos:prefLabel" })).toBeNull()
    })

    it("renders them with the data", () => {
      const artist = {
        alternateNames: ["Bonnie", "Betty"],
      }
      renderWithRelay({ Artist: () => artist })
      expect(
        getMetaBy({ name: "skos:prefLabel", content: "Bonnie; Betty" }),
      ).not.toBeNull()
    })
  })

  describe("structured data", () => {
    it("renders", () => {
      renderWithRelay()
      const structuredDataTag = document.querySelector(
        "script[type='application/ld+json']",
      )
      expect(structuredDataTag).not.toBeNull()
    })

    describe("WebPage and Person URLs", () => {
      const getStructuredData = () => {
        const structuredDataTag = document.querySelector(
          "script[type='application/ld+json']",
        )
        return structuredDataTag
          ? JSON.parse(structuredDataTag.textContent || "{}")
          : null
      }

      it("uses artist root URL for default artist page", () => {
        mockLocation.pathname = "/artist/andy-warhol"
        const artist = { href: "/artist/andy-warhol" }
        renderWithRelay({ Artist: () => artist })

        const structuredData = getStructuredData()
        const graph = structuredData?.["@graph"]

        const personSchema = graph?.find(
          (item: any) => item["@type"] === "Person",
        )
        const webPageSchema = graph?.find(
          (item: any) => item["@type"] === "WebPage",
        )

        expect(personSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
        expect(personSchema?.mainEntityOfPage).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
        expect(personSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )

        expect(webPageSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
        expect(webPageSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
        expect(webPageSchema?.mainEntity?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
      })

      it("uses articles URL for articles subpage", () => {
        mockLocation.pathname = "/artist/andy-warhol/articles"
        const artist = { href: "/artist/andy-warhol" }
        renderWithRelay({ Artist: () => artist })

        const structuredData = getStructuredData()
        const graph = structuredData?.["@graph"]

        const personSchema = graph?.find(
          (item: any) => item["@type"] === "Person",
        )
        const webPageSchema = graph?.find(
          (item: any) => item["@type"] === "WebPage",
        )

        expect(personSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
        expect(personSchema?.mainEntityOfPage).toBe(
          "https://www.artsy.net/artist/andy-warhol/articles",
        )
        expect(personSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )

        expect(webPageSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol/articles",
        )
        expect(webPageSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol/articles",
        )
        expect(webPageSchema?.mainEntity?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
      })

      it("uses cv URL for cv subpage", () => {
        mockLocation.pathname = "/artist/andy-warhol/cv"
        const artist = { href: "/artist/andy-warhol" }
        renderWithRelay({ Artist: () => artist })

        const structuredData = getStructuredData()
        const graph = structuredData?.["@graph"]

        const personSchema = graph?.find(
          (item: any) => item["@type"] === "Person",
        )
        const webPageSchema = graph?.find(
          (item: any) => item["@type"] === "WebPage",
        )

        expect(personSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
        expect(personSchema?.mainEntityOfPage).toBe(
          "https://www.artsy.net/artist/andy-warhol/cv",
        )
        expect(personSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )

        expect(webPageSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol/cv",
        )
        expect(webPageSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol/cv",
        )
        expect(webPageSchema?.mainEntity?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
      })

      it("uses series URL for series subpage", () => {
        mockLocation.pathname = "/artist/andy-warhol/series"
        const artist = { href: "/artist/andy-warhol" }
        renderWithRelay({ Artist: () => artist })

        const structuredData = getStructuredData()
        const graph = structuredData?.["@graph"]

        const personSchema = graph?.find(
          (item: any) => item["@type"] === "Person",
        )
        const webPageSchema = graph?.find(
          (item: any) => item["@type"] === "WebPage",
        )

        expect(personSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
        expect(personSchema?.mainEntityOfPage).toBe(
          "https://www.artsy.net/artist/andy-warhol/series",
        )
        expect(personSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )

        expect(webPageSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol/series",
        )
        expect(webPageSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol/series",
        )
        expect(webPageSchema?.mainEntity?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
      })

      it("uses shows URL for shows subpage", () => {
        mockLocation.pathname = "/artist/andy-warhol/shows"
        const artist = { href: "/artist/andy-warhol" }
        renderWithRelay({ Artist: () => artist })

        const structuredData = getStructuredData()
        const graph = structuredData?.["@graph"]

        const personSchema = graph?.find(
          (item: any) => item["@type"] === "Person",
        )
        const webPageSchema = graph?.find(
          (item: any) => item["@type"] === "WebPage",
        )

        expect(personSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
        expect(personSchema?.mainEntityOfPage).toBe(
          "https://www.artsy.net/artist/andy-warhol/shows",
        )
        expect(personSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )

        expect(webPageSchema?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol/shows",
        )
        expect(webPageSchema?.url).toBe(
          "https://www.artsy.net/artist/andy-warhol/shows",
        )
        expect(webPageSchema?.mainEntity?.["@id"]).toBe(
          "https://www.artsy.net/artist/andy-warhol",
        )
      })
    })
  })

  describe("route-specific titles and descriptions", () => {
    beforeEach(() => {
      mockLocation.query = {}
    })

    describe("default artist page", () => {
      beforeEach(() => {
        mockLocation.pathname = "/artist/andy-warhol"
      })

      it("renders default title", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const titleTag = document.querySelector("title")
        expect(titleTag?.textContent).toBe(
          "Andy Warhol - Biography, Shows, Articles & More | Artsy",
        )
      })

      it("renders default description without biography blurb", () => {
        const artist = {
          name: "Andy Warhol",
          biographyBlurbPlain: null,
        }
        renderWithRelay({ Artist: () => artist })

        const descriptionTag = getMetaBy({ name: "description" })
        expect(descriptionTag?.getAttribute("content")).toBe(
          "Explore Andy Warhol’s biography, achievements, artworks, auction results, and shows on Artsy.",
        )
      })

      it("renders default description with biography blurb", () => {
        const artist = {
          name: "Andy Warhol",
          biographyBlurbPlain: {
            text: "Andy Warhol was an American visual artist, film director, and producer who was a leading figure in the visual art movement known as pop art.",
          },
        }
        renderWithRelay({ Artist: () => artist })

        const descriptionTag = getMetaBy({ name: "description" })
        expect(descriptionTag?.getAttribute("content")).toBe(
          "Explore Andy Warhol’s biography, achievements, artworks, auction results, and shows on Artsy. Andy Warhol was an American visual artist, film director, and producer",
        )
      })
    })

    describe("articles route", () => {
      beforeEach(() => {
        mockLocation.pathname = "/artist/andy-warhol/articles"
      })

      it("renders articles title", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const titleTag = document.querySelector("title")
        expect(titleTag?.textContent).toBe("Andy Warhol - Articles | Artsy")
      })

      it("renders articles description", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const descriptionTag = getMetaBy({ name: "description" })
        expect(descriptionTag?.getAttribute("content")).toBe(
          "Read articles and editorial content about Andy Warhol on Artsy. Browse reviews, interviews, and critical analysis of their work.",
        )
      })
    })

    describe("cv route", () => {
      beforeEach(() => {
        mockLocation.pathname = "/artist/andy-warhol/cv"
      })

      it("renders cv title", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const titleTag = document.querySelector("title")
        expect(titleTag?.textContent).toBe("Andy Warhol - CV | Artsy")
      })

      it("renders cv description", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const descriptionTag = getMetaBy({ name: "description" })
        expect(descriptionTag?.getAttribute("content")).toBe(
          "View Andy Warhol’s complete exhibition history on Artsy. Browse their CV including solo shows, group shows, and fair booths at galleries and fairs worldwide.",
        )
      })
    })

    describe("series route", () => {
      beforeEach(() => {
        mockLocation.pathname = "/artist/andy-warhol/series"
      })

      it("renders series title", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const titleTag = document.querySelector("title")
        expect(titleTag?.textContent).toBe("Andy Warhol - Series | Artsy")
      })

      it("renders series description", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const descriptionTag = getMetaBy({ name: "description" })
        expect(descriptionTag?.getAttribute("content")).toBe(
          "Explore Andy Warhol’s series on Artsy and discover artworks available to collect. Browse the themes and artistic expressions that define Andy Warhol’s career.",
        )
      })
    })

    describe("shows route", () => {
      beforeEach(() => {
        mockLocation.pathname = "/artist/andy-warhol/shows"
      })

      it("renders shows title", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const titleTag = document.querySelector("title")
        expect(titleTag?.textContent).toBe("Andy Warhol - Shows | Artsy")
      })

      it("renders shows description", () => {
        const artist = { name: "Andy Warhol" }
        renderWithRelay({ Artist: () => artist })

        const descriptionTag = getMetaBy({ name: "description" })
        expect(descriptionTag?.getAttribute("content")).toBe(
          "View current and upcoming exhibitions featuring Andy Warhol on Artsy. Browse shows at galleries and fairs worldwide.",
        )
      })
    })
  })
})
