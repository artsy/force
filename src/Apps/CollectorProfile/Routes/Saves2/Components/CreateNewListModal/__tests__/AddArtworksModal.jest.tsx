import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import { useMutation } from "Utils/Hooks/useMutation"
import { AddArtworksModal } from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal/AddArtworksModal"

jest.mock("Utils/Hooks/useMutation")

describe("AddArtworksModal", () => {
  let onComplete: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    onComplete = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })
  })

  it("renders the modal content", async () => {
    const list = {
      internalID: "collectionID",
      name: "Sculpture",
    }
    render(<AddArtworksModal artworkList={list} onComplete={onComplete} />)

    const title = screen.getByText(
      "Sculpture created. Add saved works to the list."
    )
    expect(title).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Save/ })).toBeInTheDocument()
  })

  it("calls the mutation when the Save button is clicked", async () => {
    const list = {
      internalID: "collectionID",
      name: "Sculpture",
    }

    render(<AddArtworksModal artworkList={list} onComplete={onComplete} />)

    const saveButton = screen.getByRole("button", { name: /Save/ })
    fireEvent.click(saveButton)

    await waitFor(() => expect(submitMutation).toHaveBeenCalledTimes(1))

    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            artworkIDs: [],
            addToCollectionIDs: ["collectionID"],
          },
        },
      })
    )
  })
})
