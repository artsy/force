import { fireEvent, screen, waitFor } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useMutation } from "Utils/Hooks/useMutation"
import { fetchQuery, graphql } from "react-relay"
import { MyCollectionArtworkSWASection } from "../MyCollectionArtworkSWASection"

const learnMoreMock = jest.fn()
const mockUseFeatureFlag = useFeatureFlag as jest.Mock
const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
;(fetchQuery as jest.Mock).mockImplementation(() => ({
  toPromise: jest
    .fn()
    .mockResolvedValue({ artwork: { title: "Artwork Title" } }),
}))
let submitMutation: jest.Mock

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn(),
}))
jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))
jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("Utils/Hooks/useMutation")

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

        submitMutation = jest.fn(() => ({
          createConsignmentSubmission: {
            consignmentSubmission: { externalId: "submission-id" },
          },
        }))
        ;(useMutation as jest.Mock).mockImplementation(() => {
          return { submitMutation }
        })
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
            '/sell2/submissions/<mock-value-for-field-"internalID">/artist'
          )

          expect(submitMutation).not.toBeCalled()
        })
      })

      describe("when artwork has not not submitted", () => {
        fit("creates a new submission and opens the submission page", async () => {
          renderWithRelay({
            Artwork: () => ({
              consignmentSubmission: null,
            }),
          })

          fireEvent.click(screen.getByTestId("submit-for-sale-link"))

          await waitFor(() => {
            expect(fetchQuery).toHaveBeenCalled()
            expect(submitMutation).toHaveBeenCalledWith({
              variables: {
                input: {
                  artistID: "",
                  attributionClass: "",
                  category: null,
                  depth: "",
                  dimensionsMetric: "in",
                  editionNumber: "",
                  editionSize: undefined,
                  height: "",
                  locationCity: undefined,
                  locationCountry: undefined,
                  locationCountryCode: undefined,
                  locationPostalCode: undefined,
                  locationState: undefined,
                  medium: "",
                  myCollectionArtworkID: '<mock-value-for-field-"internalID">',
                  provenance: "",
                  sessionID: undefined,
                  state: "DRAFT",
                  title: "Artwork Title",
                  width: "",
                  year: "",
                },
              },
            })

            expect(mockPush).toBeCalledWith(
              "/sell2/submissions/submission-id/artist"
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

      fireEvent.click(screen.getByTestId("submit-for-sale-link"))

      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        '/collector-profile/my-collection/submission/artwork-details/<mock-value-for-field-"internalID">'
      )
    })
  })
})
