import { screen } from "@testing-library/react"
import { ArtistsByLetterFragmentContainer } from "Apps/Artists/Routes/ArtistsByLetter"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistsByLetterQuery } from "__generated__/ArtistsByLetterQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/Pagination/useComputeHref")

const mockUseRouter = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => mockUseRouter(),
}))

const { renderWithRelay } = setupTestWrapperTL<ArtistsByLetterQuery>({
  Component: props => {
    return (
      <MockBoot>
        <ArtistsByLetterFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtistsByLetterTestQuery($letter: String!, $size: Int, $page: Int) {
      viewer {
        ...ArtistsByLetter_viewer
          @arguments(letter: $letter, page: $page, size: $size)
      }
    }
  `,
})

describe("ArtistsByLetter", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the page with correct H1 for page 1", () => {
    mockUseRouter.mockReturnValue({
      match: {
        params: { letter: "a" },
        location: { query: {} },
      },
    })

    renderWithRelay()

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Artists - A",
    )
  })

  it("includes page number in H1 for page 2+", () => {
    mockUseRouter.mockReturnValue({
      match: {
        params: { letter: "d" },
        location: { query: { page: "3" } },
      },
    })

    renderWithRelay()

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Artists - D - Page 3",
    )
  })

  it("handles different letters correctly in H1", () => {
    mockUseRouter.mockReturnValue({
      match: {
        params: { letter: "z" },
        location: { query: { page: "2" } },
      },
    })

    renderWithRelay()

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Artists - Z - Page 2",
    )
  })

  it("handles explicit page=1 as normal page 1", () => {
    mockUseRouter.mockReturnValue({
      match: {
        params: { letter: "a" },
        location: { query: { page: "1" } },
      },
    })

    renderWithRelay()

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Artists - A",
    )
  })

  it("handles invalid page numbers", () => {
    mockUseRouter.mockReturnValue({
      match: {
        params: { letter: "a" },
        location: { query: { page: "invalid" } },
      },
    })

    renderWithRelay()

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Artists - A",
    )
  })
})
