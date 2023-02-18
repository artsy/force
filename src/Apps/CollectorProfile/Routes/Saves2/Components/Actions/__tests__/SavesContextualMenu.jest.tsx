import { render, screen, fireEvent } from "@testing-library/react"

import { SavesContextualMenu } from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/SavesContextualMenu"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"

const collection = {
  internalID: "foobar",
  name: "Foo Bar",
} as SavesArtworks_collection$data

describe("SavesContextualMenu", () => {
  it("renders the trigger and the menu items", async () => {
    render(<SavesContextualMenu collection={collection} />)

    const menuTriggerButton = screen.getByLabelText("Open contextual menu")
    expect(menuTriggerButton).toBeInTheDocument()

    fireEvent.click(menuTriggerButton)

    expect(await screen.findByText("Edit List")).toBeInTheDocument()
    expect(await screen.findByText("Delete List")).toBeInTheDocument()
  })

  it("opens the Delete modal", async () => {
    render(<SavesContextualMenu collection={collection} />)

    fireEvent.click(screen.getByLabelText("Open contextual menu"))
    fireEvent.click(await screen.findByText("Delete List"))

    expect(screen.getByText("Delete Foo Bar list?")).toBeInTheDocument()
  })
})
