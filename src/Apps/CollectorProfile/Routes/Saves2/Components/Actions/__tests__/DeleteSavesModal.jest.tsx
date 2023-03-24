import { render, screen, fireEvent } from "@testing-library/react"

import { useMutation } from "Utils/Hooks/useMutation"
import {
  DeleteSavesModal,
  DeleteSavesModalCollection,
} from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/DeleteSavesModal"

jest.mock("Utils/Hooks/useMutation")

const collection: DeleteSavesModalCollection = {
  internalID: "foobar",
  name: "Foo Bar",
}

describe("DeleteSavesModal", () => {
  let closeDeleteModal: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    closeDeleteModal = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })
  })

  it("renders the modal content", async () => {
    render(
      <DeleteSavesModal collection={collection} onClose={closeDeleteModal} />
    )

    expect(screen.getByText("Delete Foo Bar list?")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Delete/ })).toBeInTheDocument()
  })

  it("dismisses when the Cancel button is clicked", async () => {
    render(
      <DeleteSavesModal collection={collection} onClose={closeDeleteModal} />
    )

    fireEvent.click(screen.getByRole("button", { name: /Cancel/ }))

    expect(closeDeleteModal).toHaveBeenCalled()
  })

  it("calls the mutation when the Delete button is clicked", async () => {
    render(
      <DeleteSavesModal collection={collection} onClose={closeDeleteModal} />
    )

    fireEvent.click(screen.getByRole("button", { name: /Delete/ }))

    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: { id: "foobar" },
        },
      })
    )
  })
})
