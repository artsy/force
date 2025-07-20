import { FairOrganizerAppFragmentContainer } from "Apps/FairOrginizer/FairOrganizerApp"
import { MockBoot } from "DevTools/MockBoot"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairOrganizerAppTestQuery } from "__generated__/FairOrganizerAppTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FairOrganizerAppTestQuery>({
  Component: ({ fairOrganizer }) => (
    <MockBoot>
      <FairOrganizerAppFragmentContainer fairOrganizer={fairOrganizer!} />
    </MockBoot>
  ),
  query: graphql`
    query FairOrganizerAppTestQuery @relay_test_operation {
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
