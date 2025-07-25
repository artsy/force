import { screen } from "@testing-library/react"
import { ExampleAppFragmentContainer } from "Apps/Example/ExampleApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ExampleApp_Test_Query } from "__generated__/ExampleApp_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<ExampleApp_Test_Query>({
  Component: props => {
    if (!props?.system) return null

    return (
      <MockBoot>
        <ExampleAppFragmentContainer system={props.system} />
      </MockBoot>
    )
  },
  query: graphql`
    query ExampleApp_Test_Query @relay_test_operation {
      system {
        ...ExampleApp_system
      }
    }
  `,
})

describe("ExampleApp", () => {
  beforeEach(() =>
    renderWithRelay({
      System: () => ({
        time: {
          day: 13,
          month: 5,
          year: 2022,
        },
      }),
    }),
  )

  it("renders correctly", () => {
    expect(screen.getByText("Hello Artsy Dev!")).toBeInTheDocument()
  })

  it("renders time from query", () => {
    expect(screen.getByText("Today is 13/5/2022.")).toBeInTheDocument()
  })

  it("renders 4 routes in correct order", () => {
    const routesInOrder = [
      "Welcome",
      "Artist page",
      "Artwork page",
      "Artwork Filter",
    ]

    for (let i = 0; i < routesInOrder.length; i++) {
      const route = screen.getAllByRole("link")[i]
      expect(route).toHaveTextContent(routesInOrder[i])
    }
  })
})
