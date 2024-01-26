import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { useMutation } from "Utils/Hooks/useMutation"
import {
  DeleteArtworkListModal,
  DeleteArtworkListEntity,
} from "Apps/CollectorProfile/Routes/Saves/Components/Actions/DeleteArtworkListModal"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("Utils/Hooks/useMutation")

const artworkList: DeleteArtworkListEntity = {
  internalID: "foobar",
  name: "Foo Bar",
}

describe("DeleteArtworkListModal", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  let closeDeleteModal: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    closeDeleteModal = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })

    mockUseTracking.mockImplementation(() => ({
      trackEvent,
    }))
  })

  it("renders the modal content", async () => {
    render(
      <MockBoot>
        <DeleteArtworkListModal
          artworkList={artworkList}
          onClose={closeDeleteModal}
        />
      </MockBoot>
    )

    expect(screen.getByText("Delete Foo Bar list?")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Delete/ })).toBeInTheDocument()
  })

  it("dismisses when the Cancel button is clicked", async () => {
    render(
      <MockBoot>
        <DeleteArtworkListModal
          artworkList={artworkList}
          onClose={closeDeleteModal}
        />
      </MockBoot>
    )

    fireEvent.click(screen.getByRole("button", { name: /Cancel/ }))

    expect(closeDeleteModal).toHaveBeenCalled()
  })

  it("calls the mutation when the Delete button is clicked", async () => {
    render(
      <MockBoot>
        <DeleteArtworkListModal
          artworkList={artworkList}
          onClose={closeDeleteModal}
        />
      </MockBoot>
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

  it("tracks event when artwork list was deleted", async () => {
    submitMutation.mockImplementation(() => ({
      deleteCollection: {
        responseOrError: {
          __typename: "DeleteCollectionSuccess",
          artworkList: {
            id: "artwork-list-id",
          },
        },
      },
    }))

    render(
      <MockBoot>
        <DeleteArtworkListModal
          artworkList={artworkList}
          onClose={closeDeleteModal}
        />
      </MockBoot>
    )

    fireEvent.click(screen.getByRole("button", { name: /Delete/ }))

    await waitFor(() =>
      expect(trackEvent).toHaveBeenLastCalledWith({
        action: "deletedArtworkList",
        context_owner_type: "saves",
        owner_id: artworkList.internalID,
      })
    )
  })
})
