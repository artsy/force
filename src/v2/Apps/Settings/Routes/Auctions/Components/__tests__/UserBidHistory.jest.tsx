import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { UserBidHistoryFragmentContainer } from "../UserBidHistory"
import { UserBidHistory_Test_Query } from "v2/__generated__/UserBidHistory_Test_Query.graphql"

jest.unmock("react-relay")

describe("UserBidHistory", () => {
  const { getWrapper } = setupTestWrapper<UserBidHistory_Test_Query>({
    Component: UserBidHistoryFragmentContainer,
    query: graphql`
      query UserBidHistory_Test_Query {
        me {
          ...UserBidHistory_me
        }
      }
    `,
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      Me: () => ({
        myBids: {
          closed: [
            {
              sale: {
                name: "saleName",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("saleName")
  })

  it("renders -Nothing to Show- message when no sale found", () => {
    const wrapper = getWrapper({
      Me: () => ({
        myBids: null,
      }),
    })

    expect(wrapper.text()).toContain("Nothing to Show")
  })

  it("renders -Bid History- title even if data is not there", () => {
    const wrapper = getWrapper({
      Me: () => ({
        lotStandings: null,
      }),
    })

    expect(wrapper.text()).toContain("Bid History")
  })

  it("renders a router link with correct href of sale", () => {
    const wrapper = getWrapper({
      Me: () => ({
        myBids: {
          closed: [
            {
              sale: {
                name: "saleName",
                href: "/sale-name",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.find("RouterLink").props().to).toEqual("/sale-name")
  })
})
