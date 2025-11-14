import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { ArtworkTopContextBarFair } from "../ArtworkTopContextBarFair"

jest.unmock("react-relay")

jest.mock("Components/TopContextBar", () => ({
  TopContextBar: ({
    children,
    href,
    src,
    displayBackArrow,
    preferHistoryBack,
  }) => (
    <div
      data-testid="top-context-bar"
      data-href={href}
      data-src={src}
      data-display-back-arrow={displayBackArrow}
      data-prefer-history-back={preferHistoryBack}
    >
      {children}
    </div>
  ),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <ArtworkTopContextBarFair id="fair-id" {...props} />
  ),
  query: graphql`
    query ArtworkTopContextBarFair_test_Query @relay_test_operation {
      fair(id: "fair-id") {
        name
        href
        profile {
          icon {
            url
          }
        }
      }
    }
  `,
})

describe("ArtworkTopContextBarFair", () => {
  it("renders null when fair data is not available", () => {
    const mockResolvers = {
      Query: () => ({
        fair: null,
      }),
    }

    renderWithRelay(mockResolvers)

    expect(screen.queryByTestId("top-context-bar")).not.toBeInTheDocument()
  })

  it("renders fair information correctly", () => {
    renderWithRelay({
      Fair: () => ({
        name: "Art Basel",
        href: "/fair/art-basel",
        profile: {
          icon: {
            url: "https://example.com/fair-icon.jpg",
          },
        },
      }),
    })

    const topContextBar = screen.getByTestId("top-context-bar")
    expect(topContextBar).toBeInTheDocument()
    expect(topContextBar).toHaveAttribute("data-href", "/fair/art-basel")
    expect(topContextBar).toHaveAttribute(
      "data-src",
      "https://example.com/fair-icon.jpg",
    )
    expect(topContextBar).toHaveAttribute("data-display-back-arrow", "true")
    expect(topContextBar).toHaveAttribute("data-prefer-history-back", "true")

    expect(screen.getByText("Art Basel")).toBeInTheDocument()
    expect(screen.getByText("At fair")).toBeInTheDocument()
  })

  it("handles missing profile icon", () => {
    renderWithRelay({
      Fair: () => ({
        name: "Art Basel",
        href: "/fair/art-basel",
        profile: null,
      }),
    })

    const topContextBar = screen.getByTestId("top-context-bar")
    expect(topContextBar).toBeInTheDocument()
    expect(topContextBar).toHaveAttribute("data-href", "/fair/art-basel")
    expect(topContextBar).not.toHaveAttribute(
      "data-src",
      "https://example.com/fair-icon.jpg",
    )

    expect(screen.getByText("Art Basel")).toBeInTheDocument()
    expect(screen.getByText("At fair")).toBeInTheDocument()
  })
})
