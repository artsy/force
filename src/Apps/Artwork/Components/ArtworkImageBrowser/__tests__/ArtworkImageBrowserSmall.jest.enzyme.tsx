import { graphql } from "react-relay"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ArtworkImageBrowserSmallFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkImageBrowserSmall"
import { ArtworkImageBrowserSmall_Test_Query } from "__generated__/ArtworkImageBrowserSmall_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("react-tracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const { getWrapper } = setupTestWrapper<ArtworkImageBrowserSmall_Test_Query>({
  Component: props => {
    if (!props.artwork) return null

    return (
      <MockBoot>
        <ArtworkImageBrowserSmallFragmentContainer
          artwork={props.artwork}
          maxHeight={800}
          activeIndex={0}
          setActiveIndex={jest.fn()}
        />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtworkImageBrowserSmall_Test_Query @relay_test_operation {
      artwork(id: "example") {
        ...ArtworkImageBrowserSmall_artwork
      }
    }
  `,
})

describe("ArtworkImageBrowserSmall", () => {
  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Artwork: () => ({
        figures: [{ __typename: "Image" }],
      }),
      Image: () => ({ isDefault: true }),
      ResizedImageUrl: () => ({
        width: 800,
        height: 600,
        src: "example.jpg",
        srcSet: "example.jpg 1x",
      }),
    })

    expect(wrapper.html()).toContain("max-width: 800px")
    expect(wrapper.html()).toContain('src="example.jpg"')
    expect(wrapper.html()).toContain('srcset="example.jpg 1x"')
  })
})
