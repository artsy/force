import { Toasts, ToastsProvider } from "@artsy/palette"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { PhotosRoute } from "Apps/Sell/Routes/PhotosRoute"
import { SubmissionRoute } from "Apps/Sell/Routes/SubmissionRoute"
import { uploadSubmissionPhoto } from "Components/PhotoUpload/Utils/fileUtils"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { PhotosRoute_Test_Query$rawResponse } from "__generated__/PhotosRoute_Test_Query.graphql"
import { graphql } from "react-relay"
import { MockEnvironment, createMockEnvironment } from "relay-test-utils"

const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()

const mockUploadPhoto = uploadSubmissionPhoto as jest.Mock
const mockAddAsset = jest.fn()
const mockRemoveAsset = jest.fn()

jest.mock("System/Hooks/useSystemContext")
jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))

jest.mock("Components/PhotoUpload/Utils/fileUtils", () => ({
  ...jest.requireActual("Components/PhotoUpload/Utils/fileUtils"),
  uploadSubmissionPhoto: jest.fn(),
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
  PhotosRoute_Test_Query$rawResponse["submission"]
> = {
  externalId: "externalId",
  assets: [
    {
      id: "asset-id",
      size: "100",
      filename: "filename",
      geminiToken: "geminiToken",
      imageUrls: {
        thumbnail: "thumbnail",
        square: "square",
      },
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
    match: { location: { pathname: "submissions/submission-id/photos" } },
  }))

  //@ts-ignore
  jest.spyOn(global, "FileReader").mockImplementation(function () {
    this.readAsDataURL = jest.fn()
  })
  mockUploadPhoto.mockResolvedValue("geminiToken")
  mockAddAsset.mockResolvedValue({
    addAssetToConsignmentSubmission: {
      asset: {
        id: 1,
      },
    },
  })
  mockRemoveAsset.mockImplementation(() => Promise.resolve())
})

afterEach(() => {
  mockUploadPhoto.mockReset()
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
          <PhotosRoute submission={props.submission} />
        </SubmissionRoute>
      </ToastsProvider>
    )
  },
  query: graphql`
    query PhotosRoute_Test_Query @raw_response_type {
      submission(id: "submission-id") {
        ...SubmissionRoute_submission
        ...PhotosRoute_submission
      }
    }
  `,
})

describe("PhotosRoute", () => {
  it("renders the Upload Photos step", () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(
      screen.getByText("Upload photos of your artwork")
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Make your work stand out and get your submission evaluated faster by uploading high-quality photos of the work's front and back./
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "Tips for taking photos." })
    ).toHaveAttribute(
      "href",
      "https://help.artsy.net/s/article/How-to-Take-Photos-That-Sell"
    )
    expect(screen.getByText("Continue")).toBeInTheDocument()
    expect(screen.getByText("Back")).toBeInTheDocument()
    expect(screen.getByText("Save & Exit")).toBeInTheDocument()
  })

  it("initializes the form with images", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(screen.getAllByTestId("image-preview-item").length).toEqual(1)
  })

  describe("'Increase your chance of selling' message", () => {
    it("displays 'Increase your chance of selling' message when 1 or 2 photos are uploaded", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMock,
      })

      expect(
        screen.getByText("Increase your chance of selling")
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          "Make sure to include images of the back, corners, frame and any other details if you can."
        )
      ).toBeInTheDocument()
    })

    it("doesn't display 'Increase your chance of selling' message when 0 photos are uploaded", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => ({
          externalId: "externalId",
          myCollectionArtwork: {
            id: "id",
            images: [],
          },
          assets: [],
        }),
      })

      expect(
        screen.queryByText("Increase your chance of selling")
      ).not.toBeInTheDocument()
    })
  })

  it("allows to upload assets and images", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    fireEvent.change(screen.getByTestId("image-dropzone-input"), {
      target: {
        files: [
          {
            name: "foo.png",
            path: "foo.png",
            type: "image/png",
            size: 200,
          },
          {
            name: "foo.jpg",
            path: "foo.jpg",
            type: "image/jpeg",
            size: 200,
          },
        ],
      },
    })

    await waitFor(() => {
      expect(screen.getAllByTestId("image-preview-item").length).toEqual(3)
    })

    await waitFor(() => {
      expect(mockAddAsset).toHaveBeenCalled()
    })
  })

  it("allows to remove image", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submissionMock,
    })

    expect(screen.getAllByTestId("image-preview-item").length).toEqual(1)

    fireEvent.click(screen.getByTestId("delete-photo-thumbnail"))

    await waitFor(() => {
      expect(screen.queryAllByTestId("image-preview-item").length).toEqual(0)
      expect(mockRemoveAsset).toHaveBeenCalled()
    })
  })

  describe("error messages", () => {
    it("file size exceeds 30MB limit", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMock,
      })

      fireEvent.change(screen.getByTestId("image-dropzone-input"), {
        target: {
          files: [
            {
              name: "foo.png",
              path: "foo.png",
              type: "image/png",
              size: 32 * 1024 * 1024,
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

      fireEvent.change(screen.getByTestId("image-dropzone-input"), {
        target: {
          files: [
            {
              name: "foo.pdf",
              path: "foo.pdf",
              type: "application/pdf",
              size: 200,
            },
          ],
        },
      })

      await waitFor(() => {
        expect(
          screen.getByText(
            "File format not supported. Please upload JPG, PNG or HEIC files."
          )
        ).toBeInTheDocument()
      })
    })
  })

  describe("navigation", () => {
    it("navigates to the details step when Continue button is clicked", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMock,
      })

      screen.getByText("Continue").click()

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(
          "/sell/submissions/externalId/details"
        )
      })
    })

    it("navigates to the previous step when the back button is clicked", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submissionMock,
      })

      screen.getByText("Back").click()

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(
          "/sell/submissions/externalId/title"
        )
      })
    })
  })
})
