import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { UploadPhotosForm } from "../Components/UploadPhotosForm"
import { PhotoThumbnail } from "../Components/PhotoThumbnail"
import { UploadPhotos } from "../UploadPhotos"
import { flushPromiseQueue } from "v2/DevTools"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: () => {
    return <UploadPhotos />
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
    //@ts-ignore
    jest.spyOn(global, "FileReader").mockImplementation(function () {
      this.readAsDataURL = jest.fn()
    })
  })

  it("renders correct", () => {
    const wrapper = getWrapper()
    const text = wrapper.text()

    expect(text).toContain("Upload photos of your artwork")
    expect(wrapper.find(UploadPhotosForm).length).toBe(1)
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

  it("skip non image file", async () => {
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

    await wrapper.update()

    expect(wrapper.text()).not.toContain("foo.pdf")
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
})
