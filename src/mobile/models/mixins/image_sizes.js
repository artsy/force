/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { resizer } = require("../../components/resizer/index")

// requires the image mixin
export const ImageSizes = {
  sizes: {
    small: { width: 200, height: 200 },
    tall: { width: 260, height: 800 },
    medium: { width: Infinity, height: 260 },
    large: { width: 640, height: 640 },
    larger: { width: 1024, height: 1024 },
  },

  publicVersions() {
    return _.without(this.get("image_versions"), "normalized")
  },

  // Given a desired width and height, return the image url that won't pixelate
  imageUrlFor(width, height) {
    let size
    if ((size = this.imageSizeForDimensions(width, height))) {
      return this.imageUrl(size)
    }
    return this.imageUrlForMaxSize()
  },

  imageSizeForDimensions(width, height) {
    for (let key in this.sizes) {
      const size = this.sizes[key]
      if (width <= size.width && height <= size.height) {
        if (_.contains(this.get("image_versions"), key)) {
          return key
        }
      }
    }
  },

  imageUrlForHeight(height) {
    const aspectRatio = this.aspectRatio()
    if (aspectRatio != null) {
      return this.imageUrlFor(height * this.aspectRatio(), height)
    } else {
      return this.imageUrlFor(height, height)
    }
  },

  imageUrlForWidth(width) {
    const aspectRatio = this.aspectRatio()
    if (aspectRatio != null) {
      return this.imageUrlFor(width, width / this.aspectRatio())
    } else {
      return this.imageUrlFor(width, width)
    }
  },

  imageUrlForMaxSize() {
    const sizes = this.publicVersions()
    // favor sizes in this order
    for (let size of [
      "source",
      "larger",
      "large",
      "large_rectangle",
      "tall",
      "medium",
      "square",
      "small",
    ]) {
      if (_.contains(sizes, size)) {
        return this.imageUrl(size)
      }
    }
    return null
  },

  sourceUrl(attr) {
    return this.get(attr) || this.imageUrlForMaxSize()
  },

  resizeUrlFor(options, attr) {
    if (options == null) {
      options = {}
    }
    return resizer.resize(this.sourceUrl(attr), ...arguments)
  },

  cropUrlFor(options, attr) {
    if (options == null) {
      options = {}
    }
    return resizer.crop(this.sourceUrl(attr), options)
  },

  aspectRatio() {
    return this.get("aspect_ratio")
  },

  // Returns a URL where the image is cropped if the crop space is less than 25%, otherwise returns the image.
  imageUrlForRatio(ratio, percentage) {
    if (ratio == null) {
      ratio = 1.5
    }
    if (percentage == null) {
      percentage = 0.25
    }
    const ar = this.aspectRatio()
    const oh = this.get("original_height")
    const ow = this.get("original_width")
    if (ar === ratio) {
      let url
      return (url = this.imageUrlForWidth(600))
    } else if (ar > 1) {
      // wide image
      if ((oh * ratio) / ow < 1 - percentage) {
        return this.imageUrlForWidth(600)
      } else {
        return this.resizeAndCropForAspectRatio()
      }
    } else {
      // tall image
      if (ow / ratio / oh > percentage) {
        return this.imageUrlForHeight(400)
      } else {
        return this.resizeAndCropForAspectRatio()
      }
    }
  },

  resizeAndCropForAspectRatio() {
    if (this.get("aspect_ratio") > 1) {
      return this.cropUrlFor(
        { width: 600, height: 400 },
        this.imageUrlForHeight(400)
      )
    } else {
      return this.cropUrlFor(
        { width: 400, height: 600 },
        this.imageUrlForWidth(600)
      )
    }
  },
}
