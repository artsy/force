import { ContextModule } from "@artsy/cohesion"
import { fireEvent, screen } from "@testing-library/react"
import { AppToasts } from "Apps/Components/AppToasts"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { SaveArtworkToListsButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveArtworkToListsButton"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { SaveArtworkToListsButton_Test_Query } from "__generated__/SaveArtworkToListsButton_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("Components/Artwork/SaveButton/SaveArtworkMutation")

describe("SaveArtworkToListsButton", () => {
  const mockSaveArtwork = SaveArtwork as jest.Mock
  let savedListId: string | undefined

  beforeEach(() => {
    savedListId = undefined

    mockSaveArtwork.mockImplementation(() => ({}))
  })

  const { renderWithRelay } = setupTestWrapperTL<
    SaveArtworkToListsButton_Test_Query
  >({
    Component: props => {
      if (!props.artwork) {
        return null
      }

      return (
        <MockBoot context={{ user: { id: "percy-z" } }}>
          <AppToasts accomodateNav={false} />

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
      mockSaveArtwork.mockImplementation(args => ({
        saveArtwork: {
          artwork: {
            is_saved: true,
          },
        },
      }))
    })

    it("should display a toast message", async () => {
      renderWithRelay({
        Artwork: () => unsavedArtwork,
      })

      fireEvent.click(screen.getByText("Save"))

      expect(await screen.findByText("Artwork saved")).toBeInTheDocument()
      expect(await screen.findByText("Add to a List")).toBeInTheDocument()
    })

    it("should open the modal when `Add to a List` button was pressed", async () => {
      renderWithRelay({
        Artwork: () => unsavedArtwork,
      })

      fireEvent.click(await screen.findByText("Save"))
      fireEvent.click(await screen.findByText("Add to a List"))

      const modalTitle = "Select lists for this artwork"
      expect(screen.getByText(modalTitle)).toBeInTheDocument()
    })
  })

  describe("Unsave flow", () => {
    beforeEach(() => {
      mockSaveArtwork.mockImplementation(args => ({
        saveArtwork: {
          artwork: {
            is_saved: false,
          },
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

    it("should display a toast message when artwork was unsaved", async () => {
      renderWithRelay({
        Artwork: () => savedArtwork,
      })

      fireEvent.click(screen.getByText("Unsave"))

      const element = await screen.findByText("Removed from All Saves")
      expect(element).toBeInTheDocument()
    })

    it("should unsave artwork from `All Saves` list by default", async () => {
      renderWithRelay({
        Artwork: () => ({
          is_saved: true,
          customCollections: {
            totalCount: 0,
          },
        }),
      })

      fireEvent.click(screen.getByText("Unsave"))

      const element = await screen.findByText("Removed from All Saves")
      expect(element).toBeInTheDocument()
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
