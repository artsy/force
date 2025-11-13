import { PaginatedMetaTags } from "Components/PaginatedMetaTags"
import { MockBoot } from "DevTools/MockBoot"
import { useRouter } from "System/Hooks/useRouter"
import { render } from "@testing-library/react"

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

describe("PaginatedMetaTags", () => {
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

  it("renders non-paginated meta tags when on page 1 (no page param)", () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          pathname: "/artist/example/auction-results",
          query: {},
        },
        params: {},
      },
    } as any)

    render(
      <MockBoot>
        <PaginatedMetaTags
          title="Artist Auction Results"
          description="View auction results"
        />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artist Auction Results")
    expect(tags.links.find(tag => tag.rel === "canonical")?.href).toBe(
      "https://www.artsy.net/artist/example/auction-results"
    )
  })

  it("renders non-paginated meta tags when on page 1 (explicit page=1)", () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          pathname: "/artist/example/auction-results",
          query: { page: "1" },
        },
        params: {},
      },
    } as any)

    render(
      <MockBoot>
        <PaginatedMetaTags
          title="Artist Auction Results"
          description="View auction results"
        />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artist Auction Results")
    expect(tags.links.find(tag => tag.rel === "canonical")?.href).toBe(
      "https://www.artsy.net/artist/example/auction-results"
    )
  })

  it("renders paginated meta tags when on page 2+", () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          pathname: "/artist/example/auction-results",
          query: { page: "3" },
        },
        params: {},
      },
    } as any)

    render(
      <MockBoot>
        <PaginatedMetaTags
          title="Artist Auction Results"
          description="View auction results"
        />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artist Auction Results - Page 3")
    expect(tags.meta.find(tag => tag.name === "title")?.content).toBe(
      "Artist Auction Results - Page 3"
    )
    expect(tags.meta.find(tag => tag.property === "og:title")?.content).toBe(
      "Artist Auction Results - Page 3"
    )
    expect(
      tags.meta.find(tag => tag.property === "twitter:title")?.content
    ).toBe("Artist Auction Results - Page 3")
    expect(tags.links.find(tag => tag.rel === "canonical")?.href).toBe(
      "https://www.artsy.net/artist/example/auction-results?page=3"
    )
    expect(tags.meta.find(tag => tag.property === "og:url")?.content).toBe(
      "https://www.artsy.net/artist/example/auction-results?page=3"
    )
    expect(tags.meta.find(tag => tag.property === "twitter:url")?.content).toBe(
      "https://www.artsy.net/artist/example/auction-results?page=3"
    )
  })

  it("allows custom socialTitle to override paginated title for social media", () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          pathname: "/artist/example/auction-results",
          query: { page: "2" },
        },
        params: {},
      },
    } as any)

    render(
      <MockBoot>
        <PaginatedMetaTags
          title="Artist Auction Results"
          socialTitle="Custom Social Title"
          description="View auction results"
        />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artist Auction Results - Page 2")
    expect(tags.meta.find(tag => tag.name === "title")?.content).toBe(
      "Artist Auction Results - Page 2"
    )
    expect(tags.meta.find(tag => tag.property === "og:title")?.content).toBe(
      "Custom Social Title"
    )
    expect(
      tags.meta.find(tag => tag.property === "twitter:title")?.content
    ).toBe("Custom Social Title")
  })

  it("handles invalid page numbers as page 1", () => {
    mockUseRouter.mockReturnValue({
      match: {
        location: {
          pathname: "/artist/example/auction-results",
          query: { page: "invalid" },
        },
        params: {},
      },
    } as any)

    render(
      <MockBoot>
        <PaginatedMetaTags
          title="Artist Auction Results"
          description="View auction results"
        />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artist Auction Results")
    expect(tags.links.find(tag => tag.rel === "canonical")?.href).toBe(
      "https://www.artsy.net/artist/example/auction-results"
    )
  })
})
