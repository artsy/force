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
    describe("state: 'draft'", () => {
      it("renders title and description", () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: { state: "DRAFT" },
          }),
        })

        expect(screen.getByText("Submission Status")).toBeInTheDocument()
        expect(screen.getAllByText("Complete Submission")).toHaveLength(2)
        expect(
          screen.getByText(
            "You’ve started a submission to sell with Artsy but have not yet completed it."
          )
        ).toBeInTheDocument()
      })
    })

    describe("state: 'submitted'", () => {
      it("renders title and description", () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: {
              state: "SUBMITTED",
              stateLabel: "state-label",
            },
          }),
        })

        expect(screen.getByText("Submission Status")).toBeInTheDocument()
        expect(screen.getByText("state-label")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Your submission is currently being reviewed by our team. You will receive a response within 3 to 5 days."
          )
        ).toBeInTheDocument()
        expect(screen.getByText("Edit Submission")).toBeInTheDocument()
      })
    })
    describe("state: 'approved'", () => {
      it("renders title and description", () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: {
              state: "APPROVED",
              stateLabel: "state-label",
            },
          }),
        })

        expect(screen.getByText("Submission Status")).toBeInTheDocument()
        expect(screen.getByText("Approved")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Congratulations, your submission has been approved. Please provide additional information so we can list your work and match it with the best selling opportunity."
          )
        ).toBeInTheDocument()
        expect(screen.getByText("Complete Listing")).toBeInTheDocument()
      })
    })
    describe("state: 'published'", () => {
      it("renders title and description", () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: {
              state: "PUBLISHED",
              stateLabel: "state-label",
            },
          }),
        })

        expect(screen.getByText("Submission Status")).toBeInTheDocument()
        expect(screen.getByText("state-label")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Your artwork has been successfully listed on Artsy."
          )
        ).toBeInTheDocument()
        expect(screen.getByText("View Listing")).toBeInTheDocument()
      })
    })
    describe("state: 'rejected'", () => {
      it("renders title and description", () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: {
              state: "REJECTED",
              stateLabel: "state-label",
            },
          }),
        })

        expect(screen.getByText("Submission Status")).toBeInTheDocument()
        expect(screen.getByText("state-label")).toBeInTheDocument()
        expect(screen.getByText("submission criteria")).toBeInTheDocument()
      })
    })
    describe("state: 'hold'", () => {
      it("does not render", () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: {
              state: "HOLD",
              stateLabel: "state-label",
            },
          }),
        })

        expect(screen.queryByText("Submission Status")).not.toBeInTheDocument()
      })
    })
    describe("state: 'closed'", () => {
      it("does not render", () => {
        renderWithRelay({
          Artwork: () => ({
            consignmentSubmission: {
              state: "CLOSED",
              stateLabel: "state-label",
            },
          }),
        })

        expect(screen.queryByText("Submission Status")).not.toBeInTheDocument()
      })
    })

    // it("opens the submission page and does not create a new submission", async () => {
    //   renderWithRelay({
    //     Artwork: () => ({
    //       consignmentSubmission: { submissionId: "submission-id" },
    //     }),
    //   })

    //   fireEvent.click(screen.getByTestId("submit-for-sale-link"))

    //   expect(mockPush).toBeCalledWith(
    //     '/sell/submissions/<mock-value-for-field-"internalID">/artist'
    //   )

    //   expect(createOrUpdateConsignSubmission).not.toBeCalled()
    // })
  })

  // describe("when artwork has not not submitted", () => {
  //   it("creates a new submission and opens the submission page", async () => {
  //     renderWithRelay({
  //       Artwork: () => ({
  //         consignmentSubmission: null,
  //       }),
  //     })

  //     fireEvent.click(screen.getByTestId("submit-for-sale-link"))

  //     await waitFor(() => {
  //       expect(createOrUpdateConsignSubmission).toHaveBeenCalled()

  //       expect(mockPush).toBeCalledWith(
  //         "/sell/submissions/submission-id/artist"
  //       )
  //     })
  //   })
  // })
})
