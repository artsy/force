import { Toasts, ToastsProvider } from "@artsy/palette"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { AdditionalDocumentsRoute_Test_Query$rawResponse } from "__generated__/AdditionalDocumentsRoute_Test_Query.graphql"
import { AdditionalDocumentsRoute } from "Apps/Sell/Routes/AdditionalRoutes/AdditionalDocumentsRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { MockEnvironment, createMockEnvironment } from "relay-test-utils"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

const mockAddAsset = jest.fn()
const mockRemoveAsset = jest.fn()

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

jest.mock("System/Hooks/useSystemContext")
jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))

jest.mock("Components/PhotoUpload/Utils/fileUtils", () => ({
  ...jest.requireActual("Components/PhotoUpload/Utils/fileUtils"),
  uploadSubmissionPhoto: jest.fn(),
}))

jest.mock("Apps/Sell/Utils/uploadUtils", () => ({
  ...jest.requireActual("Apps/Sell/Utils/uploadUtils"),
  uploadDocument: jest.fn().mockResolvedValue("sourceKey"),
}))

jest.mock("Apps/Consign/Routes/SubmissionFlow/Mutations", () => ({
  ...jest.requireActual("Apps/Consign/Routes/SubmissionFlow/Mutations"),
  useRemoveAssetFromConsignmentSubmission: () => ({
    submitMutation: mockRemoveAsset,
  }),
  useAddAssetToConsignmentSubmission: () => ({
    submitMutation: mockAddAsset,
  }),
}))

const submissionMock: Partial<
  AdditionalDocumentsRoute_Test_Query$rawResponse["submission"]
> = {
  externalId: "externalId",
  state: "APPROVED",
  assets: [
    {
      id: "asset-id",
      size: "100",
      filename: "filename",
      documentPath: "signed-s3-url",
      s3Path: "s3-path",
      s3Bucket: "s3-bucket",
    },
  ],
}

let relayEnv: MockEnvironment = createMockEnvironment()

beforeEach(() => {
  ;(useSystemContext as jest.Mock).mockImplementation(() => {
    return { isLoggedIn: true, relayEnvironment: relayEnv }
  })

  mockUseRouter.mockImplementation(() => ({
    router: {
      push: mockPush,
      replace: mockReplace,
    },
    match: {
      location: {
        pathname: "/sell/submissions/submission-id/additional-documents",
      },
    },
  }))

  //@ts-ignore
  jest.spyOn(global, "FileReader").mockImplementation(function () {
    this.readAsDataURL = jest.fn()
  })
  mockAddAsset.mockResolvedValue({
    addAssetToConsignmentSubmission: {
      asset: {
        id: 1,
      },
    },
  })
  mockRemoveAsset.mockImplementation(() => Promise.resolve())
  ;(useFeatureFlag as jest.Mock).mockImplementation(
    (featureName: string) =>
      featureName === "onyx_post_approval_submission_flow"
  )
})

afterEach(() => {
  mockAddAsset.mockReset()
  mockRemoveAsset.mockReset()
  relayEnv.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <ToastsProvider>
        <Toasts />
        <SubmissionRoute submission={props.submission}>
          <AdditionalDocumentsRoute submission={props.submission} />
        </SubmissionRoute>
      </ToastsProvider>
    )
  },
  query: graphql`
    query AdditionalDocumentsRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...SubmissionRoute_submission
        ...AdditionalDocumentsRoute_submission
      }
    }
  `,
})

describe("AdditionalDocumentsRoute", () => {
  it("renders the Additional Documents step", () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(screen.getByText("Additional Documents")).toBeInTheDocument()
    expect(
      screen.getByText(
        /Please add any of the following if you have them: Proof of Purchase, Certificate of Authentication, Fact Sheet, Condition Report/
      )
    ).toBeInTheDocument()

    expect(screen.getByText("Continue")).toBeInTheDocument()
    expect(screen.getByText("Back")).toBeInTheDocument()
    expect(screen.getByText("Save & Exit")).toBeInTheDocument()
  })

  it("initializes the form with documents", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(screen.getAllByTestId("document-preview-item").length).toEqual(1)
  })

  it("allows to upload documents", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    fireEvent.change(screen.getByTestId("file-dropzone-input"), {
      target: {
        files: [
          {
            name: "foo.png",
            path: "foo.png",
            type: "image/png",
            size: 200,
          },
          {
            name: "file.pdf",
            path: "file.pdf",
            type: "application/pdf",
            size: 200,
          },
        ],
      },
    })

    await waitFor(() => {
      expect(screen.getAllByTestId("document-preview-item").length).toEqual(3)
    })

    await waitFor(() => {
      expect(mockAddAsset).toHaveBeenCalled()
    })
  })

  it("allows to remove document", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(screen.getAllByTestId("document-preview-item").length).toEqual(1)

    fireEvent.click(screen.getByTestId("delete-document-thumbnail"))

    await waitFor(() => {
      expect(screen.queryAllByTestId("document-preview-item").length).toEqual(0)
      expect(mockRemoveAsset).toHaveBeenCalled()
    })
  })

  describe("error messages", () => {
    it("file size exceeds 300MB limit", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMock,
      })

      fireEvent.change(screen.getByTestId("file-dropzone-input"), {
        target: {
          files: [
            {
              name: "foo.png",
              path: "foo.png",
              type: "image/png",
              size: 32 * 1024 * 1024 * 10,
            },
          ],
        },
      })

      await waitFor(() => {
        expect(
          screen.getByText(
            "Whoa, you've reached the size limit! Please delete or upload smaller files."
          )
        ).toBeInTheDocument()
      })
    })

    it("invalid file format", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMock,
      })

      fireEvent.change(screen.getByTestId("file-dropzone-input"), {
        target: {
          files: [
            {
              name: "foo.idk",
              path: "foo.idk",
              type: "something/unknown",
              size: 200,
            },
          ],
        },
      })

      await waitFor(() => {
        expect(
          screen.getByText(
            "File format not supported. Please upload images (JPG, PNG or HEIC) or PDF or Microsoft Office files."
          )
        ).toBeInTheDocument()
      })
    })
  })

  describe("navigation", () => {
    describe("in APPROVED state", () => {
      it("navigates to next step when the Continue button is clicked", async () => {
        renderWithRelay({
          ConsignmentSubmission: () => ({
            ...submissionMock,
            state: "APPROVED",
          }),
        })

        mockPush.mockClear()

        screen.getByText("Continue").click()

        await waitFor(() => {
          expect(mockPush).toHaveBeenCalledWith(
            "/sell/submissions/externalId/condition"
          )
        })
      })
    })
  })
})
