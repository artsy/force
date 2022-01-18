import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ExhibitorsLetterNavFragmentContainer } from "../ExhibitorsLetterNav"
import { ExhibitorsLetterNav_Test_Query } from "v2/__generated__/ExhibitorsLetterNav_Test_Query.graphql"
import { Breakpoint } from "v2/Utils/Responsive"

jest.unmock("react-relay")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

const getWrapperWithBreakpoint = (breakpoint: Breakpoint = "lg") =>
  setupTestWrapper<ExhibitorsLetterNav_Test_Query>({
    Component: ({ fair }) => (
      <MockBoot breakpoint={breakpoint}>
        <ExhibitorsLetterNavFragmentContainer fair={fair!} />
      </MockBoot>
    ),
    query: graphql`
      query ExhibitorsLetterNav_Test_Query @relay_test_operation {
        fair(id: "one-x-artsy") {
          ...ExhibitorsLetterNav_fair
        }
      }
    `,
  }).getWrapper

describe("ExhibitorsLetterNav", () => {
  const getWrapper = getWrapperWithBreakpoint()

  it("displays letters nav", () => {
    const wrapper = getWrapper({})
    expect(wrapper.find("Letters").length).toBe(1)
  })

  it("displays 27 elements", () => {
    const wrapper = getWrapper({
      Fair: () => ({ exhibitorsGroupedByName }),
    })
    expect(wrapper.find("Letter").length).toBe(27)
  })

  it("displays letters with proper color", () => {
    const wrapper = getWrapper({
      Fair: () => ({ exhibitorsGroupedByName }),
    })
    const letter = wrapper.find("Letter")
    for (let i = 0; i < 10; i++) {
      expect(letter.at(i).prop("color")).toEqual("black10")
    }
    for (let i = 10; i < 13; i++) {
      expect(letter.at(i).prop("color")).toEqual("black100")
    }
    for (let i = 13; i < 26; i++) {
      expect(letter.at(i).prop("color")).toEqual("black10")
    }
    expect(letter.at(26).prop("color")).toEqual("black100")
  })

  it("displays letters with proper on-hover title", () => {
    const wrapper = getWrapper({
      Fair: () => ({ exhibitorsGroupedByName }),
    })
    const letter = wrapper.find("Letter")
    for (let i = 0; i < 10; i++) {
      expect(letter.at(i).prop("title")).toEqual("")
    }
    expect(letter.at(10).prop("title")).toEqual(
      `View exhibitors starting with “K”`
    )
    expect(letter.at(11).prop("title")).toEqual(
      `View exhibitors starting with “L”`
    )
    expect(letter.at(12).prop("title")).toEqual(
      `View exhibitors starting with “M”`
    )
    for (let i = 13; i < 26; i++) {
      expect(letter.at(i).prop("title")).toEqual("")
    }
    expect(letter.at(26).prop("title")).toEqual(
      `View exhibitors starting with special character or number`
    )
  })

  describe("mobile", () => {
    const getWrapper = getWrapperWithBreakpoint("sm")

    it("displays swiper", () => {
      const wrapper = getWrapper({})
      expect(wrapper.find("Swiper").length).toBe(1)
    })
  })
})

const exhibitorsGroupedByName = [
  { letter: "K" },
  { letter: "L" },
  { letter: "M" },
  { letter: "#" },
]
