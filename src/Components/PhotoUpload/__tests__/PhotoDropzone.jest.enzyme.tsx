import { PhotoDropzone } from "Components/PhotoUpload/Components/PhotoDropzone"
import { MBSize } from "Components/PhotoUpload/Utils/fileUtils"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { MediaContextProvider } from "Utils/Responsive"
import { mount } from "enzyme"
import { Formik } from "formik"

const validImage = {
  name: "foo.png",
  path: "foo.png",
  type: "image/png",
  size: 2 * MBSize,
}

const tooBigImage = {
  name: "foo.png",
  path: "foo.png",
  type: "image/png",
  size: 40 * MBSize,
}

const pdfFile = {
  name: "foo.pdf",
  path: "foo.pdf",
  type: "application/pdf",
  size: 2 * MBSize,
}

const tooBigPdf = {
  name: "foo.pdf",
  path: "foo.pdf",
  type: "application/pdf",
  size: 40 * MBSize,
}

const onDropMock = jest.fn()
const onRejectMock = jest.fn()

describe("PhotoDropzone", () => {
  let breakpoint: "xs" | "md"

  const getWrapper = () => {
    return mount(
      <MediaContextProvider onlyMatch={[breakpoint]}>
        <Formik initialValues={{ photos: [] }} onSubmit={jest.fn()}>
          <PhotoDropzone
            allPhotos={[]}
            maxTotalSize={10}
            onDrop={onDropMock}
            onReject={onRejectMock}
          />
        </Formik>
      </MediaContextProvider>
    )
  }

  describe("md breakpoint", () => {
    beforeEach(() => {
      breakpoint = "md"
      onDropMock.mockClear()
      onRejectMock.mockClear()
    })

    it("success uploading", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [validImage, validImage, validImage],
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).toHaveBeenCalled()
      expect(onDropMock).toHaveBeenCalledWith([
        validImage,
        validImage,
        validImage,
      ])
    })

    it("rejects not image files", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [pdfFile, pdfFile, pdfFile],
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).not.toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalledWith(
        [...Array(3)].map(() => ({
          file: pdfFile,
          errors: [
            {
              message:
                "File type must be one of image/jpeg, image/png, image/heic",
              code: "file-invalid-type",
            },
          ],
        }))
      )
    })

    it("rejects too big files", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [tooBigImage],
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).not.toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalledWith([
        {
          file: tooBigImage,
          errors: [
            {
              message: "",
              code: "total-size-limit",
            },
          ],
        },
      ])
    })

    it("rejects too big pdf files", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [tooBigPdf],
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).not.toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalledWith([
        {
          file: tooBigPdf,
          errors: [
            {
              message:
                "File type must be one of image/jpeg, image/png, image/heic",
              code: "file-invalid-type",
            },
          ],
        },
      ])
    })

    it("rejects image over size limit", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper
        .find("[data-test-id='image-dropzone']")
        .find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [...Array(6)].map(() => validImage),
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).toHaveBeenCalled()

      expect(onDropMock).toHaveBeenCalledWith(
        [...Array(5)].map(() => validImage)
      )
      expect(onRejectMock).toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalledWith([
        {
          file: validImage,
          errors: [
            {
              message: "",
              code: "total-size-limit",
            },
          ],
        },
      ])
    })
  })

  describe("xs breakpoint", () => {
    beforeEach(() => {
      breakpoint = "xs"
      onDropMock.mockClear()
      onRejectMock.mockClear()
    })

    it("success uploading", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper.find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [validImage, validImage, validImage],
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).toHaveBeenCalled()
      expect(onDropMock).toHaveBeenCalledWith([
        validImage,
        validImage,
        validImage,
      ])
    })

    it("rejects not image files", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper.find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [pdfFile, pdfFile, pdfFile],
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).not.toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalledWith(
        [...Array(3)].map(() => ({
          file: pdfFile,
          errors: [
            {
              message:
                "File type must be one of image/jpeg, image/png, image/heic",
              code: "file-invalid-type",
            },
          ],
        }))
      )
    })

    it("rejects too big files", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper.find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [tooBigImage],
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).not.toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalledWith([
        {
          file: tooBigImage,
          errors: [
            {
              message: "",
              code: "total-size-limit",
            },
          ],
        },
      ])
    })

    it("rejects too big pdf files", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper.find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [tooBigPdf],
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).not.toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalledWith([
        {
          file: tooBigPdf,
          errors: [
            {
              message:
                "File type must be one of image/jpeg, image/png, image/heic",
              code: "file-invalid-type",
            },
          ],
        },
      ])
    })

    it("rejects image over size limit", async () => {
      const wrapper = getWrapper()

      const dropzoneInput = wrapper.find("input")

      dropzoneInput.simulate("change", {
        target: {
          files: [...Array(6)].map(() => validImage),
        },
      })

      await flushPromiseQueue()
      wrapper.update()

      expect(onDropMock).toHaveBeenCalled()

      expect(onDropMock).toHaveBeenCalledWith(
        [...Array(5)].map(() => validImage)
      )
      expect(onRejectMock).toHaveBeenCalled()
      expect(onRejectMock).toHaveBeenCalledWith([
        {
          file: validImage,
          errors: [
            {
              message: "",
              code: "total-size-limit",
            },
          ],
        },
      ])
    })
  })
})
