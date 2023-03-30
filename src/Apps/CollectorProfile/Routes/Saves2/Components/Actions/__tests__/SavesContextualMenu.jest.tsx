import { render, screen, fireEvent } from "@testing-library/react"
import {
  ArtworkListEntity,
  SavesContextualMenu,
} from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/SavesContextualMenu"

const artworkList: ArtworkListEntity = {
  internalID: "foobar",
  name: "Foo Bar",
}

describe("SavesContextualMenu", () => {
  it("renders the trigger and the menu items", async () => {
    render(<SavesContextualMenu artworkList={artworkList} />)

    const menuTriggerButton = screen.getByLabelText("Open contextual menu")
    expect(menuTriggerButton).toBeInTheDocument()

    fireEvent.click(menuTriggerButton)

    expect(await screen.findByText("Edit List")).toBeInTheDocument()
    expect(await screen.findByText("Delete List")).toBeInTheDocument()
  })

  it("opens the Delete modal", async () => {
    render(<SavesContextualMenu artworkList={artworkList} />)

    fireEvent.click(screen.getByLabelText("Open contextual menu"))
    fireEvent.click(await screen.findByText("Delete List"))

    expect(screen.getByText("Delete Foo Bar list?")).toBeInTheDocument()
  })
})
