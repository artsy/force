import { getMetadata } from "../getMetadata"

describe("getMetadata", () => {
  describe("medium", () => {
    it("formats medium types", () => {
      const { title, breadcrumbTitle, description } = getMetadata({
        medium: "painting",
        color: undefined,
      })
      expect(title).toBe("Paintings - For Sale on Artsy")
      expect(breadcrumbTitle).toBe("Paintings")
      expect(description).toBe(
        "Buy, bid, and inquire on over 250,000 paintings on Artsy, the world’s largest online marketplace for art and design."
      )
    })

    it("falls back to fallback meta if medium is invalid", () => {
      const { title, breadcrumbTitle, description } = getMetadata({
        medium: "foo" as any,
        color: undefined,
      })
      expect(title).toBe("Collect | Artsy")
      expect(breadcrumbTitle).toBe("Collect")
      expect(description).toBe(
        "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
      )
    })
  })

  describe("color", () => {
    it("formats color types", () => {
      const { title, breadcrumbTitle, description } = getMetadata({
        medium: undefined,
        color: "red",
      })

      expect(title).toBe("Red Art - For Sale on Artsy")
      expect(breadcrumbTitle).toBe("Red Art")
      expect(description).toBe(
        `Discover and buy red art by the world's leading artists on Artsy.`
      )
    })

    it("falls back to fallback meta if medium is invalid", () => {
      const { title, breadcrumbTitle, description } = getMetadata({
        medium: undefined,
        color: "foo" as any,
      })
      expect(title).toBe("Collect | Artsy")
      expect(breadcrumbTitle).toBe("Collect")
      expect(description).toBe(
        "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
      )
    })
  })

  it("formats default types", () => {
    const { title, breadcrumbTitle, description } = getMetadata({
      medium: undefined,
      color: undefined,
    })

    expect(title).toBe("Collect | Artsy")
    expect(breadcrumbTitle).toBe("Collect")
    expect(description).toBe(
      "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
    )
  })
})
