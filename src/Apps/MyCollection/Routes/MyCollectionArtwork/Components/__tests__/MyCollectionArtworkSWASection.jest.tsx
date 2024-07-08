import { fireEvent, screen, waitFor } from "@testing-library/react"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import { MyCollectionArtworkSWASection } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASection"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useRouter } from "System/Hooks/useRouter"
import { graphql } from "react-relay"

const learnMoreMock = jest.fn()
const mockUseFeatureFlag = useFeatureFlag as jest.Mock
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
jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <MyCollectionArtworkSWASection
        artwork={props.artwork}
        learnMore={learnMoreMock}
      />
    )
  },
  query: graphql`
    query MyCollectionArtworkSWASection_Test_Query @raw_response_type {
      artwork(id: "artwork-id") {
        ...MyCollectionArtworkSWASection_artwork
      }
    }
  `,
})

describe("MyCollection Artwork SWA Section", () => {
  describe("when onyx_new_submission_flow feature flag is enabled", () => {
    beforeEach(() => {
      mockUseFeatureFlag.mockImplementation(() => true)
    })

    describe("submit for sale", () => {
      beforeEach(() => {
        mockUseRouter.mockImplementation(() => ({
          router: {
            push: mockPush,
          },
        }))
      })

      describe("when artwork is already submitted", () => {
        it("opens the submission page and does not create a new submission", async () => {
          renderWithRelay({
            Artwork: () => ({
              consignmentSubmission: { submissionId: "submission-id" },
            }),
          })

          fireEvent.click(screen.getByTestId("submit-for-sale-link"))

          expect(mockPush).toBeCalledWith(
            '/sell/submissions/<mock-value-for-field-"internalID">/artist'
          )

          expect(createOrUpdateConsignSubmission).not.toBeCalled()
        })
      })

      describe("when artwork has not not submitted", () => {
        it("creates a new submission and opens the submission page", async () => {
          renderWithRelay({
            Artwork: () => ({
              consignmentSubmission: null,
            }),
          })

          fireEvent.click(screen.getByTestId("submit-for-sale-link"))

          await waitFor(() => {
            expect(createOrUpdateConsignSubmission).toHaveBeenCalled()

            expect(mockPush).toBeCalledWith(
              "/sell/submissions/submission-id/artist"
            )
          })
        })
      })
    })

    it("opens Modal when Learn More is pressed", async () => {
      renderWithRelay()

      fireEvent.click(screen.getByTestId("learn-more"))

      expect(learnMoreMock).toBeCalled()
    })
  })

  describe("when onyx_new_submission_flow feature flag is disabled", () => {
    beforeEach(() => {
      mockUseFeatureFlag.mockImplementation(() => false)
    })

    it("opens Modal when Learn More is pressed", async () => {
      renderWithRelay()

      fireEvent.click(screen.getByTestId("learn-more"))
      expect(learnMoreMock).toBeCalled()
    })

    it("the link has right attributes", async () => {
      renderWithRelay()

      expect(screen.getByTestId("submit-for-sale-link")).toBeInTheDocument()
    })
  })
})
