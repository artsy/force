import { screen, fireEvent, waitFor } from "@testing-library/react"
import { useMutation } from "Utils/Hooks/useMutation"
import { useSystemContext } from "System/SystemContext"
import { render } from "DevTools/renderWithMockBoot"
import { OfferSettingsModal } from "Apps/CollectorProfile/Routes/Saves/Components/OfferSettingsModal/OfferSettingsModal"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"
import { createMockEnvironment } from "relay-test-utils"

jest.mock("Utils/Hooks/useMutation")
jest.mock("System/useSystemContext")
jest.unmock("react-relay")

const relayEnv = createMockEnvironment()

describe("OfferSettingsModal", () => {
  const mockUseSystemContext = useSystemContext as jest.Mock

  let onClose: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    onClose = jest.fn()
    submitMutation = jest.fn()
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })

    mockUseSystemContext.mockImplementation(() => ({
      relayEnvironment: relayEnv,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the modal content", async () => {
    render(<OfferSettingsModal me={mockedMe} onClose={onClose} />)

    const title = screen.getByText("Offer settings")
    const description = screen.getByText(
      "Shared lists are eligible to receive offers from galleries. Switching sharing off will make them visible only to you, and you won't receive offers."
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Save Changes/ })
    ).toBeInTheDocument()
  })

  it.skip("calls the mutation when the Save button is clicked", async () => {
    render(
      <OfferSettingsModal
        me={(mockedMe as unknown) as CollectorProfileSavesRoute_me$data}
        onClose={onClose}
      />
    )

    const saveButton = screen.getByRole("button", { name: /Save/ })

    fireEvent.click(saveButton)

    await waitFor(() => expect(submitMutation).toHaveBeenCalledTimes(1))

    expect(submitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            attributes: [
              { id: "collection-one-id", shareableWithPartners: false },
              { id: "collection-two-id", shareableWithPartners: true },
              { id: "saved-artwork", shareableWithPartners: false },
            ],
          },
        },
      })
    )
  })
})

const mockedMe = ({
  $fragmentRefs: {
    customArtworkLists: {
      edges: [
        {
          node: {
            internalID: "collection-one-id",
            shareableWithPartners: false,
          },
        },
        {
          node: {
            internalID: "collection-two-id",
            shareableWithPartners: true,
          },
        },
      ],
    },
    savedArtworksArtworkList: {
      internalID: "saved-artwork",
      shareableWithPartners: false,
    },
  },
} as unknown) as CollectorProfileSavesRoute_me$data
