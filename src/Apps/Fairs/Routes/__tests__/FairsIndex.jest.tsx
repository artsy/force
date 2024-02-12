import { FairsIndexFragmentContainer } from "Apps/Fairs/Routes/FairsIndex"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { FairsIndex_Test_Query } from "__generated__/FairsIndex_Test_Query.graphql"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<FairsIndex_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <FairsIndexFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query FairsIndex_Test_Query @relay_test_operation {
      featuredFairs: orderedSets(key: "art-fairs:featured") {
        ...FairsIndex_featuredFairs
      }
      viewer {
        ...FairsIndex_viewer
      }
    }
  `,
})

describe("FairsIndex", () => {
  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Viewer: () => ({
        runningFairs: [
          {
            isPublished: true,
            profile: { isPublished: true },
          },
        ],
      }),
    })

    const html = wrapper.html()

    expect(wrapper.find("h1")).toHaveLength(1)

    expect(html).toContain("Current Fairs &amp; Events")
    expect(html).toContain("Past Events")
    expect(html).toContain("Upcoming Events")
  })
})
