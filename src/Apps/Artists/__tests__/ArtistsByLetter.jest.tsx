import { ArtistsByLetterFragmentContainer } from "Apps/Artists/Routes/ArtistsByLetter"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtistsByLetterQuery } from "__generated__/ArtistsByLetterQuery.graphql"
import { MockBoot } from "DevTools/MockBoot"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/Pagination/useComputeHref")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({ match: { params: { letter: "a" } } }),
}))

const { getWrapper } = setupTestWrapper<ArtistsByLetterQuery>({
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
    const { wrapper } = getWrapper()

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Artists - A")
  })
})
