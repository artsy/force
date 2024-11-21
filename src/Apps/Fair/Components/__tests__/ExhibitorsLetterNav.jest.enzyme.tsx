import { graphql } from "react-relay"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ExhibitorsLetterNavFragmentContainer } from "Apps/Fair/Components/ExhibitorsLetterNav"
import { ExhibitorsLetterNav_Test_Query } from "__generated__/ExhibitorsLetterNav_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: jest.fn() }),
  Jump: () => null,
}))

const { getWrapper } = setupTestWrapper<ExhibitorsLetterNav_Test_Query>({
  Component: ({ fair }) => (
    <MockBoot breakpoint="lg">
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
})

describe("ExhibitorsLetterNav", () => {
  it("displays 27 elements", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({ exhibitorsGroupedByName }),
    })
    expect(wrapper.find("Letter").length).toBe(27)
  })

  it("displays letters either enabled or disabled", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({ exhibitorsGroupedByName }),
    })

    const letters = wrapper.find("Letter")

    for (let i = 0; i < 10; i++) {
      expect(letters.at(i).prop("isEnabled")).toBe(false)
    }

    for (let i = 10; i < 13; i++) {
      expect(letters.at(i).prop("isEnabled")).toBe(true)
    }

    for (let i = 13; i < 26; i++) {
      expect(letters.at(i).prop("isEnabled")).toBe(false)
    }

    expect(letters.at(26).prop("isEnabled")).toBe(true)
  })

  it("displays letters with proper on-hover title", () => {
    const { wrapper } = getWrapper({
      Fair: () => ({ exhibitorsGroupedByName }),
    })

    const buttons = wrapper.find("button")

    expect(buttons.at(0).prop("title")).toEqual(
      `View exhibitors starting with “K”`
    )

    expect(buttons.at(1).prop("title")).toEqual(
      `View exhibitors starting with “L”`
    )

    expect(buttons.at(2).prop("title")).toEqual(
      `View exhibitors starting with “M”`
    )

    expect(buttons.at(3).prop("title")).toEqual(
      `View exhibitors starting with special character or number`
    )
  })
})

const exhibitorsGroupedByName = [
  { letter: "K" },
  { letter: "L" },
  { letter: "M" },
  { letter: "#" },
]
