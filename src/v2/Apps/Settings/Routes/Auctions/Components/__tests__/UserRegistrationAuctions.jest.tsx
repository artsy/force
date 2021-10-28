import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { UserRegistrationAuctionsFragmentContainer } from "../UserRegistrationAuctions"
import { UserRegistrationAuctions_Test_Query } from "v2/__generated__/UserRegistrationAuctions_Test_Query.graphql"

jest.unmock("react-relay")

describe("UserRegistrationAuctions", () => {
  const { getWrapper } = setupTestWrapper<UserRegistrationAuctions_Test_Query>({
    Component: UserRegistrationAuctionsFragmentContainer,
    query: graphql`
      query UserRegistrationAuctions_Test_Query {
        me {
          ...UserRegistrationAuctions_me
        }
      }
    `,
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Me: () => ({
        saleRegistrationsConnection: {
          edges: [
            {
              node: {
                sale: {
                  name: "the-good-sale",
                },
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("the-good-sale")
  })

  it("renders -Nothing to Show- message when no available sale found", () => {
    const wrapper = getWrapper({
      Me: () => ({
        saleRegistrationsConnection: {
          edges: [],
        },
      }),
    })

    expect(wrapper.text()).toContain("Nothing to Show")
  })

  it("renders -Registration for Upcoming Auctions- title even if data is not there", () => {
    const wrapper = getWrapper({
      Me: () => ({
        saleRegistrationsConnection: {
          edges: [],
        },
      }),
    })

    expect(wrapper.text()).toContain("Registration for Upcoming Auctions")
  })

  it("renders button with correct href of sale", () => {
    const wrapper = getWrapper({
      Me: () => ({
        saleRegistrationsConnection: {
          edges: [
            {
              node: {
                sale: {
                  name: "the-good-sale",
                  href: "/the-good-sale",
                },
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.find("Button").props().to).toEqual("/the-good-sale")
  })
})
