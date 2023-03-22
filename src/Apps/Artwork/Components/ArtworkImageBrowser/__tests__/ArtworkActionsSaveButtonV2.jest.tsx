import { fireEvent, screen } from "@testing-library/react"
import { ArtworkActionsSaveButtonV2FragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveButtonV2"
import { AppToasts } from "Apps/Components/AppToasts"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ArtworkActionsSaveButtonV2_Test_Query } from "__generated__/ArtworkActionsSaveButtonV2_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("Components/Artwork/SaveButton/SaveArtworkMutation")

describe("ArtworkActionsSaveButtonV2", () => {
  const mockSaveArtwork = SaveArtwork as jest.Mock

  beforeEach(() => {
    mockSaveArtwork.mockImplementation(() => ({}))
  })

  const { renderWithRelay } = setupTestWrapperTL<
    ArtworkActionsSaveButtonV2_Test_Query
  >({
    Component: props => {
      if (!props.artwork) {
        return null
      }

      return (
        <MockBoot context={{ user: { id: "percy-z" } }}>
          <AppToasts accomodateNav={false} />

          <ManageArtworkForSavesProvider>
            <ArtworkActionsSaveButtonV2FragmentContainer
              artwork={props.artwork}
            />
          </ManageArtworkForSavesProvider>
        </MockBoot>
      )
    },
    query: graphql`
      query ArtworkActionsSaveButtonV2_Test_Query @relay_test_operation {
        artwork(id: "artworkID") {
          ...ArtworkActionsSaveButtonV2_artwork
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

    it("should display a different toast message when artwork is in auction", async () => {
      renderWithRelay({
        Artwork: () => unsavedAuctionArtwork,
      })

      fireEvent.click(screen.getByText("Watch lot"))

      expect(await screen.findByText("Watch lot saved")).toBeInTheDocument()
      expect(await screen.findByText("Add to a List")).toBeInTheDocument()
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
            is_saved: false,
          },
        },
      }))
    })

    describe("should display `Saved` label", () => {
      it("if artwork was previously saved in `All Saves` list", () => {
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
            customCollections: {
              totalCount: 2,
            },
          }),
        })

        expect(screen.getByText("Saved")).toBeInTheDocument()
      })

      it("if artwork was previously saved in `All Saves` and custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: true,
            customCollections: {
              totalCount: 2,
            },
          }),
        })

        expect(screen.getByText("Saved")).toBeInTheDocument()
      })
    })

    describe("should display `Watch lot` label", () => {
      it("if artwork was previously saved in `All Saves` list", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: true,
            sale,
          }),
        })

        expect(screen.getByText("Watch lot")).toBeInTheDocument()
      })

      it("if artwork was previously saved in custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: false,
            sale,
            customCollections: {
              totalCount: 2,
            },
          }),
        })

        expect(screen.getByText("Watch lot")).toBeInTheDocument()
      })

      it("if artwork was previously saved in `All Saves` and custom lists", () => {
        renderWithRelay({
          Artwork: () => ({
            isSaved: true,
            sale,
            customCollections: {
              totalCount: 2,
            },
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

      const element = await screen.findByText("Removed from All Saves")
      expect(element).toBeInTheDocument()
    })

    it("should unsave artwork from `All Saves` list by default", async () => {
      renderWithRelay({
        Artwork: () => ({
          isSaved: true,
          customCollections: {
            totalCount: 0,
          },
        }),
      })

      fireEvent.click(screen.getByText("Saved"))

      const element = await screen.findByText("Removed from All Saves")
      expect(element).toBeInTheDocument()
    })

    it("should open the modal when artwork was saved in custom lists", () => {
      renderWithRelay({
        Artwork: () => ({
          isSaved: true,
          customCollections: {
            totalCount: 2,
          },
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
  customCollections: {
    totalCount: 0,
  },
}

const savedArtwork = {
  isSaved: true,
  customCollections: {
    totalCount: 0,
  },
}

const unsavedAuctionArtwork = {
  ...unsavedArtwork,
  sale,
}
