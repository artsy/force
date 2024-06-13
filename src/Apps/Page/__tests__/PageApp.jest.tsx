import { graphql } from "react-relay"
import { PageApp_Test_Query } from "__generated__/PageApp_Test_Query.graphql"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { PageAppFragmentContainer } from "Apps/Page/PageApp"
import { screen } from "@testing-library/react"
import { HttpError } from "found"
import { userIsAdmin } from "Utils/user"

jest.unmock("react-relay")
jest.mock("found")
jest.mock("Utils/user")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({ match: { params: { id: "example" } } }),
}))
jest.mock("Components/MetaTags", () => ({
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
        published: true,
      }),
    })

    expect(screen.getByText("Example content")).toBeInTheDocument()
  })

  it("throws a 404 when a page is unpublished and the user isn't an admin", () => {
    const mockHttpError = HttpError as jest.Mock

    renderWithRelay({
      Page: () => ({
        content: "<p>Example content</p>",
        published: false,
      }),
    })

    expect(mockHttpError).toHaveBeenCalledWith(404)
  })

  it("renders unpublished pages for admins", () => {
    ;(userIsAdmin as jest.Mock).mockImplementationOnce(() => true)

    renderWithRelay({
      Page: () => ({
        content: "<p>Unpublished content</p>",
        published: false,
      }),
    })

    expect(screen.getByText("Unpublished content")).toBeInTheDocument()
  })
})
