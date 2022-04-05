import { graphql } from "react-relay"
import { PageApp_Test_Query } from "v2/__generated__/PageApp_Test_Query.graphql"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { PageAppFragmentContainer } from "../PageApp"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({ match: { params: { id: "example" } } }),
}))
jest.mock("v2/Components/MetaTags", () => ({
  MetaTags: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<PageApp_Test_Query>({
  Component: PageAppFragmentContainer,
  query: graphql`
    query PageApp_Test_Query @relay_test_operation {
      page(id: "example") {
        ...PageApp_page
      }
    }
  `,
})

describe("PageApp", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Page: () => ({
        content: "<p>Example content</p>",
      }),
    })

    expect(screen.getByText("Example content")).toBeInTheDocument()
  })
})
