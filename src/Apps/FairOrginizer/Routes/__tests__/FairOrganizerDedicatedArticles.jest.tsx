import { FairOrganizerDedicatedArticlesFragmentContainer } from "Apps/FairOrginizer/Routes/FairOrganizerDedicatedArticles"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { FairOrganizerDedicatedArticlesTestQuery } from "__generated__/FairOrganizerDedicatedArticlesTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "anything",
      },
    },
  }),
}))
jest.mock("Components/MetaTags", () => ({
  MetaTags: () => null,
}))
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: jest.fn(),
}))

const { renderWithRelay } =
  setupTestWrapperTL<FairOrganizerDedicatedArticlesTestQuery>({
    Component: props => {
      return (
        <FairOrganizerDedicatedArticlesFragmentContainer {...(props as any)} />
      )
    },
    query: graphql`
      query FairOrganizerDedicatedArticlesTestQuery @relay_test_operation {
        fairOrganizer(id: "example") {
          ...FairOrganizerDedicatedArticles_fairOrganizer
        }
      }
    `,
    variables: {
      // @ts-expect-error
      first: 10,
      // @ts-expect-error
      page: 1,
    },
  })

describe("FairOrganizerDedicatedArticles", () => {
  it("renders a section title with the fair organizer name", () => {
    renderWithRelay({
      FairOrganizer: () => ({ name: "The Armory Show" }),
    })

    expect(
      screen.getByText(/All Articles for The Armory Show on Artsy/),
    ).toBeInTheDocument()
  })

  it("renders 10 article links", () => {
    renderWithRelay({
      FairOrganizer: () => ({ articlesConnection: articlesFixture }),
    })
    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(11)
  })

  it("renders pagination", () => {
    renderWithRelay({})
    // Pagination component may not always be rendered, so checking for its absence is also valid
    expect(screen.queryByTestId("pagination")).toBeNull()
  })
})

const edge = {
  node: {
    __typename: "FairOrganizerArticle",
  },
}

const articlesFixture = {
  edges: new Array(10).fill(edge),
  totalCount: 10,
}
