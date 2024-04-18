import { screen } from "@testing-library/react"
import { ExclusiveAccessBadge } from "Components/Artwork/ExclusiveAccessBadge"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ExclusiveAccessBadge", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ExclusiveAccessBadge,
    query: graphql`
      query ExclusiveAccessBadge_test_Query @relay_test_operation {
        artwork(id: "foo") {
          ...ExclusiveAccessBadge_artwork
        }
      }
    `,
  })

  it("does not render if isUnlisted=false", () => {
    renderWithRelay({
      Artwork: () => ({
        isUnlisted: false,
      }),
    })

    expect(screen.queryByText("Exclusive Access")).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artwork: () => ({
        isUnlisted: true,
      }),
    })

    expect(screen.getByText("Exclusive Access")).toBeInTheDocument()
  })
})
