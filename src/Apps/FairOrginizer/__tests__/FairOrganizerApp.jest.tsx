import { FairOrganizerAppFragmentContainer } from "Apps/FairOrginizer/FairOrganizerApp"
import { MockBoot } from "DevTools/MockBoot"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairOrganizerApp_Test_Query } from "__generated__/FairOrganizerApp_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FairOrganizerApp_Test_Query>({
  Component: ({ fairOrganizer }) => (
    <MockBoot>
      <FairOrganizerAppFragmentContainer fairOrganizer={fairOrganizer!} />
    </MockBoot>
  ),
  query: graphql`
    query FairOrganizerApp_Test_Query @relay_test_operation {
      fairOrganizer(id: "example") {
        ...FairOrganizerApp_fairOrganizer
      }
    }
  `,
})

describe("FairOrganizerApp", () => {
  it("sets a title tag", () => {
    renderWithRelay({
      FairOrganizer: () => ({ name: "Art Paris", slug: "art-paris" }),
    })

    expect(document.title).toEqual("Art Paris | Artsy")
  })

  it("renders correctly", () => {
    const { container } = renderWithRelay()

    // Just test that the component renders without error
    expect(container).toBeInTheDocument()
  })
})
