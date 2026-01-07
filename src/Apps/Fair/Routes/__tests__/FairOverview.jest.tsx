import { screen, waitFor } from "@testing-library/react"
import { FairOverviewFragmentContainer } from "Apps/Fair/Routes/FairOverview"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import type { FairOverviewTestQuery } from "__generated__/FairOverviewTestQuery.graphql"
import { graphql } from "react-relay"

const mockJumpTo = jest.fn()

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: mockJumpTo }),
  Jump: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<FairOverviewTestQuery>({
  Component: ({ fair }) => <FairOverviewFragmentContainer fair={fair!} />,
  query: graphql`
    query FairOverviewTestQuery @relay_test_operation {
      fair(id: "example") {
        ...FairOverview_fair
      }
    }
  `,
})

describe("FairOverview", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    mockJumpTo.mockClear()
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/fair/slug",
          query: {},
        },
      },
    }))
  })

  it("displays the about information", () => {
    renderWithRelay({
      Fair: () => ({
        about: "This is the about.",
      }),
    })

    expect(screen.getByText("This is the about.")).toBeInTheDocument()
  })

  it("renders articles if they are present", () => {
    const { container } = renderWithRelay({
      Fair: () => ({
        href: "/fair/example",
      }),
      ArticleConnection: () => ({
        totalCount: 7,
      }),
    })

    expect(container.innerHTML).toContain("/fair/example/articles")
  })

  it("does not render the collection when it is missing", () => {
    const { container } = renderWithRelay({
      Fair: () => ({ marketingCollections: [] }),
    })

    expect(container.textContent).not.toContain("Curated Highlights")
    expect(container.textContent).not.toContain("Big Artists, Small Sculptures")
  })

  it("does not render articles when they are missing", () => {
    const { container } = renderWithRelay({
      Fair: () => ({
        href: "/fair/example",
        articlesConnection: {
          edges: [],
        },
      }),
    })

    expect(container.innerHTML).not.toContain("/fair/example/articles")
  })

  it("renders the collection when it is present", () => {
    const { container } = renderWithRelay({
      MarketingCollection: () => ({
        title: "Big Artists, Small Sculptures",
      }),
      FilterArtworksConnection: () => ({
        counts: { total: 10 },
      }),
    })

    expect(container.textContent).toContain("Curated Highlights")
    expect(container.textContent).toContain("Big Artists, Small Sculptures")
    expect(container.textContent).toContain("10 works")
  })

  it("displays the timer if fair is open", () => {
    const openTime = new Date()
    openTime.setDate(openTime.getDate() + 1)

    const { container } = renderWithRelay({
      Fair: () => ({
        endAt: openTime.toISOString(),
      }),
    })

    expect(container.textContent).toContain("Closes in:")
  })

  it("don't render the timer if fair closed", () => {
    const { container } = renderWithRelay({
      Fair: () => ({
        endAt: new Date(Date.now() - 86400000).toISOString(),
      }),
    })

    expect(container.textContent).not.toContain("Closes in:")
  })

  it("does not display the timer for the Artsy Edition Shop", () => {
    const openTime = new Date()
    openTime.setDate(openTime.getDate() + 1)

    const { container } = renderWithRelay({
      Fair: () => ({
        endAt: openTime.toISOString(),
        slug: "the-artsy-edition-shop",
      }),
    })

    expect(container.textContent).not.toContain("Closes in:")
  })

  it("scrollTo should be called if url contains `focused_boots` query param", async () => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/fair/slug",
          query: {
            focused_booths: true,
          },
        },
      },
    }))

    renderWithRelay()

    await waitFor(() => expect(mockJumpTo).toBeCalled())
  })

  describe("canonical URL", () => {
    it("renders correct canonical URL for fair overview", () => {
      renderWithRelay({
        Fair: () => ({
          name: "Test Fair",
          href: "/fair/test-fair",
        }),
      })

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink).toHaveAttribute("href", "/fair/test-fair")
    })
  })
})
