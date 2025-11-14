import { ShowsIndexFragmentContainer } from "Apps/Shows/Routes/ShowsIndex"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ShowsIndexTestQuery } from "__generated__/ShowsIndexTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({ router: { push: () => {} } }),
}))

const { renderWithRelay } = setupTestWrapperTL<ShowsIndexTestQuery>({
  Component: ({ featuredShows, viewer }) => {
    return (
      <MockBoot>
        <ShowsIndexFragmentContainer
          viewer={viewer!}
          featuredShows={featuredShows!}
        />
      </MockBoot>
    )
  },
  query: graphql`
    query ShowsIndexTestQuery @relay_test_operation {
      viewer {
        ...ShowsIndex_viewer
      }
      featuredShows: orderedSet(id: "example") {
        ...ShowsIndex_featuredShows
      }
    }
  `,
})

describe("ShowsIndex", () => {
  it("renders correctly", () => {
    renderWithRelay({
      OrderedSet: () => ({ name: "Featured Shows" }),
      Show: () => ({ name: "Example Show" }),
    })

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Featured Shows",
    )
    expect(screen.getByText("Example Show")).toBeInTheDocument()
  })
})
