import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ShowMetaFragmentContainer } from "../Components/ShowMeta"
import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

jest.mock("v2/Utils/getENV", () => ({
  getENV: () => "https://artsy.net",
}))

describe("ShowMeta", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot>
          <ShowMetaFragmentContainer show={props.show} />
        </MockBoot>
      )
    },
    query: graphql`
      query ShowMeta_Test_Query @relay_test_operation {
        show(id: "some-show") {
          ...ShowMeta_show
        }
      }
    `,
  })

  it("returns correct meta tags", () => {
    const wrapper = getWrapper({
      Show: () => ({
        name: "Show",
        slug: "slug",
        metaDescription: "description",
        metaImage: {
          src: "image-src",
        },
      }),
      Partner: () => ({
        name: "Partner",
      }),
    })

    // Since html head tags don't render in regular html lets assert against
    // enzyme's debug output, which will return the react tree.
    const tree = wrapper.debug()

    const assertions = [
      "Show | Artsy",
      '<meta property="og:title" content="Show | Artsy" />',
      '<meta name="description" content="description" />',
      '<meta property="og:description" content="description" />',
      '<link rel="canonical" href="https://artsy.net/show/slug" />',
      '<meta property="og:url" content="https://artsy.net/show/slug" />',
      '<meta property="og:image" content="image-src" />',
    ]

    assertions.forEach(assertion => {
      expect(tree).toContain(assertion)
    })
  })

  it("returns fallback description if regular description isn't provided", () => {
    const wrapper = getWrapper({
      Show: () => ({
        name: "Show",
        slug: "slug",
        metaDescription: null,
        formattedStartAt: "January 21",
        formattedEndAt: "February 27, 2021",
      }),
      Partner: () => ({
        name: "Partner",
      }),
    })

    const tree = wrapper.debug()

    const assertions = [
      '<meta name="description" content="Explore Show from Partner on Artsy. January 21 - February 27, 2021." />',
      '<meta property="og:description" content="Explore Show from Partner on Artsy. January 21 - February 27, 2021." />',
    ]

    assertions.forEach(assertion => {
      expect(tree).toContain(assertion)
    })
  })
})
