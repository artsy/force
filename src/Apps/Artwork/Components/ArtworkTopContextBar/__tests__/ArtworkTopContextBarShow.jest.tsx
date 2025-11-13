import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { ArtworkTopContextBarShow } from "../ArtworkTopContextBarShow"

jest.unmock("react-relay")

// Mock the TopContextBar component
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
    <ArtworkTopContextBarShow id="show-id" {...props} />
  ),
  query: graphql`
    query ArtworkTopContextBarShow_test_Query @relay_test_operation {
      show(id: "show-id") {
        name
        href
        status
        thumbnail: coverImage {
          url
        }
        partner {
          ... on Partner {
            name
          }
          ... on ExternalPartner {
            name
          }
        }
      }
    }
  `,
})

describe("ArtworkTopContextBarShow", () => {
  it("renders null when show data is not available", () => {
    const mockResolvers = {
      Query: () => ({
        show: null,
      }),
    }

    renderWithRelay(mockResolvers)

    expect(screen.queryByTestId("top-context-bar")).not.toBeInTheDocument()
  })

  it("renders current show information correctly", () => {
    renderWithRelay({
      Show: () => ({
        name: "Impressionist & Modern Art",
        href: "/show/impressionist-modern-art",
        status: "running",
        thumbnail: {
          url: "https://example.com/show-image.jpg",
        },
        partner: {
          name: "Gagosian Gallery",
        },
      }),
    })

    const topContextBar = screen.getByTestId("top-context-bar")
    expect(topContextBar).toBeInTheDocument()
    expect(topContextBar).toHaveAttribute(
      "data-href",
      "/show/impressionist-modern-art"
    )
    expect(topContextBar).toHaveAttribute(
      "data-src",
      "https://example.com/show-image.jpg"
    )
    expect(topContextBar).toHaveAttribute("data-display-back-arrow", "true")
    expect(topContextBar).toHaveAttribute("data-prefer-history-back", "true")

    expect(screen.getByText("Impressionist & Modern Art")).toBeInTheDocument()
    expect(
      screen.getByText("Current show at Gagosian Gallery")
    ).toBeInTheDocument()
  })

  it("renders past show information correctly", () => {
    renderWithRelay({
      Show: () => ({
        name: "Impressionist & Modern Art",
        href: "/show/impressionist-modern-art",
        status: "closed",
        thumbnail: {
          url: "https://example.com/show-image.jpg",
        },
        partner: {
          name: "Gagosian Gallery",
        },
      }),
    })

    expect(screen.getByText("Impressionist & Modern Art")).toBeInTheDocument()
    expect(
      screen.getByText("Past show at Gagosian Gallery")
    ).toBeInTheDocument()
  })

  it("renders upcoming show information correctly", () => {
    renderWithRelay({
      Show: () => ({
        name: "Impressionist & Modern Art",
        href: "/show/impressionist-modern-art",
        status: "upcoming",
        thumbnail: {
          url: "https://example.com/show-image.jpg",
        },
        partner: {
          name: "Gagosian Gallery",
        },
      }),
    })

    expect(screen.getByText("Impressionist & Modern Art")).toBeInTheDocument()
    expect(
      screen.getByText("Upcoming show at Gagosian Gallery")
    ).toBeInTheDocument()
  })

  it("handles missing partner name", () => {
    renderWithRelay({
      Show: () => ({
        name: "Impressionist & Modern Art",
        href: "/show/impressionist-modern-art",
        status: "running",
        thumbnail: {
          url: "https://example.com/show-image.jpg",
        },
        partner: null,
      }),
    })

    expect(screen.getByText("Impressionist & Modern Art")).toBeInTheDocument()
    expect(screen.getByText("Current show")).toBeInTheDocument()
    expect(screen.queryByText(/at/)).not.toBeInTheDocument()
  })

  it("handles missing thumbnail", () => {
    renderWithRelay({
      Show: () => ({
        name: "Impressionist & Modern Art",
        href: "/show/impressionist-modern-art",
        status: "running",
        thumbnail: null,
        partner: {
          name: "Gagosian Gallery",
        },
      }),
    })

    const topContextBar = screen.getByTestId("top-context-bar")
    expect(topContextBar).toBeInTheDocument()
    expect(topContextBar).toHaveAttribute(
      "data-href",
      "/show/impressionist-modern-art"
    )
    expect(topContextBar).not.toHaveAttribute(
      "data-src",
      "https://example.com/show-image.jpg"
    )

    expect(screen.getByText("Impressionist & Modern Art")).toBeInTheDocument()
    expect(
      screen.getByText("Current show at Gagosian Gallery")
    ).toBeInTheDocument()
  })
})
