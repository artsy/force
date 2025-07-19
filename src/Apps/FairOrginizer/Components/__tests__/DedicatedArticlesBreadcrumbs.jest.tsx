import { DedicatedArticlesBreadcrumbsFragmentContainer } from "Apps/FairOrginizer/Components/DedicatedArticlesBreadcrumbs"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { DedicatedArticlesBreadcrumbs_Test_Query } from "__generated__/DedicatedArticlesBreadcrumbs_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<DedicatedArticlesBreadcrumbs_Test_Query>({
    Component: ({ fairOrganizer }) => (
      <DedicatedArticlesBreadcrumbsFragmentContainer
        fairOrganizer={fairOrganizer!}
      />
    ),
    query: graphql`
      query DedicatedArticlesBreadcrumbs_Test_Query @relay_test_operation {
        fairOrganizer(id: "example") {
          ...DedicatedArticlesBreadcrumbs_fairOrganizer
        }
      }
    `,
  })

describe("DedicatedArticlesBreadcrumbs", () => {
  it("renders proper router link", () => {
    renderWithRelay({
      FairOrganizer: () => ({ slug: "organizer" }),
    })

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/fair-organizer/organizer")
  })

  it("displays breadcrumbs item containing fair organizer name", () => {
    renderWithRelay({
      FairOrganizer: () => ({ name: "Organizer" }),
    })

    expect(screen.getByText("Explore Organizer on Artsy")).toBeInTheDocument()
  })

  it("displays arrow left icon", () => {
    renderWithRelay({})

    expect(screen.getByTitle("")).toBeInTheDocument()
  })

  it("displays image", () => {
    renderWithRelay({
      FairOrganizer: () => ({
        profile: {
          image: { url: "some-src" },
        },
      }),
    })

    const images = document.querySelectorAll("img")
    expect(images.length).toBeGreaterThan(0)
    expect(images[0]).toHaveAttribute(
      "src",
      expect.stringContaining("some-src"),
    )
  })

  it("displays title containing fair organizer name", () => {
    renderWithRelay({
      FairOrganizer: () => ({ name: "Organizer" }),
    })

    expect(screen.getByText("Explore Organizer on Artsy")).toBeInTheDocument()
  })
})
