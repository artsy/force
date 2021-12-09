import { ConfirmArtworkModalFragmentContainer } from "../ConfirmArtworkModal"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen, fireEvent } from "@testing-library/react"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    Modal: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ConfirmArtworkModalFragmentContainer,
  query: graphql`
    query ConfirmArtworkModal_Test_Query @relay_test_operation {
      artwork(id: "xxx") {
        ...ConfirmArtworkModal_artwork
      }
    }
  `,
})

describe("ConfirmArtworkModal", () => {
  it("renders the correct artwork details", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Test Artwork",
        date: "1967",
      }),
    })
    expect(screen.getByText("Test Artwork, 1967")).toBeInTheDocument()
  })

  it("has expandable details and correctly parses labels", () => {
    renderWithRelay({
      Artwork: () => ({
        certificateOfAuthenticity: { details: "test" },
        dimensions: {
          in: "33 x 33 in",
          cm: "33 x 33 cm",
        },
      }),
    })

    expect(screen.queryAllByText("Certificate of Authenticity")).toStrictEqual(
      []
    )
    fireEvent.click(screen.getByRole("button"))

    expect(screen.getByText("Certificate of Authenticity")).toBeInTheDocument()
    expect(screen.getByText("33 x 33 in 33 x 33 cm")).toBeInTheDocument()
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
        },
      ],
    }),
  }

  const nullListPriceEdition = {
    Artwork: () => ({
      editionSets: [
        {
          listPrice: {
            display: null,
          },
        },
      ],
    }),
  }

  it("An Edition renders correctly", () => {
    renderWithRelay(mockSingleEdition)

    expect(screen.queryAllByRole("radio")[0]).toBeInTheDocument()
    expect(screen.getByText("27 3/5 × 9 4/5 × 13 4/5 in")).toBeInTheDocument()
    expect(screen.getByText("70 × 25 × 35 cm")).toBeInTheDocument()
    expect(screen.getByText("Edition of 50")).toBeInTheDocument()
    expect(screen.getByText("$100")).toBeInTheDocument()
  })

  it("One edition is always selected", () => {
    renderWithRelay(mockSingleEdition)

    expect(screen.getByRole("radio")).toBeChecked()
  })

  it("Display edititon as disabled when it is not available", () => {
    renderWithRelay(unavailableEdition)

    // eslint-disable-next-line jest-dom/prefer-enabled-disabled
    expect(screen.getByRole("radio")).toHaveAttribute("disabled")
    expect(screen.getByText("Unavailable")).toBeInTheDocument()
  })

  it("Display 'Contact for price' if a price not set in listPrice", () => {
    renderWithRelay(nullListPriceEdition)

    expect(screen.getByText("Contact for price")).toBeInTheDocument()
  })

  it("Can select editions", () => {
    renderWithRelay(mockEditions)

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
