import { screen } from "@testing-library/react"
import { ArtistsByLetterFragmentContainer } from "Apps/Artists/Routes/ArtistsByLetter"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistsByLetterQuery } from "__generated__/ArtistsByLetterQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/Pagination/useComputeHref")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({ match: { params: { letter: "a" } } }),
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
    query ArtistsByLetter_test_Query($letter: String!, $size: Int, $page: Int) {
      viewer {
        ...ArtistsByLetter_viewer
          @arguments(letter: $letter, page: $page, size: $size)
      }
    }
  `,
})

describe("ArtistsByLetter", () => {
  it("renders the page", () => {
    renderWithRelay()

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Artists - A",
    )
  })
})
