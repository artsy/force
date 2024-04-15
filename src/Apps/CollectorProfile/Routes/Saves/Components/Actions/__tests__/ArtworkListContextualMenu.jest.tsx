import { screen, fireEvent } from "@testing-library/react"
import {
  ArtworkListEntity,
  ArtworkListContextualMenu,
} from "Apps/CollectorProfile/Routes/Saves/Components/Actions/ArtworkListContextualMenu"
import { render } from "DevTools/renderWithMockBoot"

const artworkList: ArtworkListEntity = {
  internalID: "foobar",
  name: "Foo Bar",
  shareableWithPartners: false,
}

describe("ArtworkListContextualMenu", () => {
  it("renders the trigger and the menu items", async () => {
    render(<ArtworkListContextualMenu artworkList={artworkList} />)

    const menuTriggerButton = screen.getByLabelText("Open contextual menu")
    expect(menuTriggerButton).toBeInTheDocument()

    fireEvent.click(menuTriggerButton)

    expect(await screen.findByText("Edit List")).toBeInTheDocument()
    expect(await screen.findByText("Delete List")).toBeInTheDocument()
  })

  it("opens the Delete modal", async () => {
    render(<ArtworkListContextualMenu artworkList={artworkList} />)

    fireEvent.click(screen.getByLabelText("Open contextual menu"))
    fireEvent.click(await screen.findByText("Delete List"))

    expect(screen.getByText("Delete Foo Bar list?")).toBeInTheDocument()
  })
})
