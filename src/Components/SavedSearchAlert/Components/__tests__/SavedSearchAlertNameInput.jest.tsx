import { screen } from "@testing-library/react"
import { SavedSearchAlertNameInputFragmentContainer } from "Components/SavedSearchAlert/Components/SavedSearchAlertNameInput"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

// Because of the component's use of useFormikContext
jest.mock("formik", () => ({
  useFormikContext: () => ({
    values: {},
    errors: {},
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
  }),
}))

describe("SavedSearchAlertNameInputFragmentContainer", () => {
  it("renders the generated display name as placeholder", () => {
    const { renderWithRelay } = setupTestWrapperTL({
      Component: (props: any) => {
        return (
          <SavedSearchAlertNameInputFragmentContainer
            previewSavedSearch={props?.viewer?.previewSavedSearch}
          />
        )
      },
      query: graphql`
        query SavedSearchAlertNameInput_Test_Query(
          $attributes: PreviewSavedSearchAttributes!
        ) {
          viewer {
            previewSavedSearch(attributes: $attributes) {
              displayName
            }
          }
        }
      `,
      variables: {
        attributes: {
          artistIDs: ["kaws"],
          attributionClass: ["unique"],
        },
      },
    })

    renderWithRelay({
      PreviewSavedSearch: () => ({
        displayName: "Kaws — Unique",
      }),
    })

    expect(screen.queryByPlaceholderText("Kaws — Unique")).toBeInTheDocument()
  })
})
