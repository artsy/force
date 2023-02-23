import { render, screen, fireEvent } from "@testing-library/react"

import { useMutation } from "Utils/Hooks/useMutation"
import { DeleteSavesModal } from "Apps/CollectorProfile/Routes/Saves2/Components/Actions/DeleteSavesModal"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"

jest.mock("Utils/Hooks/useMutation")

const collection = {
  internalID: "foobar",
  name: "Foo Bar",
} as SavesArtworks_collection$data

describe("DeleteSavesModal", () => {
  let setIsDeleteModalOpen: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    setIsDeleteModalOpen = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })
  })

  it("renders the modal content", async () => {
    render(
      <DeleteSavesModal
        collection={collection}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    )

    expect(screen.getByText("Delete Foo Bar list?")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Delete/ })).toBeInTheDocument()
  })

  it("dismisses when the Cancel button is clicked", async () => {
    render(
      <DeleteSavesModal
        collection={collection}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: /Cancel/ }))

    expect(setIsDeleteModalOpen).toHaveBeenCalledWith(false)
  })

  it("calls the mutation when the Delete button is clicked", async () => {
    render(
      <DeleteSavesModal
        collection={collection}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
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
