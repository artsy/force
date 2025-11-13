import { ArtworkActionsSaveButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsSaveButton"
import { AppToasts } from "Apps/Components/AppToasts"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { ArtworkActionsSaveButton_Test_Query } from "__generated__/ArtworkActionsSaveButton_Test_Query.graphql"
import { act } from "react-dom/test-utils"
import { fetchQuery, graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/Artwork/SaveButton/SaveArtworkMutation")

jest.mock("Utils/getENV", () => ({
  getENV: () => "test",
}))

// Used for stubbing list inclusion query
// made when an artwork is unsaved.
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(() => ({
    toPromise: jest.fn(),
  })),
}))

describe("ArtworkActionsSaveButton", () => {
  const mockSaveArtwork = SaveArtwork as jest.Mock

  beforeEach(() => {
    mockSaveArtwork.mockImplementation(() => ({}))
  })

  const { renderWithRelay } =
    setupTestWrapperTL<ArtworkActionsSaveButton_Test_Query>({
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
      mockSaveArtwork.mockImplementation(_args => ({
        saveArtwork: {
          artwork: {
            isSavedToAnyList: true,
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

    it("should display the toast message when artwork is in auction", async () => {
      renderWithRelay({
        Artwork: () => unsavedAuctionArtwork,
      })

      fireEvent.click(screen.getByText("Watch lot"))

      expect(await screen.findByText("Artwork saved")).toBeInTheDocument()
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
    const mockFetchQuery = fetchQuery as jest.Mock

    beforeEach(() => {
      mockSaveArtwork.mockImplementation(_args => ({
        saveArtwork: {
          artwork: {
            isSavedToAnyList: false,
          },
        },
      }))
    })

    describe("should display `Saved` label with selected state", () => {
      it("if artwork was previously saved", () => {
        renderWithRelay({
          Artwork: () => ({
            isSavedToAnyList: true,
          }),
        })

        expect(screen.getByText("Saved")).toBeInTheDocument()
      })
    })

    describe("should display `Watch lot` button with selected state", () => {
      it("if artwork was previously saved", () => {
        renderWithRelay({
          Artwork: () => ({
            isSavedToAnyList: true,
            sale,
          }),
        })

        expect(screen.getByText("Watching lot")).toBeInTheDocument()
      })
    })

    it("should display a toast message when artwork was unsaved", async () => {
      mockFetchQuery.mockImplementation(() => {
        return {
          toPromise: jest
            .fn()
            .mockResolvedValue({ artwork: { isSavedToList: false } }),
        }
      })

      renderWithRelay({
        Artwork: () => savedArtwork,
      })

      fireEvent.click(screen.getByText("Saved"))

      const element = await screen.findByText("Removed from Saved Artworks")
      expect(element).toBeInTheDocument()
    })

    it("should open the modal when artwork was saved in custom lists", () => {
      mockFetchQuery.mockImplementation(() => {
        return {
          toPromise: jest
            .fn()
            .mockResolvedValue({ artwork: { isSavedToList: true } }),
        }
      })

      renderWithRelay({
        Artwork: () => savedArtwork,
      })

      act(() => {
        fireEvent.click(screen.getByText("Saved"))
        setTimeout(() => {
          const modalTitle = "Select lists for this artwork"
          expect(screen.getByText(modalTitle)).toBeInTheDocument()
        })
      })
    })
  })
})

const sale = {
  isAuction: true,
  isClosed: false,
}

const unsavedArtwork = {
  isSavedToAnyList: false,
}

const savedArtwork = {
  isSavedToAnyList: true,
}

const unsavedAuctionArtwork = {
  ...unsavedArtwork,
  sale,
}
