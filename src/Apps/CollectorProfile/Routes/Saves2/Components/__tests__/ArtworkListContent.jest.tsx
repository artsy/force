import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { ArtworkListContent_Test_Query } from "__generated__/ArtworkListContent_Test_Query.graphql"
import { ArtworkListContentRefetchContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/ArtworkListContent"

jest.unmock("react-relay")
jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: {
      location: {
        query: "",
      },
    },
  })),
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
  describe("Empty State", () => {
    it("should render correct texts for default artwork list", () => {
      renderWithRelay({
        Me: () => ({
          artworkList: {
            default: true,
            artworks: {
              edges: [],
            },
          },
          defaultSaves: {
            artworksCount: 0,
          },
        }),
      })

      const title = "Keep track of artworks you love"
      const description =
        "Select the heart on an artwork to save it or add it to a list."

      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(description)).toBeInTheDocument()
    })

    it("should render correct texts for non-default artwork list when user has saved artworks", () => {
      renderWithRelay({
        Me: () => ({
          artworkList: {
            default: false,
            artworks: {
              edges: [],
            },
          },
          defaultSaves: {
            artworksCount: 2,
          },
        }),
      })

      const title = "Start curating your list of works"
      const description =
        "Add works from All Saves or add new artworks as you browse."

      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(description)).toBeInTheDocument()
    })

    it("should render correct texts for non-default artwork list when user doesn't have any saved artworks", () => {
      renderWithRelay({
        Me: () => ({
          defaultSaves: {
            artworksCount: 0,
          },
          artworkList: {
            default: false,
            artworks: {
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
    })
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
