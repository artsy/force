import { FairHeaderFragmentContainer } from "Apps/Fair/Components/FairHeader"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairHeader_Test_Query } from "__generated__/FairHeader_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Components/HeaderIcon", () => ({
  HeaderIcon: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<FairHeader_Test_Query>({
  Component: ({ fair }) => <FairHeaderFragmentContainer fair={fair!} />,
  query: graphql`
    query FairHeader_Test_Query @relay_test_operation {
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
})
