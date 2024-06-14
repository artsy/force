import { BackToFairBanner_Test_Query } from "__generated__/BackToFairBanner_Test_Query.graphql"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { BackToFairBannerFragmentContainer } from "Apps/Show/Components/BackToFairBanner"
import { screen } from "@testing-library/react"
import { useRouter } from "System/Hooks/useRouter"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")

const { renderWithRelay } = setupTestWrapperTL<BackToFairBanner_Test_Query>({
  Component: BackToFairBannerFragmentContainer,
  query: graphql`
    query BackToFairBanner_Test_Query @relay_test_operation {
      show(id: "show-id") {
        ...BackToFairBanner_show
      }
    }
  `,
})

describe("BackToFairBanner", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {},
        },
      },
    }))
  })

  it("should render link to fair by default", async () => {
    renderWithRelay({
      Show: () => ({
        fair: {
          name: "Fair Name",
          href: "/fair-link",
        },
      }),
    })
    const link = screen.getByRole("link")

    expect(link).toHaveTextContent("Back to Fair Name")
    expect(link).toHaveAttribute("href", "/fair-link")
  })

  it("should render link with `back_to_fair_href` query param", async () => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            back_to_fair_href: "/fair/fair-name?param=value",
          },
        },
      },
    }))

    renderWithRelay({
      Show: () => ({
        fair: {
          name: "Fair Name",
          href: "/fair-link",
        },
      }),
    })
    const link = screen.getByRole("link")

    expect(link).toHaveTextContent("Back to Fair Name")
    expect(link).toHaveAttribute("href", "/fair/fair-name?param=value")
  })
})
