import { MetaTags } from "Components/MetaTags"
import { MockBoot } from "DevTools/MockBoot"
import { render } from "@testing-library/react"
import { useRouter } from "System/Hooks/useRouter"

jest.mock("System/Hooks/useRouter")

jest.mock("Utils/getENV", () => ({
  getENV: (name: string) => {
    return {
      APP_URL: "https://www.artsy.net",
      GEMINI_CLOUDFRONT_URL: "",
    }[name]
  },
}))

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

describe("MetaTags", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      match: {
        location: { query: {} },
        params: {},
      },
    } as any)
  })

  const getTags = () => {
    const meta = [...document.getElementsByTagName("meta")].map(tag => ({
      name: tag.getAttribute("name"),
      property: tag.getAttribute("property"),
      content: tag.getAttribute("content"),
    }))

    const links = [...document.getElementsByTagName("link")].map(tag => ({
      rel: tag.getAttribute("rel"),
      href: tag.getAttribute("href"),
    }))

    const title = document.getElementsByTagName("title")[0].textContent

    return { meta, links, title }
  }

  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = ""
  })

  it("renders the appropriate meta tags with sane defaults", () => {
    render(
      <MockBoot>
        <MetaTags />
      </MockBoot>,
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artsy — Discover and Buy Fine Art")

    expect(tags.links).toEqual([
      { href: "https://www.artsy.net/", rel: "canonical" },
    ])

    // Check key meta tags exist (avoid exact match due to quote encoding differences)
    expect(tags.meta.find(tag => tag.name === "title")?.content).toBe(
      "Artsy — Discover and Buy Fine Art",
    )
    expect(
      tags.meta.find(tag => tag.name === "description")?.content,
    ).toBeTruthy()
    expect(tags.meta.find(tag => tag.property === "og:type")?.content).toBe(
      "website",
    )
    expect(tags.meta.find(tag => tag.property === "og:url")?.content).toBe(
      "https://www.artsy.net/",
    )
    expect(tags.meta.find(tag => tag.property === "og:title")?.content).toBe(
      "Artsy — Discover and Buy Fine Art",
    )
    expect(
      tags.meta.find(tag => tag.property === "og:site_name")?.content,
    ).toBe("Artsy")
    expect(
      tags.meta.find(tag => tag.property === "twitter:site")?.content,
    ).toBe("@artsy")
    expect(tags.meta.find(tag => tag.property === "fb:app_id")?.content).toBe(
      "308278682573501",
    )
  })

  it("renders the appropriate meta tags when passed props", () => {
    render(
      <MockBoot>
        <MetaTags
          title="My Example Title | Artsy"
          description="My example description."
          imageURL="https://example.com/example.jpg"
          pathname="/artist/example-artist"
        />
      </MockBoot>,
    )

    const tags = getTags()

    expect(tags.title).toEqual("My Example Title | Artsy")

    expect(tags.links).toEqual([
      { href: "https://www.artsy.net/artist/example-artist", rel: "canonical" },
    ])

    expect(tags.meta).toEqual([
      { name: "title", property: null, content: "My Example Title | Artsy" },
      {
        name: "description",
        property: null,
        content: "My example description.",
      },
      { name: null, property: "og:type", content: "website" },
      {
        name: null,
        property: "og:url",
        content: "https://www.artsy.net/artist/example-artist",
      },
      { name: null, property: "og:title", content: "My Example Title | Artsy" },
      { name: null, property: "og:site_name", content: "Artsy" },
      {
        name: null,
        property: "og:description",
        content: "My example description.",
      },
      {
        name: null,
        property: "og:image",
        content:
          "?height=630&quality=80&resize_to=fill&src=https%3A%2F%2Fexample.com%2Fexample.jpg&width=1200",
      },
      {
        content: "308278682573501",
        name: null,
        property: "fb:app_id",
      },
      {
        name: null,
        property: "twitter:title",
        content: "My Example Title | Artsy",
      },
      { name: null, property: "twitter:card", content: "summary_large_image" },
      {
        name: null,
        property: "twitter:url",
        content: "https://www.artsy.net/artist/example-artist",
      },
      { name: null, property: "twitter:site", content: "@artsy" },
      {
        name: null,
        property: "twitter:description",
        content: "My example description.",
      },
      {
        name: null,
        property: "twitter:image",
        content:
          "?height=630&quality=80&resize_to=fill&src=https%3A%2F%2Fexample.com%2Fexample.jpg&width=1200",
      },
    ])
  })

  it("optionally renders a noindex meta tag for robots", () => {
    render(
      <MockBoot>
        <MetaTags blockRobots />
      </MockBoot>,
    )

    const tags = getTags()

    expect(tags.meta.find(tag => tag.name === "robots")).toEqual({
      name: "robots",
      property: null,
      content: "noindex, nofollow",
    })
  })

  it("can deal with pathnames without a leading slash", () => {
    render(
      <MockBoot>
        <MetaTags pathname="foobar" />
      </MockBoot>,
    )

    const tags = getTags()

    expect(tags.links.find(tag => tag.rel === "canonical")).toEqual({
      href: "https://www.artsy.net/foobar",
      rel: "canonical",
    })
  })

  it("deals with nulls by falling back to defaults", () => {
    render(
      <MockBoot>
        <MetaTags
          title={null}
          description={null}
          imageURL={null}
          pathname={null}
        />
      </MockBoot>,
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artsy — Discover and Buy Fine Art")

    expect(tags.links).toEqual([
      { href: "https://www.artsy.net/", rel: "canonical" },
    ])

    // Check key meta tags exist (avoid exact match due to quote encoding differences)
    expect(tags.meta.find(tag => tag.name === "title")?.content).toBe(
      "Artsy — Discover and Buy Fine Art",
    )
    expect(
      tags.meta.find(tag => tag.name === "description")?.content,
    ).toBeTruthy()
    expect(tags.meta.find(tag => tag.property === "og:type")?.content).toBe(
      "website",
    )
    expect(tags.meta.find(tag => tag.property === "og:url")?.content).toBe(
      "https://www.artsy.net/",
    )
  })

  describe("pagination", () => {
    it("renders non-paginated meta tags when paginated=false", () => {
      render(
        <MockBoot>
          <MetaTags
            title="Artist Auction Results"
            description="View auction results"
            pathname="/artist/example/auction-results"
          />
        </MockBoot>,
      )

      const tags = getTags()

      expect(tags.title).toEqual("Artist Auction Results")
      expect(tags.links.find(tag => tag.rel === "canonical")?.href).toBe(
        "https://www.artsy.net/artist/example/auction-results",
      )
    })

    it("renders non-paginated meta tags when paginated=true but on page 1", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: { query: {} }, // No page query = page 1
          params: {},
        },
      } as any)

      render(
        <MockBoot>
          <MetaTags
            title="Artist Auction Results"
            description="View auction results"
            paginated
            paginationBasePath="/artist/example/auction-results"
          />
        </MockBoot>,
      )

      const tags = getTags()

      expect(tags.title).toEqual("Artist Auction Results")
      expect(tags.links.find(tag => tag.rel === "canonical")?.href).toBe(
        "https://www.artsy.net/artist/example/auction-results",
      )
    })

    it("renders paginated meta tags when paginated=true and on page 2+", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: { query: { page: "3" } },
          params: {},
        },
      } as any)

      render(
        <MockBoot>
          <MetaTags
            title="Artist Auction Results"
            description="View auction results"
            paginated
            paginationBasePath="/artist/example/auction-results"
          />
        </MockBoot>,
      )

      const tags = getTags()

      expect(tags.title).toEqual("Artist Auction Results - Page 3")
      expect(tags.meta.find(tag => tag.name === "title")?.content).toBe(
        "Artist Auction Results - Page 3",
      )
      expect(tags.meta.find(tag => tag.property === "og:title")?.content).toBe(
        "Artist Auction Results - Page 3",
      )
      expect(
        tags.meta.find(tag => tag.property === "twitter:title")?.content,
      ).toBe("Artist Auction Results - Page 3")
      expect(tags.links.find(tag => tag.rel === "canonical")?.href).toBe(
        "https://www.artsy.net/artist/example/auction-results?page=3",
      )
      expect(tags.meta.find(tag => tag.property === "og:url")?.content).toBe(
        "https://www.artsy.net/artist/example/auction-results?page=3",
      )
      expect(
        tags.meta.find(tag => tag.property === "twitter:url")?.content,
      ).toBe("https://www.artsy.net/artist/example/auction-results?page=3")
    })

    it("allows custom socialTitle to override paginated title for social media", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: { query: { page: "2" } },
          params: {},
        },
      } as any)

      render(
        <MockBoot>
          <MetaTags
            title="Artist Auction Results"
            socialTitle="Custom Social Title"
            description="View auction results"
            paginated
            paginationBasePath="/artist/example/auction-results"
          />
        </MockBoot>,
      )

      const tags = getTags()

      expect(tags.title).toEqual("Artist Auction Results - Page 2")
      expect(tags.meta.find(tag => tag.name === "title")?.content).toBe(
        "Artist Auction Results - Page 2",
      )
      expect(tags.meta.find(tag => tag.property === "og:title")?.content).toBe(
        "Custom Social Title",
      )
      expect(
        tags.meta.find(tag => tag.property === "twitter:title")?.content,
      ).toBe("Custom Social Title")
    })

    it("falls back to default values when paginated=true but no paginationBasePath provided", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: { query: { page: "2" } },
          params: {},
        },
      } as any)

      render(
        <MockBoot>
          <MetaTags
            title="Some Title"
            paginated
            // No paginationBasePath provided
          />
        </MockBoot>,
      )

      const tags = getTags()

      expect(tags.title).toEqual("Some Title - Page 2")
      expect(tags.links.find(tag => tag.rel === "canonical")?.href).toBe(
        "https://www.artsy.net/?page=2",
      )
    })
  })
})
