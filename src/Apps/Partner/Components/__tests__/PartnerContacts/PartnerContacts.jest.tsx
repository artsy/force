import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { PartnerContacts_Test_Query } from "__generated__/PartnerContacts_Test_Query.graphql"
import { PartnerContactsFragmentContainer } from "Apps/Partner/Components/PartnerContacts/PartnerContacts"
import { PartnerContactCard } from "Apps/Partner/Components/PartnerContacts/PartnerContactCard"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<PartnerContacts_Test_Query>({
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
    const { wrapper } = getWrapper({
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

    const text = wrapper.text()

    expect(wrapper.find(PartnerContactCard).length).toEqual(2)
    expect(text).toContain("Jeddah")
    expect(text).toContain("New York")
  })

  it("doesn't display contact card if there is no info", () => {
    const { wrapper } = getWrapper({
      Partner: () => ({
        locations: {
          edges: null,
        },
      }),
    })

    expect(wrapper.find(PartnerContactCard).length).toEqual(0)
  })
})
