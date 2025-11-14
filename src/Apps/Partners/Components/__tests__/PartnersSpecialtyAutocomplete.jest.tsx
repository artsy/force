import { PartnersSpecialtyAutocompleteFragmentContainer } from "Apps/Partners/Components/PartnersSpecialtyAutocomplete"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { screen } from "@testing-library/react"
import type { PartnersSpecialtyAutocomplete_Test_Query } from "__generated__/PartnersSpecialtyAutocomplete_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")

const { renderWithRelay } =
  setupTestWrapperTL<PartnersSpecialtyAutocomplete_Test_Query>({
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
