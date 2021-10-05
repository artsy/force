import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { UploadPhotosForm } from "../Components/UploadPhotosForm"
import { UploadPhotos } from "../UploadPhotos"

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
  it("renders correct", () => {
    const wrapper = getWrapper()
    const text = wrapper.text()

    expect(text).toContain("Upload photos of your artwork")
    expect(wrapper.find(UploadPhotosForm).length).toBe(1)
  })

  it("shows uploaded image name", async () => {
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

    await wrapper.update()

    expect(wrapper.text()).toContain("foo.png")
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
})
