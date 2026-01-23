import { screen } from "@testing-library/react"
import { FairSubAppFragmentContainer } from "Apps/Fair/FairSubApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
  useIsRouteActive: () => false,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: FairSubAppFragmentContainer,
  query: graphql`
    query FairSubApp_Query @relay_test_operation {
      fair(id: "example") {
        ...FairSubApp_fair
      }
    }
  `,
})

describe("FairSubApp", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/fair/example-fair/articles",
          query: {},
        },
      },
    }))
  })

  afterEach(() => {
    mockUseRouter.mockReset()
  })

  it("displays a back button", () => {
    renderWithRelay({
      Fair: () => ({ name: "Example Fair" }),
    })

    expect(screen.getByText("Back to Example Fair")).toBeInTheDocument()
  })
})
