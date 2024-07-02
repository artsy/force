import { fireEvent, screen, waitFor } from "@testing-library/react"
import { UploadPhotosFragmentContainer } from "Apps/Consign/Routes/SubmissionFlow/UploadPhotos/UploadPhotos"
import {
  MBSize,
  uploadSubmissionPhoto,
} from "Components/PhotoUpload/Utils/fileUtils"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fetchQuery, graphql } from "react-relay"
import { createMockEnvironment, MockEnvironment } from "relay-test-utils"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { useSystemContext } from "System/Hooks/useSystemContext"

jest.unmock("react-relay")

const mockRouterPush = jest.fn()
const mockRouterReplace = jest.fn()
jest.mock("System/Hooks/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return {
        router: { push: mockRouterPush, replace: mockRouterReplace },
      }
    }),
  }
})

jest.mock("Components/PhotoUpload/Utils/fileUtils", () => ({
  ...jest.requireActual("Components/PhotoUpload/Utils/fileUtils"),
  uploadSubmissionPhoto: jest.fn(),
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

const mockUploadPhoto = uploadSubmissionPhoto as jest.Mock

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  fetchQuery: jest.fn().mockResolvedValue({
    submission: {
      assets: [
        {
          id: "id",
          imageUrls: { thumbnail: "foo.png" },
          geminiToken: "geminiToken",
          size: "111084",
          filename: "foo.png",
        },
      ],
    },
  }),
}))

const mockFetchQuery = fetchQuery as jest.Mock
const mockShowAuthDialog = jest.fn()
jest.mock("Components/AuthDialog", () => ({
  useAuthDialog: jest.fn(() => ({
    showAuthDialog: mockShowAuthDialog,
  })),
}))

jest.mock("System/Hooks/useSystemContext")
let relayEnv: MockEnvironment = createMockEnvironment()

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    return (
      <SystemContextProvider>
        <UploadPhotosFragmentContainer {...props} />
      </SystemContextProvider>
    )
  },
  query: graphql`
    query UploadPhotos_SubmissionFlowTest_Query($externalId: ID)
      @relay_test_operation {
      submission(externalId: $externalId) {
        ...UploadPhotos_submission
      }
    }
  `,
  variables: {
    externalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
  },
})

const { renderWithRelay: renderWithRelayMyCollection } = setupTestWrapperTL({
  Component: props => {
    return (
      <SystemContextProvider>
        <UploadPhotosFragmentContainer {...props} />
      </SystemContextProvider>
    )
  },
  query: graphql`
    query UploadPhotos_SubmissionMyCollectionFlowTest_Query(
      $externalId: ID
      $artworkId: String!
    ) @relay_test_operation {
      submission(externalId: $externalId) {
        ...UploadPhotos_submission
      }
      myCollectionArtwork: artwork(id: $artworkId) {
        ...UploadPhotos_myCollectionArtwork
      }
    }
  `,
  variables: {
    externalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
    artworkId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
  },
})

const submission = {
  externalId: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
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
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { id: "user-id", email: "user-email@artsy.net" },
      isLoggedIn: true,
      relayEnvironment: relayEnv,
    }))
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
    ).toHaveAttribute(
      "href",
      `/sell/submission/${submission.externalId}/artwork-details`
    )
    expect(screen.getByText("Submit Artwork")).toBeInTheDocument()
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

    expect(await screen.findByText("0.02 MB")).toBeInTheDocument()
    expect(await screen.findByText(name)).toBeInTheDocument()
    await waitFor(() => {
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

  it("populates images from My Collection artwork", async () => {
    const artwork = {
      internalID: "b2449fe2-e828-4a32-ace7-ff0753cd01ef",
      images: [
        {
          url: "an-url",
        },
        {
          url: "another-url",
        },
      ],
    }

    renderWithRelayMyCollection({
      ConsignmentSubmission: () => submission,
      Artwork: () => artwork,
    })

    expect(screen.getAllByTestId("photo-thumbnail").length).toEqual(2)
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

    fireEvent.click(screen.getByText("Submit Artwork"))

    await waitFor(() => {
      expect(mockAddAsset).toHaveBeenCalled()
    })
  })

  it("runs refetching submission assets if image still processing by Gemini", async () => {
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

    expect(mockFetchQuery).toHaveBeenCalled()
  })

  it("prompts for login / sign up if unauthenticated", async () => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      isLoggedIn: false,
    }))

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

    fireEvent.click(screen.getByText("Submit Artwork"))

    expect(mockShowAuthDialog).toHaveBeenCalled()
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
          "File format not supported. Please upload JPG, PNG or HEIC files."
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
          "File format not supported. Please upload JPG, PNG or HEIC files."
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
