import { graphql } from "relay-runtime"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { UploadPhotosFragmentContainer } from "../UploadPhotos"
import { SystemContextProvider } from "v2/System"
import { MBSize, uploadPhoto } from "../../Utils/fileUtils"
import { fireEvent, screen, waitFor } from "@testing-library/react"

jest.unmock("react-relay")

const mockRouterPush = jest.fn()
jest.mock("v2/System/Router/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return {
        router: { push: mockRouterPush },
      }
    }),
  }
})

jest.mock("../../Utils/fileUtils", () => ({
  ...jest.requireActual("../../Utils/fileUtils"),
  uploadPhoto: jest.fn(),
}))

const mockAddAsset = jest.fn()
const mockRemoveAsset = jest.fn()

jest.mock("../../Mutations", () => ({
  ...jest.requireActual("../../Mutations"),
  useRemoveAssetFromConsignmentSubmission: () => ({
    submitMutation: mockRemoveAsset,
  }),
  useAddAssetToConsignmentSubmission: () => ({
    submitMutation: mockAddAsset,
  }),
}))

const mockUploadPhoto = uploadPhoto as jest.Mock

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    return (
      <SystemContextProvider>
        <UploadPhotosFragmentContainer {...props} />
      </SystemContextProvider>
    )
  },
  query: graphql`
    query UploadPhotos_SubmissionFlowTest_Query($id: ID!)
      @relay_test_operation {
      submission(id: $id) {
        ...UploadPhotos_submission
      }
    }
  `,
  variables: {
    id: "1",
  },
})

const submission = {
  id: "1",
  assets: [],
}

describe("UploadPhotos", () => {
  beforeEach(() => {
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
  })

  it("renders correct", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submission,
    })

    expect(
      screen.getByText("Upload photos of your artwork")
    ).toBeInTheDocument()
    expect(screen.getByText("Back")).toBeInTheDocument()

    expect(
      screen.getAllByRole("link").find(c => c.textContent?.includes("Back"))
    ).toHaveAttribute("href", "/consign/submission/1/artwork-details")
    expect(screen.getByText("Save and Continue")).toBeInTheDocument()
  })

  it.each([
    ["foo.png", "image/png"],
    ["foo.jpg", "image/jpeg"],
    ["foo.jpeg", "image/jpeg"],
  ])("shows uploaded image name for %s", async (name, type) => {
    renderWithRelay({
      ConsignmentSubmission: () => submission,
    })

    fireEvent.change(screen.getByTestId("image-dropzone-input"), {
      target: {
        files: [
          {
            name: name,
            path: name,
            type: type,
            size: 20000,
          },
        ],
      },
    })

    await waitFor(() => {
      expect(screen.getByText("0.02 MB")).toBeInTheDocument()
      expect(screen.getByText(name)).toBeInTheDocument()
      expect(screen.getAllByTestId("photo-thumbnail").length).toEqual(1)
    })
  })

  it("uploads few files correctly", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submission,
    })

    fireEvent.change(screen.getByTestId("image-dropzone-input"), {
      target: {
        files: [
          {
            name: "foo.png",
            path: "foo.png",
            type: "image/png",
            size: 400,
          },
          {
            name: "bar.png",
            path: "bar.png",
            type: "image/png",
            size: 400,
          },
        ],
      },
    })

    await waitFor(() => {
      expect(screen.getByText("foo.png")).toBeInTheDocument()
      expect(screen.getByText("bar.png")).toBeInTheDocument()
      expect(screen.getAllByTestId("photo-thumbnail").length).toEqual(2)
    })
  })

  it("correctly remove image", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submission,
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
        ],
      },
    })

    await waitFor(() => {
      expect(screen.queryByText("foo.png")).toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId("delete-photo-thumbnail"))

    await waitFor(() => {
      expect(screen.queryByText("foo.png")).not.toBeInTheDocument()
      expect(mockRemoveAsset).toHaveBeenCalled()
    })
  })

  it("prepopulates images from server", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => ({
        ...submission,
        assets: [
          {
            id: "id",
            imageUrls: {},
            geminiToken: "geminiToken",
            size: "111084",
            filename: "foo.png",
          },
        ],
      }),
    })

    expect(screen.getAllByTestId("photo-thumbnail").length).toEqual(1)
  })

  it("saves image", async () => {
    renderWithRelay({
      ConsignmentSubmission: () => submission,
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
        ],
      },
    })

    await waitFor(() => {
      expect(screen.getAllByTestId("photo-thumbnail").length).toEqual(1)
    })

    fireEvent.click(screen.getByText("Save and Continue"))

    await waitFor(() => {
      expect(mockAddAsset).toHaveBeenCalled()
      expect(mockRouterPush).toHaveBeenCalled()
      expect(mockRouterPush).toHaveBeenCalledWith({
        pathname: "/consign/submission/1/contact-information",
      })
    })
  })

  describe("show error message", () => {
    it("if an image could not be uploaded", async () => {
      mockUploadPhoto.mockRejectedValueOnce("rejected")

      renderWithRelay({
        ConsignmentSubmission: () => submission,
      })

      fireEvent.change(screen.getByTestId("image-dropzone-input"), {
        target: {
          files: [
            {
              name: "foo.png",
              path: "foo.png",
              type: "image/png",
              size: 40 * MBSize,
            },
          ],
        },
      })

      await waitFor(() => {
        expect(screen.getAllByTestId("photo-thumbnail-error").length).toEqual(1)
      })
    })

    it("if uploading too big file", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submission,
      })

      fireEvent.change(screen.getByTestId("image-dropzone-input"), {
        target: {
          files: [
            {
              name: "foo.png",
              path: "foo.png",
              type: "image/png",
              size: 40 * MBSize,
            },
          ],
        },
      })

      await waitFor(() => {
        expect(screen.getAllByTestId("photo-thumbnail-error").length).toEqual(1)
        expect(screen.getByTestId("photo-thumbnail-error")).toHaveTextContent(
          "Whoa, you've reached the size limit! Please delete or upload smaller files."
        )
      })
    })

    it("if uploading wrong file type", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submission,
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
        expect(screen.getAllByTestId("photo-thumbnail-error").length).toEqual(1)
        expect(screen.getByTestId("photo-thumbnail-error")).toHaveTextContent(
          "File format not supported. Please upload JPG or PNG files."
        )
      })
    })

    it("if uploading wrong file type with too big size", async () => {
      renderWithRelay({
        ConsignmentSubmission: () => submission,
      })

      fireEvent.change(screen.getByTestId("image-dropzone-input"), {
        target: {
          files: [
            {
              name: "foo.pdf",
              path: "foo.pdf",
              type: "application/pdf",
              size: 40 * MBSize,
            },
          ],
        },
      })

      await waitFor(() => {
        expect(screen.getAllByTestId("photo-thumbnail-error").length).toEqual(1)
        expect(screen.getByTestId("photo-thumbnail-error")).toHaveTextContent(
          "File format not supported. Please upload JPG or PNG files."
        )
      })
    })

    describe("remove error message", () => {
      it("if new uploading starts", async () => {
        renderWithRelay({
          ConsignmentSubmission: () => submission,
        })

        fireEvent.change(screen.getByTestId("image-dropzone-input"), {
          target: {
            files: [
              {
                name: "foo.png",
                path: "foo.png",
                type: "image/png",
                size: 40 * MBSize,
              },
            ],
          },
        })

        fireEvent.change(screen.getByTestId("image-dropzone-input"), {
          target: {
            files: [
              {
                name: "foo.png",
                path: "foo.png",
                type: "image/png",
                size: 2 * MBSize,
              },
            ],
          },
        })

        await waitFor(() => {
          expect(
            screen.queryByTestId("photo-thumbnail-error")
          ).not.toBeInTheDocument()
          expect(screen.getAllByTestId("photo-thumbnail").length).toEqual(1)
        })
      })
    })
  })
})
