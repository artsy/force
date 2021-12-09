import { FairsIndexFragmentContainer } from "../FairsIndex"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { FairsIndex_Test_Query } from "v2/__generated__/FairsIndex_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

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
    const wrapper = getWrapper()

    const html = wrapper.html()

    expect(wrapper.find("h1")).toHaveLength(1)

    expect(html).toContain("Current Events")
    expect(html).toContain("Past Events")
    expect(html).toContain("Upcoming Events")
  })
})
