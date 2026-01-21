import { RedirectException } from "found"
import {
  canonicalSlugRedirect,
  checkForCanonicalSlugRedirect,
} from "System/Router/Utils/canonicalSlugRedirect"

const MockComponent = () => null

const createMatch = (
  params: Record<string, string>,
  location?: { search?: string; hash?: string },
) =>
  ({
    params,
    location: location || {},
  }) as any

describe("canonicalSlugRedirect", () => {
  const createRender = () =>
    canonicalSlugRedirect({
      entityName: "artist",
      paramName: "artistID",
      basePath: "/artist",
    })

  it("renders component when slug matches param", () => {
    const render = createRender()

    const result = render({
      Component: MockComponent,
      props: { artist: { slug: "banksy" } },
      match: createMatch({ artistID: "banksy" }),
    })

    expect(result).toBeDefined()
  })

  it("throws 301 redirect when slug doesn't match param", () => {
    const render = createRender()

    expect(() =>
      render({
        Component: MockComponent,
        props: { artist: { slug: "banksy" } },
        match: createMatch({ artistID: "old-banksy-slug" }),
      }),
    ).toThrow(RedirectException)

    try {
      render({
        Component: MockComponent,
        props: { artist: { slug: "banksy" } },
        match: createMatch({ artistID: "old-banksy-slug" }),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(RedirectException)
      expect((error as any).location).toBe("/artist/banksy")
      expect((error as any).status).toBe(301)
    }
  })

  it("returns undefined when Component is not provided", () => {
    const render = createRender()

    const result = render({
      Component: undefined,
      props: { artist: { slug: "banksy" } },
      match: createMatch({ artistID: "banksy" }),
    })

    expect(result).toBeUndefined()
  })

  it("returns undefined when props is not provided", () => {
    const render = createRender()

    const result = render({
      Component: MockComponent,
      props: undefined,
      match: createMatch({ artistID: "banksy" }),
    })

    expect(result).toBeUndefined()
  })

  it("renders component when entity is null", () => {
    const render = createRender()

    const result = render({
      Component: MockComponent,
      props: { artist: null },
      match: createMatch({ artistID: "banksy" }),
    })

    expect(result).toBeDefined()
  })

  it("renders component when slug is null", () => {
    const render = createRender()

    const result = render({
      Component: MockComponent,
      props: { artist: { slug: null } },
      match: createMatch({ artistID: "banksy" }),
    })

    expect(result).toBeDefined()
  })

  it("works with different entity configurations", () => {
    const geneRender = canonicalSlugRedirect({
      entityName: "gene",
      paramName: "slug",
      basePath: "/gene",
    })

    expect(() =>
      geneRender({
        Component: MockComponent,
        props: { gene: { slug: "pop-art" } },
        match: createMatch({ slug: "old-pop-art" }),
      }),
    ).toThrow(RedirectException)

    try {
      geneRender({
        Component: MockComponent,
        props: { gene: { slug: "pop-art" } },
        match: createMatch({ slug: "old-pop-art" }),
      })
    } catch (error) {
      expect((error as any).location).toBe("/gene/pop-art")
    }
  })

  it("preserves query string when redirecting", () => {
    const render = createRender()

    try {
      render({
        Component: MockComponent,
        props: { artist: { slug: "banksy" } },
        match: createMatch(
          { artistID: "old-banksy-slug" },
          { search: "?page=2&sort=recent" },
        ),
      })
    } catch (error) {
      expect((error as any).location).toBe("/artist/banksy?page=2&sort=recent")
    }
  })

  it("preserves hash when redirecting", () => {
    const render = createRender()

    try {
      render({
        Component: MockComponent,
        props: { artist: { slug: "banksy" } },
        match: createMatch({ artistID: "old-banksy-slug" }, { hash: "#works" }),
      })
    } catch (error) {
      expect((error as any).location).toBe("/artist/banksy#works")
    }
  })

  it("preserves both query string and hash when redirecting", () => {
    const render = createRender()

    try {
      render({
        Component: MockComponent,
        props: { artist: { slug: "banksy" } },
        match: createMatch(
          { artistID: "old-banksy-slug" },
          { search: "?page=2", hash: "#works" },
        ),
      })
    } catch (error) {
      expect((error as any).location).toBe("/artist/banksy?page=2#works")
    }
  })
})

describe("checkForCanonicalSlugRedirect", () => {
  it("does nothing when slug matches param", () => {
    expect(() =>
      checkForCanonicalSlugRedirect({
        entity: { slug: "gagosian" },
        paramValue: "gagosian",
        basePath: "/partner",
        match: createMatch({ partnerId: "gagosian" }),
      }),
    ).not.toThrow()
  })

  it("throws 301 redirect when slug doesn't match param", () => {
    expect(() =>
      checkForCanonicalSlugRedirect({
        entity: { slug: "gagosian" },
        paramValue: "old-gagosian-slug",
        basePath: "/partner",
        match: createMatch({ partnerId: "old-gagosian-slug" }),
      }),
    ).toThrow(RedirectException)

    try {
      checkForCanonicalSlugRedirect({
        entity: { slug: "gagosian" },
        paramValue: "old-gagosian-slug",
        basePath: "/partner",
        match: createMatch({ partnerId: "old-gagosian-slug" }),
      })
    } catch (error) {
      expect(error).toBeInstanceOf(RedirectException)
      expect((error as any).location).toBe("/partner/gagosian")
      expect((error as any).status).toBe(301)
    }
  })

  it("does nothing when entity is null", () => {
    expect(() =>
      checkForCanonicalSlugRedirect({
        entity: null,
        paramValue: "some-slug",
        basePath: "/partner",
        match: createMatch({ partnerId: "some-slug" }),
      }),
    ).not.toThrow()
  })

  it("does nothing when entity is undefined", () => {
    expect(() =>
      checkForCanonicalSlugRedirect({
        entity: undefined,
        paramValue: "some-slug",
        basePath: "/partner",
        match: createMatch({ partnerId: "some-slug" }),
      }),
    ).not.toThrow()
  })

  it("preserves query string when redirecting", () => {
    try {
      checkForCanonicalSlugRedirect({
        entity: { slug: "gagosian" },
        paramValue: "old-gagosian-slug",
        basePath: "/partner",
        match: createMatch(
          { partnerId: "old-gagosian-slug" },
          { search: "?tab=shows" },
        ),
      })
    } catch (error) {
      expect((error as any).location).toBe("/partner/gagosian?tab=shows")
    }
  })

  it("preserves hash when redirecting", () => {
    try {
      checkForCanonicalSlugRedirect({
        entity: { slug: "gagosian" },
        paramValue: "old-gagosian-slug",
        basePath: "/partner",
        match: createMatch(
          { partnerId: "old-gagosian-slug" },
          { hash: "#contact" },
        ),
      })
    } catch (error) {
      expect((error as any).location).toBe("/partner/gagosian#contact")
    }
  })

  it("preserves both query string and hash when redirecting", () => {
    try {
      checkForCanonicalSlugRedirect({
        entity: { slug: "gagosian" },
        paramValue: "old-gagosian-slug",
        basePath: "/partner",
        match: createMatch(
          { partnerId: "old-gagosian-slug" },
          { search: "?tab=shows", hash: "#contact" },
        ),
      })
    } catch (error) {
      expect((error as any).location).toBe(
        "/partner/gagosian?tab=shows#contact",
      )
    }
  })
})
