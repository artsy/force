import { screen } from "@testing-library/react"
import { MyCollectionArtworkSWASubmissionStatus } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASubmissionStatus"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { graphql } from "react-relay"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()

jest.unmock("react-relay")
jest.mock(
  "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission",
  () => ({
    ...jest.requireActual(
      "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
    ),
    createOrUpdateConsignSubmission: jest
      .fn()
      .mockResolvedValue("submission-id"),
  })
)
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <MyCollectionArtworkSWASubmissionStatus artwork={props.artwork} />
  },
  query: graphql`
    query MyCollectionArtworkSWASubmissionStatus_Test_Query @raw_response_type {
      artwork(id: "artwork-id") {
        ...MyCollectionArtworkSWASubmissionStatus_artwork
      }
    }
  `,
})

describe("MyCollection Artwork SWA Submission Status", () => {
  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      router: {
        push: mockPush,
      },
    }))
  })

  describe("when artwork is already submitted", () => {
    it("renders title and description", () => {
      renderWithRelay({
        Artwork: () => ({
          consignmentSubmission: {
            state: "DRAFT",
            actionLabel: "action-label",
            stateHelpMessage: "state-helper-message",
            buttonLabel: "button-label",
          },
        }),
      })

      expect(screen.getByText("Submission Status")).toBeInTheDocument()
      expect(screen.getByText("action-label")).toBeInTheDocument()
      expect(screen.getByText("state-helper-message")).toBeInTheDocument()
    })
  })
})
