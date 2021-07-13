import { ConfirmArtworkModalFragmentContainer } from "../ConfirmArtworkModal"
import { CollapsibleArtworkDetails } from "../CollapsibleArtworkDetails"
import { EditionSelectBoxFragmentContainer } from "../EditionSelectBox"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    Modal: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ConfirmArtworkModalFragmentContainer,
  query: graphql`
    query ConfirmArtworkModal_Test_Query {
      artwork(id: "xxx") {
        ...ConfirmArtworkModal_artwork
      }
    }
  `,
})

describe("ConfirmArtworkModal", () => {
  it("renders the correct artwork details", () => {
    const wrapper = getWrapper({
      Artwork: () => ({
        title: "Test Artwork",
      }),
    })

    expect(wrapper.find(CollapsibleArtworkDetails)).toHaveLength(1)
    expect(wrapper.find(CollapsibleArtworkDetails).text()).toContain(
      "Test Artwork"
    )
  })

  it("has expandable details and correctly parses labels", () => {
    const wrapper = getWrapper({
      Artwork: () => ({
        certificateOfAuthenticity: { details: "test" },
        dimensions: {
          in: "33 x 33 in",
          cm: "33 x 33 cm",
        },
      }),
    })
    // Expands collapse
    const details = wrapper.find(CollapsibleArtworkDetails)
    expect(details.text()).not.toContain("Certificate of Authenticity")
    wrapper.find("button").simulate("click")
    details.update()
    expect(details.text()).toContain("Certificate of Authenticity")
    expect(details.text()).toContain("33 x 33 in\n33 x 33 cm")
  })
})

describe("Artwork editions", () => {
  const mockEditions = getWrapper({
    Artwork: () => ({
      isEdition: true,
      editionSets: [
        {
          internalID: "edition-1",
          isOfferableFromInquiry: true,
        },
        {
          internalID: "edition-2",
          isOfferableFromInquiry: true,
        },
      ],
    }),
  })

  const mockSingleEdition = getWrapper({
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
  })

  const unavailableEdition = getWrapper({
    Artwork: () => ({
      editionSets: [
        {
          isOfferableFromInquiry: false,
        },
      ],
    }),
  })

  const nullListPriceEdition = getWrapper({
    Artwork: () => ({
      editionSets: [
        {
          listPrice: {
            display: null,
          },
        },
      ],
    }),
  })

  it("An Edition renders correctly", () => {
    const edition = mockSingleEdition.find(EditionSelectBoxFragmentContainer)

    expect(edition).toHaveLength(1)
    expect(edition.find("Radio")).toHaveLength(1)
    expect(edition.find("Text").at(0).text()).toEqual(
      "27 3/5 × 9 4/5 × 13 4/5 in"
    )
    expect(edition.find("Text").at(1).text()).toEqual("70 × 25 × 35 cm")
    expect(edition.find("Text").at(2).text()).toEqual("Edition of 50")
    expect(edition.find("Text").at(3).text()).toEqual("$100")
  })

  it("One edition is always selected", () => {
    const edition = mockSingleEdition.find(EditionSelectBoxFragmentContainer)

    expect(edition.props().selected).toEqual(true)
    expect(edition.find("Radio").props().selected).toEqual(true)
  })

  it("Display edititon as disabled when it is not available", () => {
    const edition = unavailableEdition.find(EditionSelectBoxFragmentContainer)

    expect(edition.find("Radio").props().disabled).toEqual(true)
    expect(edition.find("Text").at(3).text()).toEqual("Unavailable")
  })

  it("Display 'Contact for price' if a price not set in listPrice", () => {
    const edition = nullListPriceEdition.find(EditionSelectBoxFragmentContainer)

    expect(edition.find("Text").at(3).text()).toEqual("Contact for price")
  })

  it("Can select editions", () => {
    const editions = mockEditions.find(EditionSelectBoxFragmentContainer)
    const firstEdition = editions.find(EditionSelectBoxFragmentContainer).at(0)
    const secondEdition = editions.find(EditionSelectBoxFragmentContainer).at(1)

    expect(firstEdition.props().selected).toEqual(false)
    expect(secondEdition.props().selected).toEqual(false)

    firstEdition.find("BorderBox").simulate("click")
    setTimeout(() => {
      expect(firstEdition.props().selected).toEqual(true)
    })

    secondEdition.find("BorderBox").simulate("click")
    setTimeout(() => {
      expect(secondEdition.props().selected).toEqual(true)
      expect(firstEdition.props().selected).toEqual(false)
    })
  })
})
