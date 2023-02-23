import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { SavesArtworks_Test_Query } from "__generated__/SavesArtworks_Test_Query.graphql"
import { SavesArtworksRefetchContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesArtworks"

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

const { renderWithRelay } = setupTestWrapperTL<SavesArtworks_Test_Query>({
  Component: props => {
    if (!props.me?.collection) {
      return null
    }

    return <SavesArtworksRefetchContainer collection={props.me.collection} />
  },
  query: graphql`
    query SavesArtworks_Test_Query @relay_test_operation {
      me {
        collection(id: "collectionID") {
          ...SavesArtworks_collection
        }
      }
    }
  `,
})

describe("SavesArtworks", () => {
  describe("Empty State", () => {
    it("should render correct texts for default collection", () => {
      renderWithRelay({
        Collection: () => ({
          default: true,
          artworks: {
            edges: [],
          },
        }),
      })

      const title = "Keep track of artworks you love"
      const description =
        "Select the heart on an artwork to save it or add it to a list."

      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(description)).toBeInTheDocument()
    })

    it("should render correct texts for non-default collection", () => {
      renderWithRelay({
        Collection: () => ({
          default: false,
          artworks: {
            edges: [],
          },
        }),
      })

      const title = "Start curating your list of works"
      const description =
        "Add works from All Saves or add new artworks as you browse."

      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(description)).toBeInTheDocument()
    })
  })

  describe("Actions contextual menu", () => {
    it("should not render for default collection", () => {
      renderWithRelay({
        Collection: () => ({ default: true }),
      })

      const menuTriggerButton = screen.queryByLabelText("Open contextual menu")
      expect(menuTriggerButton).not.toBeInTheDocument()
    })

    it("should render for non-default collection", () => {
      renderWithRelay({
        Collection: () => ({ default: false }),
      })

      const menuTriggerButton = screen.queryByLabelText("Open contextual menu")
      expect(menuTriggerButton).toBeInTheDocument()
    })
  })
})
