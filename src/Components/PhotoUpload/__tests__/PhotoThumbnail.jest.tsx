import { Image, ProgressBar } from "@artsy/palette"
import {
  PhotoThumbnail,
  PhotoThumbnailProps,
} from "Components/PhotoUpload/Components/PhotoThumbnail"
import { mount, ReactWrapper } from "enzyme"

const deleteFn = jest.fn()
const file = new File([new Array(10000).join(" ")], "foo.png", {
  type: "image/png",
})
const defaultProps: PhotoThumbnailProps = {
  photo: {
    file: file,
    id: "id",
    name: "foo.png",
    size: file.size,
    removed: false,
    geminiToken: "key",
  },
  onDelete: deleteFn,
}

const getWrapper = (props: PhotoThumbnailProps = defaultProps) =>
  mount(<PhotoThumbnail {...props} />)

describe("PhotoThumbnail", () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    deleteFn.mockReset()
    //@ts-ignore
    jest.spyOn(global, "FileReader").mockImplementation(function () {
      this.readAsDataURL = jest.fn()
    })
  })

  it("changes state from processing to success", () => {
    let photo = {
      id: "id",
      name: "foo.png",
      size: file.size,
      removed: false,
      loading: false,
      geminiToken: "key",
      url: "",
    }

    wrapper = getWrapper({
      ...defaultProps,
      photo: photo,
    })

    expect(wrapper.find(Image)).toHaveLength(0)

    photo.url = "foo.png"
    wrapper.setProps({
      ...defaultProps,
      photo: photo,
    })

    wrapper.update()

    expect(wrapper.find(Image)).toHaveLength(1)
  })

  describe("error state", () => {
    let props

    beforeAll(() => {
      props = {
        ...defaultProps,
        photo: {
          file: file,
          id: "id",
          name: "foo.png",
          size: file.size,
          removed: false,
          errorMessage: "error",
        },
      }

      wrapper = getWrapper(props)
    })

    it("doesn't render image", () => {
      expect(wrapper.find(Image)).toHaveLength(0)
    })
  })

  it("renders error message", () => {
    expect(wrapper.text()).toContain("error")
  })

  describe("loading state", () => {
    let props

    beforeAll(() => {
      props = {
        ...defaultProps,
        photo: {
          file: file,
          id: "id",
          name: "foo.png",
          size: file.size,
          removed: false,
          loading: true,
          progress: 10,
        },
      }

      wrapper = getWrapper(props)
    })

    it("doesn't render name", () => {
      expect(wrapper.text()).not.toContain("foo.png")
    })

    it("doesn't render size", () => {
      expect(wrapper.text()).not.toContain("0.01 MB")
    })

    it("renders image", () => {
      expect(wrapper.find(Image)).toHaveLength(1)
    })

    it("renders delete button", () => {
      const deletePhotoThumbnail = wrapper.find("RemoveButton")

      expect(deletePhotoThumbnail).toHaveLength(1)

      deletePhotoThumbnail.simulate("click")

      expect(deleteFn).toHaveBeenCalled()
      expect(deleteFn).toHaveBeenCalledWith(props.photo)
    })

    it("renders progress bar", () => {
      expect(wrapper.find(ProgressBar)).toHaveLength(1)
    })
  })

  describe("success state", () => {
    beforeAll(() => {
      wrapper = getWrapper()
    })

    it("renders name", () => {
      expect(wrapper.text()).toContain("foo.png")
    })

    it("renders size", () => {
      expect(wrapper.text()).toContain("0.01 MB")
    })

    it("renders image", () => {
      expect(wrapper.find(Image)).toHaveLength(1)
    })

    it("renders delete button", () => {
      const deletePhotoThumbnail = wrapper.find("RemoveButton")

      expect(deletePhotoThumbnail).toHaveLength(1)

      deletePhotoThumbnail.simulate("click")

      expect(deleteFn).toHaveBeenCalled()
      expect(deleteFn).toHaveBeenCalledWith(defaultProps.photo)
    })
  })

  describe("Processing state", () => {
    const photo = {
      id: "id",
      name: "foo.png",
      size: file.size,
      removed: false,
      loading: false,
      geminiToken: "key",
    }

    beforeAll(() => {
      wrapper = getWrapper({
        ...defaultProps,
        photo: photo,
      })
    })

    it("renders name", () => {
      expect(wrapper.text()).toContain("foo.png")
    })

    it("renders size", () => {
      expect(wrapper.text()).toContain("0.01 MB")
    })

    it("doesn't renders image", () => {
      expect(wrapper.find(Image)).toHaveLength(0)
    })

    it("renders processing label", () => {
      expect(wrapper.text()).toContain("Processing")
    })

    it("renders delete button", () => {
      const deletePhotoThumbnail = wrapper.find("RemoveButton")

      expect(deletePhotoThumbnail).toHaveLength(1)

      deletePhotoThumbnail.simulate("click")

      expect(deleteFn).toHaveBeenCalled()
      expect(deleteFn).toHaveBeenCalledWith(photo)
    })
  })
})
