import { ExampleAppFragmentContainer } from "../ExampleApp"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ExampleApp_Test_Query } from "v2/__generated__/ExampleApp_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"
import { screen } from "@testing-library/react"
import { findMetaTagBySelector } from "v2/DevTools"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<ExampleApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <ExampleAppFragmentContainer {...props} />
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
    })
  )

  it("renders correctly", () => {
    expect(screen.getByText("Hello Artsy Dev!")).toBeInTheDocument()
  })

  it("renders time from query", () => {
    expect(screen.getByText("Today is 13/5/2022.")).toBeInTheDocument()
  })

  it("renders meta description", async () => {
    const descriptionMeta = await findMetaTagBySelector(
      "meta[name=description]"
    )

    expect(descriptionMeta).toHaveAttribute(
      "content",
      "Fill this with a proper description"
    )
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
