import { graphql } from "react-relay"
import { FairOrganizerDedicatedArticles_Test_Query } from "__generated__/FairOrganizerDedicatedArticles_Test_Query.graphql"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { FairOrganizerDedicatedArticlesFragmentContainer } from "Apps/FairOrginizer/Routes/FairOrganizerDedicatedArticles"

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

const { getWrapper } = setupTestWrapper<
  FairOrganizerDedicatedArticles_Test_Query
>({
  Component: props => {
    return (
      <FairOrganizerDedicatedArticlesFragmentContainer {...(props as any)} />
    )
  },
  query: graphql`
    query FairOrganizerDedicatedArticles_Test_Query @relay_test_operation {
      fairOrganizer(id: "example") {
        ...FairOrganizerDedicatedArticles_fairOrganizer
      }
    }
  `,
  variables: {
    // @ts-ignore
    first: 10,
    // @ts-ignore
    page: 1,
  },
})

describe("FairOrganizerDedicatedArticles", () => {
  it("renders a section title with the fair organizer name", () => {
    const { wrapper } = getWrapper({
      FairOrganizer: () => ({ name: "The Armory Show" }),
    })

    expect(wrapper.text()).toContain(
      "All Articles for The Armory Show on Artsy"
    )
  })

  it("renders 10 article links", () => {
    const { wrapper } = getWrapper({
      FairOrganizer: () => ({ articlesConnection: articlesFixture }),
    })
    expect(wrapper.find("a").length).toBe(11)
  })

  it("renders pagination", () => {
    const { wrapper } = getWrapper({})
    expect(wrapper.find("Pagination").length).toBe(1)
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
