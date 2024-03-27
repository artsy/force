import { screen, act } from "@testing-library/react"
import { useMutation } from "Utils/Hooks/useMutation"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/SystemContext"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"
import { render } from "DevTools/renderWithMockBoot"
import { EditListPrivacyModal } from "Apps/CollectorProfile/Routes/Saves/Components/EditListPrivacyModal/EditListPrivacyModal"
import { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"

jest.mock("Utils/Hooks/useMutation")
jest.mock("System/useSystemContext")
jest.unmock("react-relay")

const relayEnv = createMockEnvironment()
const resolveMostRecentOperation = () => {
  act(() => {
    relayEnv.mock.resolveMostRecentOperation(operation => {
      return MockPayloadGenerator.generate(operation, {
        Me: () => mockedMe,
      })
    })
  })
}

describe("EditListPrivacyModal", () => {
  const mockUseTracking = useTracking as jest.Mock
  const mockUseSystemContext = useSystemContext as jest.Mock
  const trackEvent = jest.fn()

  let onClose: jest.Mock
  let submitMutation: jest.Mock

  beforeEach(() => {
    onClose = jest.fn()
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the modal content", async () => {
    render(<EditListPrivacyModal me={mockedMe} onClose={onClose} />)

    const title = screen.getByText("Offer settings")
    expect(title).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Save Changes/ })
    ).toBeInTheDocument()
  })
})

const mockedMe: CollectorProfileSavesRoute_me$data = {
  $fragmentRefs: {
    customArtworkLists: {
      edges: [
        {
          node: {
            internalID: "collection-one-id",
            name: "Collection One",
          },
        },
        {
          node: {
            internalID: "collection-two-id",
            name: "Collection Two",
          },
        },
      ],
    },
    savedArtworksArtworkList: {
      internalID: "saved-artwork",
      name: "Saved Artworks",
    },
  },
  id: "123",
  name: "Example Name",
}
