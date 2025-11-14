import { useNavigationHistory } from "System/Contexts/NavigationHistoryContext"
import { render, screen } from "@testing-library/react"
import {
  ArtworkTopContextBarDynamicBreadcrumb,
  useDynamicBreadcrumb,
} from "../ArtworkTopContextBarDynamicBreadcrumb"

jest.mock("../ArtworkTopContextBarSale", () => ({
  ArtworkTopContextBarSale: ({ id }: { id: string }) => (
    <div data-testid="sale-component">Sale: {id}</div>
  ),
}))

jest.mock("../ArtworkTopContextBarFair", () => ({
  ArtworkTopContextBarFair: ({ id }: { id: string }) => (
    <div data-testid="fair-component">Fair: {id}</div>
  ),
}))

jest.mock("../ArtworkTopContextBarShow", () => ({
  ArtworkTopContextBarShow: ({ id }: { id: string }) => (
    <div data-testid="show-component">Show: {id}</div>
  ),
}))

jest.mock("System/Contexts/NavigationHistoryContext")

describe("useDynamicBreadcrumb", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns FAIR type when previous path is a fair", () => {
    ;(useNavigationHistory as jest.Mock).mockReturnValue({
      previousPath: "/fair/fair-id",
    })

    const result = useDynamicBreadcrumb()
    expect(result).toEqual({
      isEnabled: true,
      type: "FAIR",
      id: "fair-id",
    })
  })

  it("returns SALE type when previous path is an auction", () => {
    ;(useNavigationHistory as jest.Mock).mockReturnValue({
      previousPath: "/auction/auction-id",
    })

    const result = useDynamicBreadcrumb()
    expect(result).toEqual({
      isEnabled: true,
      type: "SALE",
      id: "auction-id",
    })
  })

  it("returns SHOW type when previous path is a show", () => {
    ;(useNavigationHistory as jest.Mock).mockReturnValue({
      previousPath: "/show/show-id",
    })

    const result = useDynamicBreadcrumb()
    expect(result).toEqual({
      isEnabled: true,
      type: "SHOW",
      id: "show-id",
    })
  })

  it("returns isEnabled: false when previous path is not a fair, auction, or show", () => {
    ;(useNavigationHistory as jest.Mock).mockReturnValue({
      previousPath: "/artist/artist-id",
    })

    const result = useDynamicBreadcrumb()
    expect(result).toEqual({
      isEnabled: false,
      type: null,
      id: null,
    })
  })

  it("handles undefined previousPath", () => {
    ;(useNavigationHistory as jest.Mock).mockReturnValue({
      previousPath: undefined,
    })

    const result = useDynamicBreadcrumb()
    expect(result).toEqual({
      isEnabled: false,
      type: null,
      id: null,
    })
  })
})

describe("ArtworkTopContextBarDynamicBreadcrumb", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders ArtworkTopContextBarSale when contextMatchType is SALE", () => {
    render(
      <ArtworkTopContextBarDynamicBreadcrumb
        id="artwork-id"
        contextMatchId="sale-id"
        contextMatchType="SALE"
      >
        <div>Fallback Content</div>
      </ArtworkTopContextBarDynamicBreadcrumb>,
    )

    expect(screen.getByTestId("sale-component")).toBeInTheDocument()
    expect(screen.getByText("Sale: sale-id")).toBeInTheDocument()
  })

  it("renders ArtworkTopContextBarFair when contextMatchType is FAIR", () => {
    render(
      <ArtworkTopContextBarDynamicBreadcrumb
        id="artwork-id"
        contextMatchId="fair-id"
        contextMatchType="FAIR"
      >
        <div>Fallback Content</div>
      </ArtworkTopContextBarDynamicBreadcrumb>,
    )

    expect(screen.getByTestId("fair-component")).toBeInTheDocument()
    expect(screen.getByText("Fair: fair-id")).toBeInTheDocument()
  })

  it("renders ArtworkTopContextBarShow when contextMatchType is SHOW", () => {
    render(
      <ArtworkTopContextBarDynamicBreadcrumb
        id="artwork-id"
        contextMatchId="show-id"
        contextMatchType="SHOW"
      >
        <div>Fallback Content</div>
      </ArtworkTopContextBarDynamicBreadcrumb>,
    )

    expect(screen.getByTestId("show-component")).toBeInTheDocument()
    expect(screen.getByText("Show: show-id")).toBeInTheDocument()
  })

  it("renders children as fallback when contextMatchType is not recognized", () => {
    render(
      <ArtworkTopContextBarDynamicBreadcrumb
        id="artwork-id"
        contextMatchId="unknown-id"
        contextMatchType={"UNKNOWN" as any}
      >
        <div data-testid="fallback">Fallback Content</div>
      </ArtworkTopContextBarDynamicBreadcrumb>,
    )

    expect(screen.getByTestId("fallback")).toBeInTheDocument()
    expect(screen.getByText("Fallback Content")).toBeInTheDocument()
  })
})
