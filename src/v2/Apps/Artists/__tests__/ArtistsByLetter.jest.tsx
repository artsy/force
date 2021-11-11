import {
  ArtistsByLetterFragmentContainer,
  ARTISTS_BY_LETTER_QUERY,
} from "../Routes/ArtistsByLetter"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtistsByLetterQuery } from "v2/__generated__/ArtistsByLetterQuery.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")
jest.mock("v2/Components/Pagination/useComputeHref")

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({ match: { params: { letter: "a" } } }),
}))

const { getWrapper } = setupTestWrapper<ArtistsByLetterQuery>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <ArtistsByLetterFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: ARTISTS_BY_LETTER_QUERY,
})

describe("ArtistsByLetter", () => {
  it("renders the page", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Artists - A")
  })
})
