import { renderHook } from "@testing-library/react-hooks"
import { VALID_MEDIUM_FILTERS, useCanonicalHref } from "../useCanonicalHref"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: mockQuery,
      },
    },
  }),
}))

let mockQuery = {}

describe("useCanonicalHref", () => {
  beforeEach(() => {
    mockQuery = {}
  })

  it("returns base href when not in SEO experiment", () => {
    mockQuery = { additional_gene_ids: ["prints"] }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: false,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it("returns base href when no medium filter", () => {
    mockQuery = {}
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it("returns base href when medium filter is invalid", () => {
    mockQuery = { additional_gene_ids: ["invalid-medium"] }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it("returns base href when multiple medium filters", () => {
    mockQuery = { additional_gene_ids: ["prints", "sculpture"] }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it.each(VALID_MEDIUM_FILTERS)(
    "returns URL with medium filter for valid medium: %s",
    medium => {
      mockQuery = { additional_gene_ids: [medium] }
      const { result } = renderHook(() =>
        useCanonicalHref({
          isInSeoExperiment: true,
          href: "/artist/picasso",
        }),
      )
      expect(result.current).toBe(
        `/artist/picasso?additional_gene_ids[0]=${medium}`,
      )
    },
  )

  it("handles empty array of medium filters", () => {
    mockQuery = { additional_gene_ids: [] }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it("handles null/undefined medium filters", () => {
    mockQuery = { additional_gene_ids: null }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })
})
