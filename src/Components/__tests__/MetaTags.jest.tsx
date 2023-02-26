import { mount } from "enzyme"
import { MetaTags } from "Components/MetaTags"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("Utils/getENV", () => ({
  getENV: (name: string) => {
    return {
      APP_URL: "https://www.artsy.net",
      GEMINI_CLOUDFRONT_URL: "",
    }[name]
  },
}))

describe("MetaTags", () => {
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
    mount(
      <MockBoot>
        <MetaTags />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artsy — Discover, Buy, and Sell Fine Art")

    expect(tags.links).toEqual([
      { href: "https://www.artsy.net/", rel: "canonical" },
    ])

    expect(tags.meta).toEqual([
      {
        name: "title",
        property: null,
        content: "Artsy — Discover, Buy, and Sell Fine Art",
      },
      {
        name: "description",
        property: null,
        content:
          "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses.",
      },
      { name: null, property: "og:type", content: "website" },
      { name: null, property: "og:url", content: "https://www.artsy.net/" },
      {
        name: null,
        property: "og:title",
        content: "Artsy — Discover, Buy, and Sell Fine Art",
      },
      { name: null, property: "og:site_name", content: "Artsy" },
      {
        name: null,
        property: "og:description",
        content:
          "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses.",
      },
      {
        name: null,
        property: "og:image",
        content:
          "?height=630&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fog_image.jpeg&width=1200",
      },
      {
        content: "308278682573501",
        name: null,
        property: "fb:app_id",
      },
      {
        name: null,
        property: "twitter:title",
        content: "Artsy — Discover, Buy, and Sell Fine Art",
      },
      { name: null, property: "twitter:card", content: "summary" },
      {
        name: null,
        property: "twitter:url",
        content: "https://www.artsy.net/",
      },
      { name: null, property: "twitter:site", content: "@artsy" },
      {
        name: null,
        property: "twitter:description",
        content:
          "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses.",
      },
      {
        name: null,
        property: "twitter:image",
        content:
          "?height=630&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fog_image.jpeg&width=1200",
      },
    ])
  })

  it("renders the appropriate meta tags when passed props", () => {
    mount(
      <MockBoot>
        <MetaTags
          title="My Example Title | Artsy"
          description="My example description."
          imageURL="https://example.com/example.jpg"
          pathname="/artist/example-artist"
        />
      </MockBoot>
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
    mount(
      <MockBoot>
        <MetaTags blockRobots />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.meta.find(tag => tag.name === "robots")).toEqual({
      name: "robots",
      property: null,
      content: "noindex, nofollow",
    })
  })

  it("can deal with pathnames without a leading slash", () => {
    mount(
      <MockBoot>
        <MetaTags pathname="foobar" />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.links.find(tag => tag.rel === "canonical")).toEqual({
      href: "https://www.artsy.net/foobar",
      rel: "canonical",
    })
  })

  it("deals with nulls by falling back to defaults", () => {
    mount(
      <MockBoot>
        <MetaTags
          title={null}
          description={null}
          imageURL={null}
          pathname={null}
        />
      </MockBoot>
    )

    const tags = getTags()

    expect(tags.title).toEqual("Artsy — Discover, Buy, and Sell Fine Art")

    expect(tags.links).toEqual([
      { href: "https://www.artsy.net/", rel: "canonical" },
    ])

    expect(tags.meta).toEqual([
      {
        name: "title",
        property: null,
        content: "Artsy — Discover, Buy, and Sell Fine Art",
      },
      {
        name: "description",
        property: null,
        content:
          "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses.",
      },
      { name: null, property: "og:type", content: "website" },
      { name: null, property: "og:url", content: "https://www.artsy.net/" },
      {
        name: null,
        property: "og:title",
        content: "Artsy — Discover, Buy, and Sell Fine Art",
      },
      { name: null, property: "og:site_name", content: "Artsy" },
      {
        name: null,
        property: "og:description",
        content:
          "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses.",
      },
      {
        name: null,
        property: "og:image",
        content:
          "?height=630&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fog_image.jpeg&width=1200",
      },
      {
        content: "308278682573501",
        name: null,
        property: "fb:app_id",
      },
      {
        name: null,
        property: "twitter:title",
        content: "Artsy — Discover, Buy, and Sell Fine Art",
      },
      { name: null, property: "twitter:card", content: "summary" },
      {
        name: null,
        property: "twitter:url",
        content: "https://www.artsy.net/",
      },
      { name: null, property: "twitter:site", content: "@artsy" },
      {
        name: null,
        property: "twitter:description",
        content:
          "Artsy is the world’s largest online art marketplace. Browse over 1 million artworks by iconic and emerging artists from 4000+ galleries and top auction houses.",
      },
      {
        name: null,
        property: "twitter:image",
        content:
          "?height=630&quality=80&resize_to=fill&src=https%3A%2F%2Ffiles.artsy.net%2Fimages%2Fog_image.jpeg&width=1200",
      },
    ])
  })
})
