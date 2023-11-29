import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { ConversationConfirmModal } from "Apps/Conversations/components/ConversationCTA/ConversationConfirmModal"

jest.unmock("react-relay")

jest.mock("Apps/Conversations/ConversationsContext", () => ({
  useConversationsContext: jest.fn().mockReturnValue({
    isConfirmModalVisible: true,
  }),
}))

describe("ConversationConfirmModal", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <ConversationConfirmModal show={true} {...props} />
    ),
    query: graphql`
      query ConversationConfirmModal_artwork_Test_Query @relay_test_operation {
        artwork(id: "xxx") {
          ...ConversationConfirmModal_artwork
        }
      }
    `,
  })

  it("renders the correct artwork details", async () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Test Artwork",
        date: "1967",
        isOfferable: true,
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Test Artwork, 1967")).toBeInTheDocument()
    })
  })

  describe("Artwork editions", () => {
    const mockEditions = {
      Artwork: () => ({
        isEdition: true,
        editionSets: [
          {
            internalID: "edition-1",
            editionOf: "test-edition-1",
            isOfferableFromInquiry: true,
          },
          {
            internalID: "edition-2",
            editionOf: "test-edition-2",
            isOfferableFromInquiry: true,
          },
        ],
      }),
    }

    const mockSingleEdition = {
      Artwork: () => ({
        isEdition: true,
        editionSets: [
          {
            internalID: "edition-1",
            isOfferableFromInquiry: true,
            listPrice: {
              display: "$100",
            },
            editionOf: "Edition of 50",
            dimensions: {
              cm: "70 × 25 × 35 cm",
              in: "27 3/5 × 9 4/5 × 13 4/5 in",
            },
          },
        ],
      }),
    }

    const unavailableEdition = {
      Artwork: () => ({
        editionSets: [
          {
            isOfferableFromInquiry: false,
            internalID: "foo",
          },
        ],
        isEdition: true,
      }),
    }

    const nullListPriceEdition = {
      Artwork: () => ({
        editionSets: [
          {
            isOfferableFromInquiry: true,
            listPrice: {
              display: null,
            },
          },
        ],
        isEdition: true,
      }),
    }

    const mockActionableEditionCases = {
      Artwork: () => ({
        isEdition: true,
        editionSets: [
          {
            internalID: "edition-1",
            editionOf: "offerable-from-inquiry",
            isOfferableFromInquiry: true,
            isOfferable: false,
            isAcquireable: false,
          },
          {
            internalID: "edition-2",
            editionOf: "offerable",
            isOfferableFromInquiry: false,
            isOfferable: true,
            isAcquireable: false,
          },
          {
            internalID: "edition-3",
            editionOf: "acquirable",
            isOfferableFromInquiry: false,
            isOfferable: false,
            isAcquireable: true,
          },
          {
            internalID: "edition-4",
            editionOf: "unavailable",
            isOfferableFromInquiry: false,
            isOfferable: false,
            isAcquireable: false,
          },
        ],
      }),
    }

    it("An Edition renders correctly", async () => {
      renderWithRelay(mockSingleEdition)

      await waitFor(() => {
        expect(screen.queryAllByRole("radio")[0]).toBeInTheDocument()
      })

      expect(
        await screen.findByText("27 3/5 × 9 4/5 × 13 4/5 in")
      ).toBeInTheDocument()
      expect(await screen.findByText("70 × 25 × 35 cm")).toBeInTheDocument()
      expect(await screen.findByText("Edition of 50")).toBeInTheDocument()
      expect(await screen.findByText("$100")).toBeInTheDocument()
    })

    it("One edition is always selected", async () => {
      renderWithRelay(mockSingleEdition)

      expect(await screen.findByRole("radio")).toBeChecked()
    })

    it("Display edititon as disabled when it is not available", async () => {
      renderWithRelay(unavailableEdition)

      await waitFor(() => {
        // eslint-disable-next-line jest-dom/prefer-enabled-disabled
        expect(screen.getByRole("radio")).toHaveAttribute("disabled")
        expect(screen.getByText("Unavailable")).toBeInTheDocument()
      })
    })

    it("Display 'Contact for price' if a price not set in listPrice", async () => {
      renderWithRelay(nullListPriceEdition)

      expect(await screen.findByText("Contact for price")).toBeInTheDocument()
    })

    it("Can select editions", async () => {
      renderWithRelay(mockEditions)

      await waitFor(() => {
        const radios = screen.getAllByRole("radio")
        expect(radios).toHaveLength(2)

        const editions = screen.getAllByText(/test-edition-[12]/)
        expect(editions).toHaveLength(2)
        expect(editions[0]).toHaveTextContent("test-edition-1")
        expect(editions[1]).toHaveTextContent("test-edition-2")

        fireEvent.click(editions[0])
        expect(radios[0]).toBeChecked()
        expect(radios[1]).not.toBeChecked()

        fireEvent.click(editions[1])
        expect(radios[0]).not.toBeChecked()
        expect(radios[1]).toBeChecked()
      })
    })

    it("Correctly displays availability for all relevant cases", async () => {
      renderWithRelay(mockActionableEditionCases)

      await waitFor(() => {
        const radios = screen.getAllByRole("radio")
        expect(radios).toHaveLength(4)

        // Test unavailable edition
        const lastRadio = radios.pop()
        expect(lastRadio).toHaveAttribute("disabled")
        expect(lastRadio).toHaveTextContent("Unavailable")

        // Make sure the rest are not disabled
        for (const radio of radios) {
          expect(radio).toBeEnabled()
          expect(radio).not.toHaveTextContent("Unavailable")
        }
      })
    })
  })
})
