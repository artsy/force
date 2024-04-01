import { fireEvent, render, screen } from "@testing-library/react"
import { OfferSettingsListItem } from "Apps/CollectorProfile/Routes/Saves/Components/OfferSettingsModal/OfferSettingsListItem"
import { useFormikContext } from "formik"
import { OfferSettingsListItem_item$data } from "__generated__/OfferSettingsListItem_item.graphql"

jest.mock("formik", () => ({
  useFormikContext: jest.fn().mockReturnValue({
    values: { "123": false },
    setFieldValue: jest.fn(),
  }),
}))

describe("OfferSettingsListItem", () => {
  it("renders the component with correct data", () => {
    render(<OfferSettingsListItem item={mockItem} />)

    expect(screen.getByText("Test Artwork")).toBeInTheDocument()

    expect(screen.getByText("5 artworks")).toBeInTheDocument()

    expect(screen.getByTestId("HideIcon")).toBeInTheDocument()
  })

  it("renders the artwork image when available", () => {
    render(<OfferSettingsListItem item={mockItem} />)

    expect(screen.getByAltText("Artwork image")).toBeInTheDocument()
  })

  it("renders the placeholder when the artwork image is not available", () => {
    const item = ({
      ...mockItem,
      artworksConnection: {
        edges: [{ node: { image: null } }],
      },
    } as unknown) as OfferSettingsListItem_item$data

    render(<OfferSettingsListItem item={item} />)

    expect(screen.getByLabelText("Image placeholder")).toBeInTheDocument()
  })

  it("sets field value when the toggle is clicked", () => {
    render(<OfferSettingsListItem item={mockItem} />)

    const toggleButton = screen.getByRole("toggle")

    fireEvent.click(toggleButton)

    expect(useFormikContext().setFieldValue).toHaveBeenCalledWith("123", true)
  })
})

const mockItem = ({
  name: "Test Artwork",
  internalID: "123",
  artworksCount: 5,
  artworksConnection: {
    edges: [{ node: { image: { resized: { src: "test.jpg" } } } }],
  },
} as unknown) as OfferSettingsListItem_item$data
