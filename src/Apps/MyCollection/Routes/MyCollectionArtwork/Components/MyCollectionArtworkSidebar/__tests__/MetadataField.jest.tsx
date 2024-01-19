import { act, fireEvent, screen, waitFor } from "@testing-library/react"
import { MetadataField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarMetadata"
import { render } from "DevTools/renderWithMockBoot"

describe("MetadataField", () => {
  it("Value is truncated when truncateLimit is set", () => {
    render(<MetadataField label="Test" value={longText} truncateLimit={5} />)
    expect(screen.queryByText(longText)).not.toBeInTheDocument()

    expect(screen.queryByText("Lorem")).toBeInTheDocument()
  })

  it("Value is NOT truncated when truncateLimit is not given", () => {
    render(<MetadataField label="Test" value={longText} />)
    expect(screen.queryByText(longText)).toBeInTheDocument()
  })

  it("Read More button is only present if value can be expanded", () => {
    render(
      <MetadataField
        label="Test"
        value={longText}
        truncateLimit={longText.length}
      />
    )
    expect(screen.queryByText("Read More")).not.toBeInTheDocument()

    render(
      <MetadataField
        label="Test"
        value={longText}
        truncateLimit={longText.length - 20}
      />
    )
    expect(screen.queryByText("Read More")).toBeInTheDocument()
  })

  it('Pressing "Read More" expands the text value', async () => {
    render(<MetadataField label="Test" value={longText} truncateLimit={10} />)

    expect(screen.queryByText(longText)).not.toBeInTheDocument()

    const button = await screen.findByRole("button")
    act(() => {
      fireEvent.click(button)
    })

    // after click the full text should now be in document
    await waitFor(() => {
      expect(screen.queryByText(longText)).toBeInTheDocument()
    })
  })
})

const longText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
