import { FairsFairRowFragmentContainer } from "Apps/Fairs/Components/FairsFairRow"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { DateTime } from "luxon"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairsFairRowFragmentContainer,
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
    const { wrapper } = getWrapper({
      Fair: () => ({
        name: "Example Fair",
        isoStartAt: DateTime.local().minus({ day: 7 }).toISODate(),
        href: "/fair/example",
      }),
    })

    expect(wrapper.find("h4").first().text()).toEqual("Example Fair")
    expect(wrapper.find("a").props().href).toEqual("/fair/example")
  })

  describe("upcoming fair", () => {
    it("renders correctly", () => {
      const { wrapper } = getWrapper({
        Fair: () => ({
          name: "Example Fair",
          isoStartAt: DateTime.local().plus({ day: 7 }).toISODate(),
          href: "/fair/example",
        }),
        Profile: () => ({
          href: "/organizer-example",
        }),
      })

      expect(wrapper.find("h4").first().text()).toEqual("Example Fair")
      expect(wrapper.find("a").props().href).toEqual("/organizer-example")
    })
  })
})
