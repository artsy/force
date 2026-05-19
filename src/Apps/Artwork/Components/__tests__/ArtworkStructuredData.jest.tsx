import { render } from "@testing-library/react"
import { ArtworkStructuredData } from "Apps/Artwork/Components/ArtworkStructuredData"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  useLazyLoadQuery: jest.fn(),
}))

const { useLazyLoadQuery } = require("react-relay")

describe("ArtworkStructuredData", () => {
  it("renders nothing when artwork is null", () => {
    useLazyLoadQuery.mockReturnValue({ artwork: null })

    const { container } = render(<ArtworkStructuredData id="some-artwork" />)

    expect(container).toBeEmptyDOMElement()
  })

  it("renders structured data when artwork is present", () => {
    useLazyLoadQuery.mockReturnValue({
      artwork: {
        slug: "banksy-flower-thrower",
        href: "/artwork/banksy-flower-thrower",
        title: "Flower Thrower",
        medium: "Print",
        series: null,
        publisher: null,
        manufacturer: null,
        imageRights: null,
        editionOf: null,
        mediumType: { name: "Print" },
        artists: [{ name: "Banksy", href: "/artist/banksy" }],
        date: "2003",
        width: "50",
        height: "70",
        depth: null,
        metric: "cm",
        image: null,
        description: null,
        isPriceHidden: false,
        availability: "for sale",
        listPrice: null,
        partner: null,
      },
    })

    render(
      <MockBoot>
        <ArtworkStructuredData id="banksy-flower-thrower" />
      </MockBoot>,
    )

    expect(
      document.querySelector("script[type='application/ld+json']"),
    ).toBeInTheDocument()
  })
})
