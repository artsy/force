import { FairsFairRowFragmentContainer } from "Apps/Fairs/Components/FairsFairRow"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { FairsFairRowTestQuery } from "__generated__/FairsFairRowTestQuery.graphql"
import { DateTime } from "luxon"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FairsFairRowTestQuery>({
  Component: ({ fair }) => <FairsFairRowFragmentContainer fair={fair!} />,
  query: graphql`
    query FairsFairRowTestQuery @relay_test_operation {
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
