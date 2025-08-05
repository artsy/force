import { ShowsCityRefetchContainer } from "Apps/Shows/Routes/ShowsCity"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ShowsCityTestQuery } from "__generated__/ShowsCityTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({ router: { push: () => {} } }),
}))

jest.mock("Components/Pagination", () => ({
  PaginationFragmentContainer: () => null,
}))

jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: jest.fn() }),
  Jump: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<ShowsCityTestQuery>({
  Component: ({ viewer, city }) => {
    return (
      <MockBoot>
        <ShowsCityRefetchContainer viewer={viewer!} city={city!} />
      </MockBoot>
    )
  },
  query: graphql`
    query ShowsCityTestQuery @relay_test_operation {
      viewer {
        ...ShowsCity_viewer
      }
      city(slug: "example") {
        ...ShowsCity_city
      }
    }
  `,
})

describe("ShowsCity", () => {
  it("renders correctly", () => {
    const { container } = renderWithRelay({
      City: () => ({ name: "Sunnydale" }),
      Show: () => ({ name: "Example Show", startAt: new Date().toISOString() }),
      ShowConnection: () => ({ totalCount: 44 }),
    })

    expect(container.querySelectorAll("h1").length).toBe(1)
    expect(container.querySelectorAll("h2").length).toBe(2)

    const headings = container.querySelectorAll("h1, h2")
    const headingTexts = Array.from(headings).map(node =>
      node.textContent?.trim().replace(/\u00A0/g, " "),
    )

    expect(headingTexts).toEqual([
      "Opening This Week in Sunnydale 1",
      "Current Shows in Sunnydale 44",
      "Past Shows in Sunnydale",
    ])
  })
})
