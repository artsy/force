import { FairExhibitors_Test_Query } from "v2/__generated__/FairExhibitors_Test_Query.graphql"
import { graphql } from "react-relay"
import { FairExhibitorsFragmentContainer } from "../FairExhibitors"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

describe("FairExhibitors", () => {
  const { getWrapper } = setupTestWrapper<FairExhibitors_Test_Query>({
    Component: FairExhibitorsFragmentContainer,
    query: graphql`
      query FairExhibitors_Test_Query($id: String!) {
        fair(id: $id) @principalField {
          ...FairExhibitors_fair
        }
      }
    `,
    variables: { id: "fair" },
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the letters nav", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ExhibitorsLetterNav").length).toBe(1)
  })

  it("scrolls down the page on letter click", () => {
    document.querySelector = jest.fn().mockReturnValue({
      getBoundingClientRect: () => ({
        top: 0,
      }),
    })

    const spy = jest.fn()
    window.scrollTo = spy

    const wrapper = getWrapper({
      Fair: () => ({
        exhibitorsGroupedByName: [
          {
            letter: "D",
            exhibitors: [
              {
                partnerID: "642b20aff086930012ce478f",
              },
            ],
          },
        ],
      }),
    })

    const letter = wrapper.find("ExhibitorsLetterNav").find("Letter").at(3)
    letter.simulate("click")
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("renders the exhibitors group", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        exhibitorsGroupedByName: [
          {
            letter: "A",
            exhibitors: [
              {
                partnerID: "600b45afd086930012ce478c",
              },
            ],
          },
          {
            letter: "C",
            exhibitors: [
              {
                partnerID: "551db9a6726169422f4d0600",
              },
              {
                partnerID: "5694406501925b322c00010b",
              },
            ],
          },
        ],
      }),
    })

    const exhibitorsGroups = wrapper.find("FairExhibitorsGroupPlaceholder")

    expect(exhibitorsGroups.length).toBe(2)
  })
})
