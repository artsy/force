import { ContextModule } from "@artsy/cohesion"
import { fireEvent, screen } from "@testing-library/react"
import { AppToasts } from "Apps/Components/AppToasts"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { SaveArtwork } from "Components/Artwork/SaveButton/SaveArtworkMutation"
import { SaveArtworkToListsButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveArtworkToListsButton"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { SaveArtworkToListsButton_Test_Query } from "__generated__/SaveArtworkToListsButton_Test_Query.graphql"
import { act } from "react-dom/test-utils"
import { graphql } from "react-relay"
import { fetchQuery } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/Artwork/SaveButton/SaveArtworkMutation")

// Used for stubbing list inclusion query
// made when an artwork is unsaved.
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(() => ({
    toPromise: jest.fn(),
  })),
}))

describe("SaveArtworkToListsButton", () => {
  const mockSaveArtwork = SaveArtwork as jest.Mock
  let savedListId: string | undefined

  beforeEach(() => {
    savedListId = undefined

    mockSaveArtwork.mockImplementation(() => ({}))
  })

  const { renderWithRelay } =
    setupTestWrapperTL<SaveArtworkToListsButton_Test_Query>({
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

  describe("Save flow for non auction artwork", () => {
    beforeEach(() => {
      mockSaveArtwork.mockImplementation(args => ({
        saveArtwork: {
          artwork: {
            isSavedToAnyList: true,
            isInAuction: false,
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
          "Saving an artwork signals interest to galleries.",
        ),
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

  describe("Save flow for auction artwork", () => {
    beforeEach(() => {
      mockSaveArtwork.mockImplementation(args => ({
        saveArtwork: {
          artwork: {
            isSavedToAnyList: true,
            isInAuction: true,
          },
        },
      }))
    })

    it("should display a toast message without the description", async () => {
      renderWithRelay({
        Artwork: () => unsavedAuctionArtwork,
      })

      fireEvent.click(screen.getByLabelText("Save"))

      expect(await screen.findByText("Artwork saved")).toBeInTheDocument()
      expect(
        screen.queryByText("Saving an artwork signals interest to galleries."),
      ).not.toBeInTheDocument()
      expect(await screen.findByText("Add to a List")).toBeInTheDocument()
    })

    it("should open the modal when `Add to a List` button was pressed", async () => {
      renderWithRelay({
        Artwork: () => unsavedAuctionArtwork,
      })

      fireEvent.click(await screen.findByLabelText("Save"))
      fireEvent.click(await screen.findByText("Add to a List"))

      const modalTitle = "Select lists for this artwork"
      expect(screen.getByText(modalTitle)).toBeInTheDocument()
    })
  })

  describe("Unsave flow", () => {
    const mockFetchQuery = fetchQuery as jest.Mock

    beforeEach(() => {
      mockSaveArtwork.mockImplementation(args => ({
        saveArtwork: {
          artwork: {
            isSavedToAnyList: false,
          },
        },
      }))
    })

    describe("should display `Unsave` label", () => {
      it("if artwork was previously saved", () => {
        renderWithRelay({
          Artwork: () => ({
            isSavedToAnyList: true,
          }),
        })

        expect(screen.getByLabelText("Unsave")).toBeInTheDocument()
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

      fireEvent.click(screen.getByLabelText("Unsave"))

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
        fireEvent.click(screen.getByLabelText("Unsave"))
        setTimeout(() => {
          const modalTitle = "Select lists for this artwork"
          expect(screen.getByText(modalTitle)).toBeInTheDocument()
        })
      })
    })
  })
})

const unsavedArtwork = {
  isInAuction: false,
  isSavedToAnyList: false,
}

const savedArtwork = {
  isInAuction: false,
  isSavedToAnyList: true,
}

const unsavedAuctionArtwork = {
  isInAuction: true,
  isSavedToAnyList: false,
}
