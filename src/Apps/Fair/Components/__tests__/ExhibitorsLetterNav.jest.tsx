import { ExhibitorsLetterNavFragmentContainer } from "Apps/Fair/Components/ExhibitorsLetterNav"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ExhibitorsLetterNavTestQuery } from "__generated__/ExhibitorsLetterNavTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: jest.fn() }),
  Jump: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<ExhibitorsLetterNavTestQuery>({
  Component: ({ fair }) => (
    <MockBoot breakpoint="lg">
      <ExhibitorsLetterNavFragmentContainer fair={fair!} />
    </MockBoot>
  ),
  query: graphql`
    query ExhibitorsLetterNavTestQuery @relay_test_operation {
      fair(id: "one-x-artsy") {
        ...ExhibitorsLetterNav_fair
      }
    }
  `,
})

describe("ExhibitorsLetterNav", () => {
  it("displays 4 enabled elements", () => {
    const { container } = renderWithRelay({
      Fair: () => ({ exhibitorsGroupedByName }),
    })
    expect(container.querySelectorAll("button")).toHaveLength(4)
  })

  it("displays all letters as enabled", () => {
    const { container } = renderWithRelay({
      Fair: () => ({ exhibitorsGroupedByName }),
    })

    const letters = container.querySelectorAll("button")

    for (let i = 0; i < letters.length; i++) {
      expect(letters[i]).not.toBeDisabled()
    }
  })

  it("displays letters with proper on-hover title", () => {
    const { container } = renderWithRelay({
      Fair: () => ({ exhibitorsGroupedByName }),
    })

    const buttons = container.querySelectorAll("button")

    expect(buttons[0]).toHaveAttribute("title")
    expect(buttons[1]).toHaveAttribute("title")
    expect(buttons[2]).toHaveAttribute("title")
    expect(buttons[3]).toHaveAttribute("title")

    // Test that the titles contain the right letter
    expect(buttons[0].getAttribute("title")).toContain("K")
    expect(buttons[1].getAttribute("title")).toContain("L")
    expect(buttons[2].getAttribute("title")).toContain("M")
    expect(buttons[3].getAttribute("title")).toContain("special character")
  })
})

const exhibitorsGroupedByName = [
  { letter: "K" },
  { letter: "L" },
  { letter: "M" },
  { letter: "#" },
]
