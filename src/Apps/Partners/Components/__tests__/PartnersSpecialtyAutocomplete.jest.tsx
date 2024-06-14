import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { PartnersSpecialtyAutocompleteFragmentContainer } from "Apps/Partners/Components/PartnersSpecialtyAutocomplete"
import { PartnersSpecialtyAutocomplete_Test_Query } from "__generated__/PartnersSpecialtyAutocomplete_Test_Query.graphql"
import { useRouter } from "System/Hooks/useRouter"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")

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

  beforeAll(() => {
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

    expect(screen.getByPlaceholderText("All specialties")).toBeInTheDocument()
  })
})
