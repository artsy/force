import { fireEvent, screen } from "@testing-library/react"
import { ArtworkActionsSaveButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveButton"
import { AppToasts } from "Apps/Components/AppToasts"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkActionsSaveButton_Test_Query } from "__generated__/ArtworkActionsSaveButton_Test_Query.graphql"
import { wait } from "Utils/wait"

jest.unmock("react-relay")
jest.mock("Components/Artwork/SaveButton/SaveArtworkMutation")
jest.mock("System/Hooks/useFeatureFlag", () => ({ useFeatureFlag: jest.fn() }))

jest.mock("Utils/getENV", () => ({
  getENV: () => "test",
}))

describe("ArtworkActionsSaveButton", () => {
  const mockSaveArtwork = SaveArtwork as jest.Mock

  beforeEach(() => {
    mockSaveArtwork.mockImplementation(() => ({}))
  })

  const { renderWithRelay } = setupTestWrapperTL<
    ArtworkActionsSaveButton_Test_Query
  >({
    Component: props => {
      if (!props.artwork) {
        return null
      }

      return (
        <MockBoot context={{ user: { id: "percy-z" } }}>
          <AppToasts />

          <ManageArtworkForSavesProvider>
            <ArtworkActionsSaveButtonFragmentContainer
              artwork={props.artwork}
            />
          </ManageArtworkForSavesProvider>
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkActionsSaveButton_Test_Query @relay_test_operation {
        artwork(id: "artworkID") {
          ...ArtworkActionsSaveButton_artwork
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

  it("should display `Watch lot` label", () => {
    renderWithRelay({
      Artwork: () => unsavedAuctionArtwork,
    })

    expect(screen.getByText("Watch lot")).toBeInTheDocument()
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

    it("should display a toast message", async () => {
      renderWithRelay({
        Artwork: () => unsavedArtwork,
      })

      fireEvent.click(screen.getByText("Save"))

      expect(await screen.findByText("Artwork saved")).toBeInTheDocument()
      expect(
        await screen.findByText(
          "Saving an artwork signals interest to galleries."
        )
      ).toBeInTheDocument()
      expect(await screen.findByText("Add to a List")).toBeInTheDocument()
    })

    it("should not display the toast message when artwork is in auction", async () => {
      renderWithRelay({
        Artwork: () => unsavedAuctionArtwork,
      })

      fireEvent.click(screen.getByText("Watch lot"))

      // giving the toast some time to appear. Without this line, the test succeeds
      // even when the toast is being displayed
      await wait(500)

      expect(screen.queryByText("Artwork saved")).not.toBeInTheDocument()
      expect(screen.queryByText("Add to a List")).not.toBeInTheDocument()
    })

    it("should open the modal when `Add to a List` button was pressed", async () => {
      renderWithRelay({
        Artwork: () => unsavedArtwork,
      })

      fireEvent.click(screen.getByText("Save"))
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

    describe("should display `Saved` label with selected state", () => {
      it("if artwork was previously saved in `Saved Artworks` list", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: true,
          }),
        })

        expect(screen.getByText("Saved")).toBeInTheDocument()
      })

      it("if artwork was previously saved in custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: false,
            isSavedToList: true,
          }),
        })

        expect(screen.getByText("Saved")).toBeInTheDocument()
      })

      it("if artwork was previously saved in `Saved Artworks` and custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: true,
            isSavedToList: true,
          }),
        })

        expect(screen.getByText("Saved")).toBeInTheDocument()
      })
    })

    describe("should display `Watch lot` button with selected state", () => {
      it("if artwork was previously saved in `Saved Artworks` list", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: true,
            sale,
          }),
        })

        expect(screen.getByText("Watching lot")).toBeInTheDocument()
      })

      it("if artwork was previously saved in `Saved Artworks` and custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: true,
            sale,
            isSavedToList: true,
          }),
        })

        expect(screen.getByText("Watching lot")).toBeInTheDocument()
      })
    })

    describe("should display `Watch lot` button with un-selected state", () => {
      it("if artwork was previously saved only in custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: false,
            sale,
            isSavedToList: true,
          }),
        })

        expect(screen.getByText("Watch lot")).toBeInTheDocument()
      })
    })

    it("should display a toast message when artwork was unsaved", async () => {
      renderWithRelay({
        Artwork: () => savedArtwork,
      })

      fireEvent.click(screen.getByText("Saved"))

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

      fireEvent.click(screen.getByText("Saved"))

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

      fireEvent.click(screen.getByText("Saved"))

      const modalTitle = "Select lists for this artwork"
      expect(screen.getByText(modalTitle)).toBeInTheDocument()
    })
  })
})

const sale = {
  isAuction: true,
  isClosed: false,
}

const unsavedArtwork = {
  isSaved: false,
  isSavedToList: false,
}

const savedArtwork = {
  isSaved: true,
  isSavedToList: false,
}

const unsavedAuctionArtwork = {
  ...unsavedArtwork,
  sale,
}
