import { FairsIndexFragmentContainer } from "Apps/Fairs/Routes/FairsIndex"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { FairsIndexTestQuery } from "__generated__/FairsIndexTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FairsIndexTestQuery>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <FairsIndexFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query FairsIndexTestQuery @relay_test_operation {
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
    renderWithRelay({
      Viewer: () => ({
        runningFairs: [
          {
            isPublished: true,
            profile: { isPublished: true },
          },
        ],
      }),
    })

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText("Current Fairs & Events")).toBeInTheDocument()
    expect(screen.getByText("Past Events")).toBeInTheDocument()
    expect(screen.getByText("Upcoming Events")).toBeInTheDocument()
  })
})
