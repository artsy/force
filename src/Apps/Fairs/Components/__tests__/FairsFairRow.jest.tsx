import { FairsFairRowFragmentContainer } from "Apps/Fairs/Components/FairsFairRow"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairsFairRow_Test_Query } from "__generated__/FairsFairRow_Test_Query.graphql"
import { DateTime } from "luxon"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FairsFairRow_Test_Query>({
  Component: ({ fair }) => <FairsFairRowFragmentContainer fair={fair!} />,
  query: graphql`
    query FairsFairRow_Test_Query @relay_test_operation {
      fair(id: "example") {
        ...FairsFairRow_fair
      }
    }
  `,
})

describe("FairsFairRow", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Fair: () => ({
        name: "Example Fair",
        isoStartAt: DateTime.local().minus({ day: 7 }).toISODate(),
        href: "/fair/example",
      }),
    })

    expect(screen.getByText("Example Fair")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", "/fair/example")
  })

  describe("upcoming fair", () => {
    it("renders correctly", () => {
      renderWithRelay({
        Fair: () => ({
          name: "Example Fair",
          isoStartAt: DateTime.local().plus({ day: 7 }).toISODate(),
          href: "/fair/example",
        }),
        Profile: () => ({
          href: "/organizer-example",
        }),
      })

      expect(screen.getByText("Example Fair")).toBeInTheDocument()
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "/organizer-example",
      )
    })
  })
})
