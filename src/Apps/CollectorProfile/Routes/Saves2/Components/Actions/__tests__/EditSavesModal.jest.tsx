import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import { useMutation } from "Utils/Hooks/useMutation"
import { EditSavesModal } from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/EditSavesModal"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"

jest.mock("Utils/Hooks/useMutation")

const collection = {
  internalID: "foobar",
  name: "Foo Bar",
} as SavesArtworks_collection$data

const setup = () => {
  const nameInputField = screen.getByRole("textbox")
  const saveButton = screen.getByRole("button", { name: /Save/ })
  const cancelButton = screen.getByRole("button", { name: /Cancel/ })

  return { nameInputField, saveButton, cancelButton }
}

describe("EditSavesModal", () => {
  let closeEditModal: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    closeEditModal = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })
  })

  it("renders the modal content", async () => {
    render(<EditSavesModal collection={collection} onClose={closeEditModal} />)

    expect(screen.getByText("Edit your list")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Save/ })).toBeInTheDocument()
  })

  it("dismisses when the Cancel button is clicked", async () => {
    render(<EditSavesModal collection={collection} onClose={closeEditModal} />)
    const { cancelButton } = setup()

    fireEvent.click(cancelButton)

    expect(closeEditModal).toHaveBeenCalled()
  })

  it("calls the mutation when the Save button is clicked", async () => {
    render(<EditSavesModal collection={collection} onClose={closeEditModal} />)
    const { nameInputField, saveButton } = setup()

    fireEvent.change(nameInputField, {
      target: { value: "Foo Bar!" },
    })

    fireEvent.click(saveButton)

    await waitFor(() => expect(submitMutation).toHaveBeenCalledTimes(1))

    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            id: "foobar",
            name: "Foo Bar!",
          },
        },
      })
    )
  })

  it("trims extra whitespace", async () => {
    render(<EditSavesModal collection={collection} onClose={closeEditModal} />)
    const { nameInputField, saveButton } = setup()

    fireEvent.change(nameInputField, {
      target: { value: "  Foo Bar  " },
    })

    fireEvent.click(saveButton)

    await waitFor(() => expect(submitMutation).toHaveBeenCalledTimes(1))

    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            id: "foobar",
            name: "Foo Bar",
          },
        },
      })
    )
  })

  it("disables Save button until form is dirty", async () => {
    render(<EditSavesModal collection={collection} onClose={closeEditModal} />)
    const { nameInputField, saveButton } = setup()

    expect(saveButton).toBeDisabled()

    fireEvent.change(nameInputField, {
      target: { value: "Foo Bar!" },
    })

    expect(saveButton).toBeEnabled()
  })
})
