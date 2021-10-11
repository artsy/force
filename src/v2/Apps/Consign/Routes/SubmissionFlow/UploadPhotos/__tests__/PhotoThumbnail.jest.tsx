import React from "react"
import { mount } from "enzyme"
import {
  PhotoThumbnail,
  PhotoThumbnailProps,
} from "../Components/PhotoThumbnail"
import { Image } from "@artsy/palette"

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
  },
  onDelete: deleteFn,
}

const getWrapper = (props: PhotoThumbnailProps = defaultProps) =>
  mount(<PhotoThumbnail {...props} />)

describe("PhotoThumbnail", () => {
  let wrapper

  beforeEach(() => {
    //@ts-ignore
    jest.spyOn(global, "FileReader").mockImplementation(function () {
      this.readAsDataURL = jest.fn()
    })

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
    const deletePhotoThumbnail = wrapper
      .find("[data-test-id='delete-photo-thumbnail']")
      .find("u")

    expect(deletePhotoThumbnail).toHaveLength(1)

    deletePhotoThumbnail.simulate("click")

    expect(deleteFn).toHaveBeenCalled()
    expect(deleteFn).toHaveBeenCalledWith(defaultProps.photo)
  })
})
