import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { ArtworkListContent_Test_Query } from "__generated__/ArtworkListContent_Test_Query.graphql"
import { ArtworkListContentRefetchContainer } from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkListContent"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: {
      location: {
        query: "",
      },
    },
  })),
}))
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

const { renderWithRelay } = setupTestWrapperTL<ArtworkListContent_Test_Query>({
  Component: props => {
    if (!props.me) {
      return null
    }

    return <ArtworkListContentRefetchContainer me={props.me} />
  },
  query: graphql`
    query ArtworkListContent_Test_Query @relay_test_operation {
      me {
        ...ArtworkListContent_me @arguments(listID: "listID")
      }
    }
  `,
})

describe("ArtworkListContent", () => {
  it("should render empty state when user doesn't have any saved artworks", () => {
    renderWithRelay({
      Me: () => ({
        artworkList: {
          default: true,
          shareableWithPartners: true,
          artworks: {
            totalCount: 0,
            edges: [],
          },
        },
      }),
    })

    const title = "Keep track of artworks you love"
    const description =
      "Select the heart on an artwork to save it or add it to a list."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.queryByTestId("hide-icon")).not.toBeInTheDocument()
  })

  it("should render a hide icon if list is not shared with partners", () => {
    renderWithRelay({
      Me: () => ({
        artworkList: {
          default: true,
          shareableWithPartners: false,
          artworks: {
            totalCount: 0,
            edges: [],
          },
        },
      }),
    })

    expect(screen.getByTestId("hide-icon")).toBeInTheDocument()
  })

  describe("Actions contextual menu", () => {
    it("should not render for default artwork list", () => {
      renderWithRelay({
        Me: () => ({
          artworkList: {
            default: true,
          },
        }),
      })

      const menuTriggerButton = screen.queryByLabelText("Open contextual menu")
      expect(menuTriggerButton).not.toBeInTheDocument()
    })

    it("should render for non-default artwork list", () => {
      renderWithRelay({
        Me: () => ({
          artworkList: {
            default: false,
          },
        }),
      })

      const menuTriggerButton = screen.queryByLabelText("Open contextual menu")
      expect(menuTriggerButton).toBeInTheDocument()
    })
  })
})
