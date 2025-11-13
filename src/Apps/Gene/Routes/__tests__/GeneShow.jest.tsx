import { GeneShowFragmentContainer } from "Apps/Gene/Routes/GeneShow"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { GeneShowTestQuery } from "__generated__/GeneShowTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("../../Components/GeneArtworkFilter", () => ({
  GeneArtworkFilterQueryRenderer: () => <div />,
}))

const { renderWithRelay } = setupTestWrapperTL<GeneShowTestQuery>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <GeneShowFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query GeneShowTestQuery @relay_test_operation {
      gene(id: "example") {
        ...GeneShow_gene
      }
    }
  `,
})

describe("GeneShow", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Gene: () => ({
        name: "Example Gene",
        displayName: "Display Name",
      }),
    })

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getByText("Display Name")).toBeInTheDocument()
  })

  it("renders fallback title correctly", () => {
    renderWithRelay({
      Gene: () => ({
        name: "Example Gene",
        displayName: "",
      }),
    })

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getAllByText("Example Gene")).toHaveLength(2)
  })

  it("renders meta description and title from query", () => {
    renderWithRelay({
      Gene: () => ({
        meta: { description: "Gene Meta Description" },
        displayName: "Display Name",
        name: "name",
      }),
    })

    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Gene Meta Description"
    )
    expect(document.querySelector('meta[name="title"]')).toHaveAttribute(
      "content",
      "Display Name | Artsy"
    )
  })

  it("renders fallback meta description and fallback title", () => {
    renderWithRelay({
      Gene: () => ({
        name: "Design",
        meta: { description: null },
        displayName: "",
      }),
    })

    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Explore Design art on Artsy. Browse works by size, price, and medium."
    )
    expect(document.querySelector('meta[name="title"]')).toHaveAttribute(
      "content",
      "Design | Artsy"
    )
  })
})
