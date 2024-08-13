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

  describe("when artwork is submitted", () => {
    it("renders the submission status section", () => {
      renderWithRelay({
        Artwork: () => ({
          consignmentSubmission: {
            state: "DRAFT",
            actionLabel: "action-label",
            stateHelpMessage: "state-helper-message",
            buttonLabel: "button-label",
          },
          listedArtworksConnection: null,
        }),
      })

      expect(screen.getByText("Submission Status")).toBeInTheDocument()
      expect(screen.getByText("action-label")).toBeInTheDocument()
      expect(screen.getByText("state-helper-message")).toBeInTheDocument()
    })
  })

  describe("when artwork is listed", () => {
    it("renders the submission status section", () => {
      renderWithRelay({
        Artwork: () => ({
          listedArtworksConnection: {
            edges: [
              {
                node: {
                  internalID: "listed-artwork-id",
                },
              },
            ],
          },
        }),
      })

      expect(screen.getByText("Submission Status")).toBeInTheDocument()
      expect(screen.getByText("View Listing")).toBeInTheDocument()
      expect(
        screen.getByText("Your artwork has been successfully listed on Artsy.")
      ).toBeInTheDocument()
      expect(screen.getByText("Listed")).toBeInTheDocument()
    })
  })

  describe("when artwork is not submitted", () => {
    it("does not render the submission status", () => {
      renderWithRelay({
        Artwork: () => ({
          consignmentSubmission: null,
          listedArtworksConnection: null,
        }),
      })

      expect(screen.queryByText("Submission Status")).not.toBeInTheDocument()
    })
  })
})
