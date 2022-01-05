import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { PartnerContacts_Test_Query } from "v2/__generated__/PartnerContacts_Test_Query.graphql"
import {
  PartnerContactCard,
  PartnerContactsFragmentContainer as PartnerContacts,
} from "../../PartnerContacts"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<PartnerContacts_Test_Query>({
  Component: ({ partner }: any) => {
    return <PartnerContacts edges={partner.locations.edges} />
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
    const wrapper = getWrapper({
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
    const wrapper = getWrapper({
      Partner: () => ({
        locations: {
          edges: null,
        },
      }),
    })

    expect(wrapper.find(PartnerContactCard).length).toEqual(0)
  })
})
