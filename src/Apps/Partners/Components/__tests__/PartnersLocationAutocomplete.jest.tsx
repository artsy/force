import { screen } from "@testing-library/react"
import { PartnersLocationAutocompleteFragmentContainer } from "Apps/Partners/Components/PartnersLocationAutocomplete"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import type { PartnersLocationAutocomplete_Test_Query } from "__generated__/PartnersLocationAutocomplete_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")

const { renderWithRelay } =
  setupTestWrapperTL<PartnersLocationAutocomplete_Test_Query>({
    Component: PartnersLocationAutocompleteFragmentContainer,
    query: graphql`
      query PartnersLocationAutocomplete_Test_Query @relay_test_operation {
        viewer {
          ...PartnersLocationAutocomplete_viewer
        }
      }
    `,
  })

describe("PartnersLocationAutocomplete", () => {
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

    expect(screen.getByPlaceholderText("All locations")).toBeInTheDocument()
  })
})
