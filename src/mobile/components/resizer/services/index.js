/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { NODE_ENV } = require('sharify').data;
const qs = require('qs');
const { compact } = require('underscore');
import config from '../config'

const { defaults, enabled } = config

const warn = function(message) {
  if (NODE_ENV === 'development') { return console.warn(message); }
};

export default {
  exec(endpoint, path, options) {
    if (options == null) { options = {}; }
    if (enabled) {
      return [compact([endpoint, path]).join('/'), qs.stringify(options)]
        .join('?');
    } else {
      return options.url;
    }
  },

  resize(fn) { return function(url, options) {
    if (options == null) { options = {}; }
    const { width, height, quality } = options;

    if ((width == null) && (height == null)) {
      warn('requires `width || height`');
      return url;
    }

    if ((width != null) && (width === 0)) {
      warn('`width` must be non-zero');
      return url;
    }

    if ((height != null) && (height === 0)) {
      warn('`height` must be non-zero');
      return url;
    }

    return fn(url, width, height, quality || defaults.quality);
  }; },

  crop(fn) { return function(url, options) {
    if (options == null) { options = {}; }
    const { width, height, quality } = options;

    if ((width == null) || (height == null)) {
      warn('requires `width && height`');
      return url;
    }

    if (width === 0) {
      warn('`width` must be non-zero');
      return url;
    }

    if (height === 0) {
      warn('`height` must be non-zero');
      return url;
    }

    return fn(url, width, height, quality || defaults.quality);
  }; },

  fill(fn) { return function(url, options) {
    if (options == null) { options = {}; }
    const { width, height, quality, color } = options;

    if ((width == null) || (height == null)) {
      warn('requires `width && height`');
      return url;
    }

    if (width === 0) {
      warn('`width` must be non-zero');
      return url;
    }

    if (height === 0) {
      warn('`height` must be non-zero');
      return url;
    }

    return fn(url, width, height, quality || defaults.quality, color || defaults.color);
  }; }
};
