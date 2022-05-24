import { graphql } from "relay-runtime"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ArtworkImageBrowserLargeFragmentContainer } from "../ArtworkImageBrowserLarge"
import { ArtworkImageBrowserLarge_Test_Query } from "v2/__generated__/ArtworkImageBrowserLarge_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const { getWrapper } = setupTestWrapper<ArtworkImageBrowserLarge_Test_Query>({
  Component: props => {
    if (!props.artwork) return null

    return (
      <MockBoot>
        <ArtworkImageBrowserLargeFragmentContainer
          artwork={props.artwork}
          maxHeight={800}
          index={0}
          onNext={jest.fn()}
          onPrev={jest.fn()}
        />
      </MockBoot>
    )
  },
  query: graphql`
    query ArtworkImageBrowserLarge_Test_Query @relay_test_operation {
      artwork(id: "example") {
        ...ArtworkImageBrowserLarge_artwork
      }
    }
  `,
})

describe("ArtworkImageBrowserLarge", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
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
