import { screen } from "@testing-library/react"
import { PartnerContactsFragmentContainer } from "Apps/Partner/Components/PartnerContacts/PartnerContacts"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { PartnerContacts_Test_Query } from "__generated__/PartnerContacts_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<PartnerContacts_Test_Query>({
  Component: ({ partner }: any) => {
    return <PartnerContactsFragmentContainer edges={partner.locations.edges} />
  },
  query: graphql`
    query PartnerContacts_Test_Query @raw_response_type @relay_test_operation {
      partner(id: "white-cube") {
        locations: locationsConnection(first: 50) {
          edges {
            ...PartnerContacts_edges
          }
        }
      }
    }
  `,
})

describe("PartnerContacts", () => {
  it("displays partner contact cards", () => {
    renderWithRelay({
      Partner: () => ({
        locations: {
          totalCount: 2,
          edges: [
            {
              node: {
                city: "Jeddah",
              },
            },
            {
              node: {
                city: "New York",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText(/Jeddah/)).toBeInTheDocument()
    expect(screen.getByText(/New York/)).toBeInTheDocument()

    // Verify there are 2 contact cards by checking the number of map links
    const mapLinks = screen.getAllByRole("link", { name: "" })
    expect(mapLinks).toHaveLength(2)
  })

  it("doesn't display contact card if there is no info", () => {
    renderWithRelay({
      Partner: () => ({
        locations: {
          edges: null,
        },
      }),
    })

    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
})
