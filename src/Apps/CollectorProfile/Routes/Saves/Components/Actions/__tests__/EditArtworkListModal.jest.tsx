import { screen, fireEvent, waitFor } from "@testing-library/react"
import { useMutation } from "Utils/Hooks/useMutation"
import {
  EditArtworkListModal,
  EditArtworkListEntity,
} from "Apps/CollectorProfile/Routes/Saves/Components/Actions/EditArtworkListModal"
import { useTracking } from "react-tracking"
import { render } from "DevTools/renderWithMockBoot"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.mock("Utils/Hooks/useMutation")

jest.mock("System/Hooks/useFeatureFlag", () => {
  return {
    useFeatureFlag: jest.fn(),
  }
})

const artworkList: EditArtworkListEntity = {
  internalID: "foobar",
  name: "Foo Bar",
  shareableWithPartners: false,
}

const setup = () => {
  const nameInputField = screen.getByRole("textbox")
  const saveButton = screen.getByRole("button", { name: /Save/ })
  const cancelButton = screen.getByRole("button", { name: /Cancel/ })

  return { nameInputField, saveButton, cancelButton }
}

describe("EditArtworkListModal", () => {
  const mockUseFeatureFlag = useFeatureFlag as jest.Mock
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  let closeEditModal: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    closeEditModal = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })

    mockUseTracking.mockImplementation(() => ({
      trackEvent,
    }))

    mockUseFeatureFlag.mockImplementation(() => true)
  })

  it("renders the modal content", async () => {
    render(
      <EditArtworkListModal
        artworkList={artworkList}
        onClose={closeEditModal}
      />
    )

    expect(screen.getByText("Edit your list")).toBeInTheDocument()
    expect(screen.getByText("Shared list")).toBeInTheDocument()
    expect(screen.getByRole("toggle")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Cancel/ })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Save/ })).toBeInTheDocument()
  })

  it("dismisses when the Cancel button is clicked", async () => {
    render(
      <EditArtworkListModal
        artworkList={artworkList}
        onClose={closeEditModal}
      />
    )
    const { cancelButton } = setup()

    fireEvent.click(cancelButton)

    expect(closeEditModal).toHaveBeenCalled()
  })

  it("calls the mutation when the Save button is clicked", async () => {
    render(
      <EditArtworkListModal
        artworkList={artworkList}
        onClose={closeEditModal}
      />
    )
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
            shareableWithPartners: false,
          },
        },
      })
    )
  })

  it("updates list shareability", async () => {
    render(
      <EditArtworkListModal
        artworkList={artworkList}
        onClose={closeEditModal}
      />
    )
    const { nameInputField, saveButton } = setup()

    fireEvent.change(nameInputField, {
      target: { value: "Foo Bar!" },
    })

    fireEvent.click(screen.getByRole("toggle"))

    fireEvent.click(saveButton)

    await waitFor(() => expect(submitMutation).toHaveBeenCalledTimes(1))

    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            id: "foobar",
            name: "Foo Bar!",
            shareableWithPartners: true,
          },
        },
      })
    )
  })

  it("trims extra whitespace", async () => {
    render(
      <EditArtworkListModal
        artworkList={artworkList}
        onClose={closeEditModal}
      />
    )
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
            shareableWithPartners: false,
          },
        },
      })
    )
  })

  it("prevents empty names", async () => {
    render(
      <EditArtworkListModal
        artworkList={artworkList}
        onClose={closeEditModal}
      />
    )
    const { nameInputField, saveButton } = setup()

    fireEvent.change(nameInputField, {
      target: { value: "   " },
    })

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText("Name cannot be empty")).toBeInTheDocument()
    })
  })

  it("disables Save button until form is dirty", async () => {
    render(
      <EditArtworkListModal
        artworkList={artworkList}
        onClose={closeEditModal}
      />
    )
    const { nameInputField, saveButton } = setup()

    expect(saveButton).toBeDisabled()

    fireEvent.change(nameInputField, {
      target: { value: "Foo Bar!" },
    })

    expect(saveButton).toBeEnabled()
  })

  it("tracks event when artwork list was edited", async () => {
    submitMutation.mockImplementation(() => ({
      updateCollection: {
        responseOrError: {
          __typename: "UpdateCollectionSuccess",
          artworkList: {
            internalID: "artwork-list",
            name: "Custom Artwork List",
          },
        },
      },
    }))

    render(
      <EditArtworkListModal
        artworkList={artworkList}
        onClose={closeEditModal}
      />
    )
    const { nameInputField, saveButton } = setup()

    fireEvent.change(nameInputField, {
      target: { value: "Foo Bar!" },
    })

    fireEvent.click(saveButton)

    await waitFor(() =>
      expect(trackEvent).toHaveBeenLastCalledWith({
        action: "editedArtworkList",
        context_owner_type: "saves",
        owner_id: artworkList.internalID,
      })
    )
  })
})
