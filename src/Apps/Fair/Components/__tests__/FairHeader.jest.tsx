import { FairHeaderFragmentContainer } from "Apps/Fair/Components/FairHeader"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairHeaderTestQuery } from "__generated__/FairHeaderTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Components/HeaderIcon", () => ({
  HeaderIcon: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<FairHeaderTestQuery>({
  Component: ({ fair }) => <FairHeaderFragmentContainer fair={fair!} />,
  query: graphql`
    query FairHeaderTestQuery @relay_test_operation {
      fair(id: "example") {
        ...FairHeader_fair
      }
    }
  `,
})

describe("FairHeader", () => {
  it("displays fair name", () => {
    renderWithRelay({
      Fair: () => ({
        name: "Miart 2020",
        slug: "miart-2020",
      }),
    })

    expect(screen.getByText("Miart 2020")).toBeInTheDocument()
  })

  it("displays subheader for Artsy Edition Shop", () => {
    renderWithRelay({
      Fair: () => ({
        name: "The Artsy Edition Shop",
        slug: "the-artsy-edition-shop",
      }),
    })

    expect(screen.getByText("Your Chance to Own an Icon")).toBeInTheDocument()
  })
})
