import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"

import { useMutation } from "Utils/Hooks/useMutation"
import { AddArtworksModal } from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal/AddArtworksModal"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/SystemContext"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.mock("Utils/Hooks/useMutation")
jest.mock("System/useSystemContext")
jest.unmock("react-relay")

describe("AddArtworksModal", () => {
  const mockUseTracking = useTracking as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock
  const trackEvent = jest.fn()
  const relayEnv = createMockEnvironment()

  let onComplete: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    onComplete = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })

    mockUseTracking.mockImplementation(() => ({
      trackEvent,
    }))

    mockUseSystemContext.mockImplementation(() => ({
      relayEnvironment: relayEnv,
    }))
  })

  it("renders the modal content", async () => {
    render(
      <AddArtworksModal artworkList={artworkList} onComplete={onComplete} />
    )

    const title = screen.getByText(
      "Sculpture created. Add saved works to the list."
    )
    expect(title).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Save/ })).toBeInTheDocument()
  })

  it("calls the mutation when the Save button is clicked", async () => {
    render(
      <AddArtworksModal artworkList={artworkList} onComplete={onComplete} />
    )

    const saveButton = screen.getByRole("button", { name: /Save/ })
    fireEvent.click(saveButton)

    await waitFor(() => expect(submitMutation).toHaveBeenCalledTimes(1))

    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            artworkIDs: [],
            addToCollectionIDs: ["artwork-list-one"],
          },
        },
      })
    )
  })

  describe("Analytics", () => {
    const resolveMostRecentOperation = () => {
      act(() => {
        relayEnv.mock.resolveMostRecentOperation(operation => {
          return MockPayloadGenerator.generate(operation, {
            Me: () => mockedMe,
          })
        })
      })
    }

    it("doesn't track event if no artworks are selected", async () => {
      submitMutation.mockImplementation(() => ({
        artworksCollectionsBatchUpdate: {
          responseOrError: {
            addedToCollections: [artworkList],
          },
        },
      }))

      render(
        <AddArtworksModal artworkList={artworkList} onComplete={onComplete} />
      )

      resolveMostRecentOperation()

      fireEvent.click(screen.getByText("Save"))

      await flushPromiseQueue()
      expect(trackEvent).not.toHaveBeenCalled()
    })

    it("tracks event when one artwork is selected", async () => {
      submitMutation.mockImplementation(() => ({
        artworksCollectionsBatchUpdate: {
          responseOrError: {
            addedToCollections: [artworkList],
          },
        },
      }))

      render(
        <AddArtworksModal artworkList={artworkList} onComplete={onComplete} />
      )

      resolveMostRecentOperation()

      fireEvent.click(screen.getByText("Artwork #1"))
      fireEvent.click(screen.getByText("Save"))

      await waitFor(() =>
        expect(trackEvent).toHaveBeenLastCalledWith({
          action: "addedArtworkToArtworkList",
          context_owner_type: "saves",
          artwork_ids: ["artwork-id-one"],
          owner_ids: [artworkList.internalID],
        })
      )
    })

    it("tracks event when multiple artworks are selected", async () => {
      submitMutation.mockImplementation(() => ({
        artworksCollectionsBatchUpdate: {
          responseOrError: {
            addedToCollections: [artworkList],
          },
        },
      }))

      render(
        <AddArtworksModal artworkList={artworkList} onComplete={onComplete} />
      )

      resolveMostRecentOperation()

      fireEvent.click(screen.getByText("Artwork #1"))
      fireEvent.click(screen.getByText("Artwork #2"))
      fireEvent.click(screen.getByText("Save"))

      await waitFor(() =>
        expect(trackEvent).toHaveBeenLastCalledWith({
          action: "addedArtworkToArtworkList",
          context_owner_type: "saves",
          artwork_ids: ["artwork-id-one", "artwork-id-two"],
          owner_ids: [artworkList.internalID],
        })
      )
    })
  })
})

const mockedMe = {
  collection: {
    artworksConnection: {
      edges: [
        {
          node: {
            title: "Artwork #1",
            internalID: "artwork-id-one",
          },
        },
        {
          node: {
            title: "Artwork #2",
            internalID: "artwork-id-two",
          },
        },
      ],
    },
  },
}

const artworkList = {
  internalID: "artwork-list-one",
  name: "Sculpture",
}
