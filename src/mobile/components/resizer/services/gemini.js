/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let crop;
const { GEMINI_CLOUDFRONT_URL } = require('sharify').data;
const { config } = require('../config');
const { resizer } = require('./index');

export const gemini =  {
  endpoint: GEMINI_CLOUDFRONT_URL,
  resize: resizer.resize(function(src, width, height, quality) {
    const resize_to = (width != null) && (height == null) ?
      'width'
    : (height != null) && (width == null) ?
      'height'
    :
      'fit';

    return resizer.exec(gemini.endpoint, null, {
      resize_to,
      src,
      width: ((width != null) ? width : undefined),
      height: ((height != null) ? height : undefined),
      quality
    }
    );
  }),

  crop: (crop = resizer.crop((src, width, height, quality) => resizer.exec(gemini.endpoint, null, {
    resize_to: 'fill',
    src,
    width,
    height,
    quality: quality || config.quality
  }
  ))),

  fill: crop
};
