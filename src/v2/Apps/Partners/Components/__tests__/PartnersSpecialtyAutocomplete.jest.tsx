import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { PartnersSpecialtyAutocompleteFragmentContainer } from "../PartnersSpecialtyAutocomplete"
import { PartnersSpecialtyAutocomplete_Test_Query } from "v2/__generated__/PartnersSpecialtyAutocomplete_Test_Query.graphql"
import { useRouter } from "v2/System/Router/useRouter"

jest.unmock("react-relay")
jest.mock("v2/System/Router/useRouter")

const { renderWithRelay } = setupTestWrapperTL<
  PartnersSpecialtyAutocomplete_Test_Query
>({
  Component: PartnersSpecialtyAutocompleteFragmentContainer,
  query: graphql`
    query PartnersSpecialtyAutocomplete_Test_Query @relay_test_operation {
      viewer {
        ...PartnersSpecialtyAutocomplete_viewer
      }
    }
  `,
})

describe("PartnersSpecialtyAutocomplete", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      router: { push: jest.fn() },
      match: { location: { query: { location: "" }, pathname: "" } },
    }))
  })

  afterEach(() => {
    mockUseRouter.mockReset()
  })

  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getByPlaceholderText("All Specialties")).toBeInTheDocument()
  })
})
