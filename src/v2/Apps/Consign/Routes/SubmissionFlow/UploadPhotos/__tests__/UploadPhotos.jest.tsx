import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { UploadPhotosForm } from "../Components/UploadPhotosForm"
import { PhotoThumbnail } from "../Components/PhotoThumbnail"
import { UploadPhotos } from "../UploadPhotos"
import { flushPromiseQueue } from "v2/DevTools"
import { SystemContextProvider } from "v2/System"
import { MBSize, uploadPhoto } from "../../Utils/fileUtils"
import * as openAuthModal from "v2/Utils/openAuthModal"

jest.unmock("react-relay")

const mockRouterPush = jest.fn()
jest.mock("v2/System/Router/useRouter", () => {
  return {
    useRouter: jest.fn(() => {
      return {
        router: { push: mockRouterPush },
        match: {
          params: {
            id: "1",
          },
        },
      }
    }),
  }
})

let sessionStore = {
  "submission-1": JSON.stringify({
    artworkDetailsForm: {
      artistId: "artistId",
    },
  }),
}
Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem(key) {
      return sessionStore[key] || null
    },
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
})

jest.mock("../../Utils/fileUtils", () => ({
  ...jest.requireActual("../../Utils/fileUtils"),
  uploadPhoto: jest.fn(),
}))

const openAuthModalSpy = jest.spyOn(openAuthModal, "openAuthModal")

const mockUploadPhoto = uploadPhoto as jest.Mock

const { getWrapper } = setupTestWrapper({
  Component: () => {
    return (
      <SystemContextProvider>
        <UploadPhotos />
      </SystemContextProvider>
    )
  },
  query: graphql`
    query UploadPhotosQuery {
      submission(id: "") {
        id
      }
    }
  `,
})

describe("UploadPhotos", () => {
  beforeEach(() => {
    sessionStore = {
      "submission-1": JSON.stringify({
        artworkDetailsForm: {
          artistId: "artistId",
        },
      }),
    }
    //@ts-ignore
    jest.spyOn(global, "FileReader").mockImplementation(function () {
      this.readAsDataURL = jest.fn()
    })
    mockUploadPhoto.mockResolvedValue("s3key")
  })

  afterEach(() => {
    openAuthModalSpy.mockReset()
    mockUploadPhoto.mockClear()
  })

  it("renders correct", async () => {
    const wrapper = getWrapper()

    await flushPromiseQueue()
    wrapper.update()

    const text = wrapper.text()

    expect(text).toContain("Upload photos of your artwork")
    expect(wrapper.find(UploadPhotosForm).length).toBe(1)
    expect(wrapper.find("button[type='submit']").length).toBe(1)
    expect(wrapper.find("BackLink")).toHaveLength(1)
    expect(wrapper.find("BackLink").prop("to")).toEqual(
      "/consign/submission/1/artwork-details"
    )
  })

  it.each([
    ["foo.png", "image/png"],
    ["foo.jpg", "image/jpeg"],
    ["foo.jpeg", "image/jpeg"],
  ])("shows uploaded image name for %s", async (name, type) => {
    const wrapper = getWrapper()

    const dropzoneInput = wrapper
      .find(UploadPhotosForm)
      .find("[data-test-id='image-dropzone']")
      .find("input")

    dropzoneInput.simulate("change", {
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

    await flushPromiseQueue()
    wrapper.update()

    const photoThumbnail = wrapper.find(PhotoThumbnail)
    const photoThumbnailText = photoThumbnail.text()

    expect(photoThumbnail).toHaveLength(1)
    expect(photoThumbnailText).toContain(name)
    expect(photoThumbnailText).toContain("0.02 MB")
  })

  it("uploads few files correctly", async () => {
    const wrapper = getWrapper()

    const dropzoneInput = wrapper
      .find(UploadPhotosForm)
      .find("[data-test-id='image-dropzone']")
      .find("input")

    dropzoneInput.simulate("change", {
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

    await flushPromiseQueue()
    wrapper.update()

    const text = wrapper.text()

    expect(wrapper.find(PhotoThumbnail)).toHaveLength(2)
    expect(text).toContain("foo.png")
    expect(text).toContain("bar.png")
  })

  it("correctly remove image", async () => {
    const wrapper = getWrapper()

    const dropzoneInput = wrapper
      .find(UploadPhotosForm)
      .find("[data-test-id='image-dropzone']")
      .find("input")

    dropzoneInput.simulate("change", {
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

    await flushPromiseQueue()
    wrapper.update()

    const deletePhotoThumbnail = wrapper
      .find(PhotoThumbnail)
      .find("[data-test-id='delete-photo-thumbnail']")
      .find("u")

    deletePhotoThumbnail.simulate("click")

    expect(wrapper.find(PhotoThumbnail)).toHaveLength(0)
  })

  it("prepopulates images from session storage", async () => {
    sessionStore = {
      "submission-1": JSON.stringify({
        artworkDetailsForm: {
          artistId: "artistId",
        },
        uploadPhotosForm: {
          photos: [
            {
              id: "id",
              name: "foo.png",
              size: 111084,
              s3Key: "Sr63tiKsuvMKfCWViJPWHw/foo.png",
              removed: false,
            },
          ],
        },
      }),
    }
    const wrapper = getWrapper()

    await flushPromiseQueue()
    wrapper.update()

    expect(wrapper.find(PhotoThumbnail)).toHaveLength(1)
  })

  it("save images to session storage", async () => {
    const wrapper = getWrapper()

    const dropzoneInput = wrapper
      .find(UploadPhotosForm)
      .find("[data-test-id='image-dropzone']")
      .find("input")

    dropzoneInput.simulate("change", {
      target: {
        files: [
          {
            name: "foo.png",
            path: "foo.png",
            type: "image/png",
            size: 20000,
          },
        ],
      },
    })

    await flushPromiseQueue()
    wrapper.update()

    wrapper.find("Form").simulate("submit")

    await flushPromiseQueue()
    wrapper.update()

    expect(wrapper.find(PhotoThumbnail)).toHaveLength(1)

    expect(sessionStorage.setItem).toHaveBeenCalled()
    expect(mockRouterPush).toHaveBeenCalled()
    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: "/consign/submission/1/contact-information",
    })
  })

  describe("show error message", () => {
    it("if an image could not be uploaded", async () => {
      mockUploadPhoto.mockRejectedValueOnce("rejected")

      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find(UploadPhotosForm)
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
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

      await flushPromiseQueue()
      wrapper.update()

      const thumbnailWithError = wrapper.find("PhotoThumbnailErrorState")
      expect(thumbnailWithError).toHaveLength(1)
    })

    it("if uploading too big file", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find(UploadPhotosForm)
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
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

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.text()).toContain(
        "Whoa, you've reached the size limit! Please delete or upload smaller files."
      )
    })

    it("if uploading wrong file type", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find(UploadPhotosForm)
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
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

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.text()).toContain(
        "File format not supported. Please upload JPG or PNG files."
      )
    })

    it("if uploading wrong file type with too big size", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find(UploadPhotosForm)
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
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

      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.text()).toContain(
        "File format not supported. Please upload JPG or PNG files."
      )
    })
  })
})
