/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');
const resizer = require('../../components/resizer/index.coffee');

// requires the image mixin
export const ImageSizes = {
  sizes: {
    small: { width: 200, height: 200
  },
    tall: { width: 260, height: 800
  },
    medium: { width: Infinity, height: 260
  },
    large: { width: 640, height: 640
  },
    larger: { width: 1024, height: 1024
  }
  },

  croppedSizes: ['square', 'medium250x165', 'medium_rectangle', 'large_rectangle'],

  isCropped(version) {
    return _.contains(this.croppedSizes, version);
  },

  isWithImages() {
    return ((typeof this.defaultImageVersion === 'function' ? this.defaultImageVersion() : undefined) != null);
  },

  publicVersions() {
    return _.without(this.get('image_versions'), 'normalized');
  },

  // Given a desired width and height, return the image url that won't pixelate
  imageUrlFor(width, height) {
    let size;
    if (size = this.imageSizeForDimensions(width, height)) {
      return this.imageUrl(size);
    }
    return this.imageUrlForMaxSize();
  },

  imageSizeForDimensions(width, height) {
    for (let key in this.sizes) {
      const size = this.sizes[key];
      if ((width <= size.width) && (height <= size.height)) {
        if (_.contains(this.get('image_versions'), key)) { return key; }
      }
    }
  },

  imageSizeForHeight(height) {
    return this.imageSizeForDimensions(height * this.aspectRatio(), height);
  },

  imageUrlForHeight(height) {
    const aspectRatio = this.aspectRatio();
    if (aspectRatio != null) {
      return this.imageUrlFor(height * this.aspectRatio(), height);
    } else {
      return this.imageUrlFor(height, height);
    }
  },

  imageUrlForWidth(width) {
    const aspectRatio = this.aspectRatio();
    if (aspectRatio != null) {
      return this.imageUrlFor(width, (width / this.aspectRatio()));
    } else {
      return this.imageUrlFor(width, width);
    }
  },

  maxWidthForHeight(height, maxDimension) {
    const aspectRatio = this.aspectRatio();
    maxDimension = maxDimension || this.get('original_width');
    if (aspectRatio != null) {
      const width = Math.round(height / this.aspectRatio());
      if (width > maxDimension) { return maxDimension; } else { return Math.floor(width); }
    }
  },

  maxHeightForHeight(height, maxDimension) {
    const aspectRatio = this.aspectRatio();
    if (aspectRatio != null) {
      if (maxDimension) {
        let width = height / this.aspectRatio();
        if (width > maxDimension) { width = maxDimension; }
        height = width * this.aspectRatio();
      } else {
        maxDimension = this.get('original_height');
      }
      if (height > maxDimension) { return maxDimension; } else { return Math.floor(height); }
    } else {
      return height;
    }
  },

  maxHeightForWidth(width, maxDimension) {
    const aspectRatio = this.aspectRatio();
    maxDimension = maxDimension || this.get('original_height');
    if (aspectRatio != null) {
      const height = Math.round(width / this.aspectRatio());
      if (height > maxDimension) { return maxDimension; } else { return Math.floor(height); }
    }
  },

  maxWidthForWidth(width, maxDimension) {
    const aspectRatio = this.aspectRatio();
    if (aspectRatio != null) {
      if (maxDimension) {
        let height = width / this.aspectRatio();
        if (height > maxDimension) { height = maxDimension; }
        width = height * this.aspectRatio();
      } else {
        maxDimension = this.get('original_width');
      }
      if (width > maxDimension) { return maxDimension; } else { return Math.floor(width); }
    }
  },

  imageUrlForMaxSize() {
    const sizes = this.publicVersions();
    // favor sizes in this order
    for (let size of ['source', 'wide', 'larger', 'large', 'large_rectangle', 'tall', 'medium', 'square', 'small']) {
      if (_.contains(sizes, size)) { return this.imageUrl(size); }
    }
    return null;
  },

  imageSizeDimensionsFor(size) {
    return this.resizeDimensionsFor(this.sizes[size]);
  },

  resizeDimensionsFor({ width, height }) {
    const ratios = _.compact(_.map({ width, height }, (value, dimension) => {
      if (value) { return value / this.get(`original_${dimension}`); }
    })
    );
    const ratio = Math.min(...Array.from(ratios || []));
    return {
      width: Math.floor(this.get('original_width') * ratio),
      height: Math.floor(this.get('original_height') * ratio)
    };
  },

  sourceUrl(attr) {
    return this.get(attr) || this.imageUrlForMaxSize();
  },

  resizeUrlFor(options, attr) {
    if (options == null) { options = {}; }
    return resizer.resize(this.sourceUrl(attr), ...arguments);
  },

  cropUrlFor(options, attr) {
    if (options == null) { options = {}; }
    return resizer.crop(this.sourceUrl(attr), options);
  },

  fillUrlFor(options, attr) {
    if (options == null) { options = {}; }
    return resizer.fill(this.sourceUrl(attr), options);
  },

  hasDimensions() {
    return this.has('original_width') &&
    this.has('original_height');
  },

  factor(favor, precision) {
    if (favor == null) { favor = 'width'; }
    if (precision == null) { precision = 3; }
    const disfavor = favor === 'width' ? 'height' : 'width';
    if (this.hasDimensions()) {
      const factor = this.get(`original_${disfavor}`) / this.get(`original_${favor}`);
      const x = Math.pow(10, precision);
      return Math.floor(factor * x) / x;
    } else {
      return 1;
    }
  },

  aspectRatio() {
    return this.get('aspect_ratio');
  }
};
