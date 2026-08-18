import { act, renderHook } from "@testing-library/react-hooks"
import {
  MAX_RECENT_SEARCHES,
  MAX_SAVED_RECENT_SEARCHES,
  type RecentSearch,
  useRecentSearches,
} from "Components/Search/hooks/useRecentSearches"

const RECENT_SEARCHES_KEY = "artsy.recentSearches"

const BANKSY: RecentSearch = { label: "Banksy", href: "/artist/banksy" }
const MONET: RecentSearch = { label: "monet", href: "/search?term=monet" }

const seed = (entries: unknown[]) => {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(entries))
}

const stored = (): unknown => {
  return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)!)
}

describe("useRecentSearches", () => {
  afterEach(() => {
    localStorage.clear()
    jest.restoreAllMocks()
  })

  it("starts empty when nothing is stored", () => {
    const { result } = renderHook(() => useRecentSearches())

    expect(result.current.recentSearches).toEqual([])
  })

  it("reads previously stored searches on mount", () => {
    seed([BANKSY, MONET])

    const { result } = renderHook(() => useRecentSearches())

    expect(result.current.recentSearches).toEqual([BANKSY, MONET])
  })

  it("adds searches most-recent-first and persists them", () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch(BANKSY)
    })
    act(() => {
      result.current.addRecentSearch(MONET)
    })

    expect(result.current.recentSearches).toEqual([MONET, BANKSY])
    expect(stored()).toEqual([MONET, BANKSY])
  })

  it("keeps one entry per label, moving it to the front with the latest destination", () => {
    seed([BANKSY, MONET])

    const { result } = renderHook(() => useRecentSearches())

    // The same label searched as a query this time: latest destination wins
    act(() => {
      result.current.addRecentSearch({
        label: "Banksy",
        href: "/search?term=Banksy",
      })
    })

    expect(result.current.recentSearches).toEqual([
      { label: "Banksy", href: "/search?term=Banksy" },
      MONET,
    ])
  })

  it("dedupes labels case-insensitively", () => {
    seed([BANKSY])

    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch({
        label: "banksy",
        href: "/search?term=banksy",
      })
    })

    expect(result.current.recentSearches).toEqual([
      { label: "banksy", href: "/search?term=banksy" },
    ])
  })

  it("trims labels and ignores empty input", () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch({
        label: "  Banksy  ",
        href: "/artist/banksy",
      })
    })
    act(() => {
      result.current.addRecentSearch({ label: "   ", href: "/search?term=" })
    })

    expect(result.current.recentSearches).toEqual([BANKSY])
  })

  it("shows at most seven entries but keeps older ones stored", () => {
    seed(
      ["one", "two", "three", "four", "five", "six", "seven"].map(label => {
        return { label, href: `/search?term=${label}` }
      }),
    )

    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch({
        label: "eight",
        href: "/search?term=eight",
      })
    })

    expect(result.current.recentSearches).toHaveLength(MAX_RECENT_SEARCHES)
    expect(result.current.recentSearches[0].label).toEqual("eight")

    // The eighth entry drops out of view but stays in storage
    expect(
      result.current.recentSearches.map(search => search.label),
    ).not.toContain("seven")
    expect(stored()).toHaveLength(8)
  })

  it("resurfaces an older stored search when a visible one is removed", () => {
    seed(
      ["one", "two", "three", "four", "five", "six", "seven", "eight"].map(
        label => {
          return { label, href: `/search?term=${label}` }
        },
      ),
    )

    const { result } = renderHook(() => useRecentSearches())

    expect(
      result.current.recentSearches.map(search => search.label),
    ).not.toContain("eight")

    act(() => {
      result.current.removeRecentSearch("one")
    })

    expect(result.current.recentSearches.map(search => search.label)).toContain(
      "eight",
    )
  })

  it("caps stored entries at the saved maximum, dropping the oldest", () => {
    seed(
      Array.from({ length: MAX_SAVED_RECENT_SEARCHES }, (_, i) => {
        return { label: `term-${i}`, href: `/search?term=term-${i}` }
      }),
    )

    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch({
        label: "newest",
        href: "/search?term=newest",
      })
    })

    const storedSearches = stored() as RecentSearch[]
    expect(storedSearches).toHaveLength(MAX_SAVED_RECENT_SEARCHES)
    expect(storedSearches[0].label).toEqual("newest")
    expect(storedSearches.map(search => search.label)).not.toContain(
      `term-${MAX_SAVED_RECENT_SEARCHES - 1}`,
    )
  })

  it("persists analytics metadata recorded with an entity", () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch({
        label: "White Cube",
        href: "/partner/white-cube",
        item_type: "Gallery",
        item_id: "white-cube-id",
      })
    })

    expect(stored()).toEqual([
      {
        label: "White Cube",
        href: "/partner/white-cube",
        item_type: "Gallery",
        item_id: "white-cube-id",
      },
    ])
  })

  it("removes an entry and persists the removal", () => {
    seed([BANKSY, MONET])

    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.removeRecentSearch("Banksy")
    })

    expect(result.current.recentSearches).toEqual([MONET])
    expect(stored()).toEqual([MONET])
  })

  it("upgrades legacy plain-string entries to search results links", () => {
    seed(["street art"])

    const { result } = renderHook(() => useRecentSearches())

    expect(result.current.recentSearches).toEqual([
      { label: "street art", href: "/search?term=street%20art" },
    ])
  })

  it("ignores unparseable stored values", () => {
    localStorage.setItem(RECENT_SEARCHES_KEY, "not json {")

    const { result } = renderHook(() => useRecentSearches())

    expect(result.current.recentSearches).toEqual([])
  })

  it("ignores stored entries that are not recent searches", () => {
    seed([{ nope: "not a search" }, 42, null, BANKSY])

    const { result } = renderHook(() => useRecentSearches())

    expect(result.current.recentSearches).toEqual([BANKSY])
  })

  it("ignores non-string labels from nullable GraphQL fields", () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch({
        label: null as unknown as string,
        href: "/artist/banksy",
      })
    })

    expect(result.current.recentSearches).toEqual([])
  })

  it("only records internal destinations", () => {
    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch({
        label: "external",
        href: "https://evil.example",
      })
    })
    act(() => {
      result.current.addRecentSearch({
        label: "protocol relative",
        href: "//evil.example",
      })
    })
    act(() => {
      result.current.addRecentSearch({
        label: "missing",
        href: undefined as unknown as string,
      })
    })

    expect(result.current.recentSearches).toEqual([])
  })

  it("drops stored entries with external destinations on read", () => {
    seed([{ label: "evil", href: "https://evil.example" }, BANKSY])

    const { result } = renderHook(() => useRecentSearches())

    expect(result.current.recentSearches).toEqual([BANKSY])
  })

  it("renders nothing when reading from storage throws", () => {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage unavailable")
    })

    const { result } = renderHook(() => useRecentSearches())

    expect(result.current.recentSearches).toEqual([])
  })

  it("still updates in-memory state when writing to storage throws", () => {
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable")
    })

    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch(BANKSY)
    })

    expect(result.current.recentSearches).toEqual([BANKSY])
  })

  it("keeps the whole session's searches in memory when writes keep failing", () => {
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable")
    })

    const { result } = renderHook(() => useRecentSearches())

    act(() => {
      result.current.addRecentSearch(BANKSY)
    })
    act(() => {
      result.current.addRecentSearch(MONET)
    })

    // Earlier session searches must survive even though nothing persisted
    expect(result.current.recentSearches).toEqual([MONET, BANKSY])
  })
})
