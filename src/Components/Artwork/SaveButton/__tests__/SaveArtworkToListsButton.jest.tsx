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
jest.mock("System/Hooks/useFeatureFlag", () => ({ useFeatureFlag: jest.fn() }))

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

    expect(screen.getByLabelText("Save")).toBeInTheDocument()
  })

  describe("Save flow", () => {
    beforeEach(() => {
      mockSaveArtwork.mockImplementation(args => ({
        saveArtwork: {
          artwork: {
            isSaved: true,
          },
        },
      }))
    })

    it("should display a toast message with the description", async () => {
      renderWithRelay({
        Artwork: () => unsavedArtwork,
      })

      fireEvent.click(screen.getByLabelText("Save"))

      expect(await screen.findByText("Artwork saved")).toBeInTheDocument()
      expect(
        await screen.findByText(
          "Saving an artwork signals interest to galleries."
        )
      ).toBeInTheDocument()
      expect(await screen.findByText("Add to a List")).toBeInTheDocument()
    })

    it("should open the modal when `Add to a List` button was pressed", async () => {
      renderWithRelay({
        Artwork: () => unsavedArtwork,
      })

      fireEvent.click(await screen.findByLabelText("Save"))
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
            isSaved: false,
          },
        },
      }))
    })

    describe("should display `Unsave` label", () => {
      it("if artwork was previously saved in `Saved Artworks` list", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: true,
          }),
        })

        expect(screen.getByLabelText("Unsave")).toBeInTheDocument()
      })

      it("if artwork was previously saved in custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: false,
            isSavedToList: true,
          }),
        })

        expect(screen.getByLabelText("Unsave")).toBeInTheDocument()
      })

      it("if artwork was previously saved in `Saved Artworks` and custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: false,
            isSavedToList: true,
          }),
        })

        expect(screen.getByLabelText("Unsave")).toBeInTheDocument()
      })
    })

    it("should display a toast message when artwork was unsaved", async () => {
      renderWithRelay({
        Artwork: () => savedArtwork,
      })

      fireEvent.click(screen.getByLabelText("Unsave"))

      const element = await screen.findByText("Removed from Saved Artworks")
      expect(element).toBeInTheDocument()
    })

    it("should unsave artwork from `Saved Artworks` list by default", async () => {
      renderWithRelay({
        Artwork: () => ({
          isSaved: true,
          isSavedToList: false,
        }),
      })

      fireEvent.click(screen.getByLabelText("Unsave"))

      const element = await screen.findByText("Removed from Saved Artworks")
      expect(element).toBeInTheDocument()
    })

    it("should open the modal when artwork was saved in custom lists", () => {
      renderWithRelay({
        Artwork: () => ({
          isSaved: true,
          isSavedToList: true,
        }),
      })

      fireEvent.click(screen.getByLabelText("Unsave"))

      const modalTitle = "Select lists for this artwork"
      expect(screen.getByText(modalTitle)).toBeInTheDocument()
    })
  })
})

const unsavedArtwork = {
  isSaved: false,
  isSavedToList: false,
}

const savedArtwork = {
  isSaved: true,
  isSavedToList: false,
}
