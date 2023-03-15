import { ContextModule } from "@artsy/cohesion"
import { fireEvent, screen } from "@testing-library/react"
import { AppToasts } from "Apps/Components/AppToasts"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtworkToListsButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveArtworkToListsButton"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { SaveArtworkToListsButton_Test_Query } from "__generated__/SaveArtworkToListsButton_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("Components/Artwork/SaveButton/useSaveArtwork")

describe("SaveArtworkToListsButton", () => {
  const mockUseSaveArtwork = useSaveArtwork as jest.Mock
  let savedListId: string | undefined

  beforeEach(() => {
    savedListId = undefined

    mockUseSaveArtwork.mockImplementation(() => ({
      handleSave: jest.fn,
    }))
  })

  const { renderWithRelay } = setupTestWrapperTL<
    SaveArtworkToListsButton_Test_Query
  >({
    Component: props => {
      if (!props.artwork) {
        return null
      }

      return (
        <MockBoot>
          <AppToasts />

          <ManageArtworkForSavesProvider savedListId={savedListId}>
            <SaveArtworkToListsButtonFragmentContainer
              artwork={props.artwork}
              contextModule={ContextModule.artworkGrid}
            />
          </ManageArtworkForSavesProvider>
        </MockBoot>
      )
    },
    query: graphql`
      query SaveArtworkToListsButton_Test_Query @relay_test_operation {
        artwork(id: "artworkID") {
          ...SaveArtworkToListsButton_artwork
        }
      }
    `,
  })

  it("should display `Save` label", () => {
    renderWithRelay({
      Artwork: () => unsavedArtwork,
    })

    expect(screen.getByText("Save")).toBeInTheDocument()
  })

  describe("Save flow", () => {
    beforeEach(() => {
      mockUseSaveArtwork.mockImplementation(args => ({
        handleSave: () => {
          args.onSave({
            action: "Saved Artwork",
            artwork: actionResult,
          })
        },
      }))
    })

    it("should display a toast message", () => {
      renderWithRelay({
        Artwork: () => unsavedArtwork,
      })

      fireEvent.click(screen.getByText("Save"))

      expect(screen.getByText("Artwork saved")).toBeInTheDocument()
      expect(screen.getByText("Add to a List")).toBeInTheDocument()
    })

    it("should open the modal when `Add to a List` button was pressed", () => {
      renderWithRelay({
        Artwork: () => unsavedArtwork,
      })

      fireEvent.click(screen.getByText("Save"))
      fireEvent.click(screen.getByText("Add to a List"))

      const modalTitle = "Select lists for this artwork"
      expect(screen.getByText(modalTitle)).toBeInTheDocument()
    })
  })

  describe("Unsave flow", () => {
    beforeEach(() => {
      mockUseSaveArtwork.mockImplementation(args => ({
        handleSave: () => {
          args.onSave({
            action: "Removed Artwork",
            artwork: actionResult,
          })
        },
      }))
    })

    describe("should display `Unsave` label", () => {
      it("if artwork was previously saved in `All Saves` list", () => {
        renderWithRelay({
          Artwork: () => ({
            is_saved: true,
          }),
        })

        expect(screen.getByText("Unsave")).toBeInTheDocument()
      })

      it("if artwork was previously saved in custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            is_saved: false,
            customCollections: {
              totalCount: 2,
            },
          }),
        })

        expect(screen.getByText("Unsave")).toBeInTheDocument()
      })

      it("if artwork was previously saved in `All Saves` and custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            is_saved: false,
            customCollections: {
              totalCount: 2,
            },
          }),
        })

        expect(screen.getByText("Unsave")).toBeInTheDocument()
      })
    })

    it("should display a toast message when artwork was unsaved", () => {
      renderWithRelay({
        Artwork: () => savedArtwork,
      })

      fireEvent.click(screen.getByText("Unsave"))

      expect(screen.getByText("Removed from All Saves")).toBeInTheDocument()
    })

    it("should unsave artwork from `All Saves` list by default", () => {
      renderWithRelay({
        Artwork: () => ({
          is_saved: true,
          customCollections: {
            totalCount: 0,
          },
        }),
      })

      fireEvent.click(screen.getByText("Unsave"))

      expect(screen.getByText("Removed from All Saves")).toBeInTheDocument()
    })

    it("should open the modal when artwork was saved in custom lists", () => {
      renderWithRelay({
        Artwork: () => ({
          is_saved: true,
          customCollections: {
            totalCount: 2,
          },
        }),
      })

      fireEvent.click(screen.getByText("Unsave"))

      const modalTitle = "Select lists for this artwork"
      expect(screen.getByText(modalTitle)).toBeInTheDocument()
    })
  })
})

const actionResult = {
  slug: "artwork-slug",
  internalID: "artwork-id",
}

const unsavedArtwork = {
  is_saved: false,
  customCollections: {
    totalCount: 0,
  },
}

const savedArtwork = {
  is_saved: true,
  customCollections: {
    totalCount: 0,
  },
}
