import { TagAppFragmentContainer } from "Apps/Tag/TagApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { TagApp_Test_Query } from "__generated__/TagApp_Test_Query.graphql"
import { MockBoot } from "DevTools/MockBoot"
import { screen } from "@testing-library/react"
import { findMetaTagBySelector } from "DevTools/findMetaTagBySelector"

jest.unmock("react-relay")
jest.mock("../Components/TagArtworkFilter", () => ({
  TagArtworkFilterRefetchContainer: () => <div />,
}))

const { renderWithRelay } = setupTestWrapperTL<TagApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <TagAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query TagApp_Test_Query @relay_test_operation {
      tag(id: "example") {
        ...TagApp_tag
      }
    }
  `,
})

describe("TagApp", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Tag: () => ({
        name: "Example Tag",
      }),
    })

    expect(screen.getByText("Example Tag")).toBeInTheDocument()
  })

  it("renders meta description from query", async () => {
    renderWithRelay({
      Tag: () => ({
        name: "Example Tag",
        description: "Tag Description",
      }),
    })

    const descriptionMeta = await findMetaTagBySelector(
      "meta[name=description]"
    )

    expect(descriptionMeta).toHaveAttribute("content", "Tag Description")
  })

  it("renders fallback meta description", async () => {
    renderWithRelay({
      Tag: () => ({
        name: "Example",
        description: null,
      }),
    })

    const descriptionMeta = await findMetaTagBySelector(
      "meta[name=description]"
    )

    expect(descriptionMeta).toHaveAttribute(
      "content",
      "Browse all artworks with the Example tag on Artsy. Artsy has the largest collection of art on the Web; browse art by subject matter, medium, size and price."
    )
  })
})
