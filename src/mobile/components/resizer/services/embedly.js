/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { EMBEDLY_KEY } = require('sharify').data;
import resizer from './index';

export default {
  endpoint: 'https://i.embed.ly/1/display',

  resize: resizer.resize((url, width, height, quality) => resizer.exec(this.endpoint, 'resize', {
    url,
    width,
    height,
    quality,
    key: EMBEDLY_KEY
  }
  )),

  crop: resizer.crop((url, width, height, quality) => resizer.exec(this.endpoint, 'crop', {
    url,
    width,
    height,
    quality,
    key: EMBEDLY_KEY
  }
  )),

  fill: resizer.fill((url, width, height, quality, color) => resizer.exec(this.endpoint, 'fill', {
    url,
    width,
    height,
    color,
    quality,
    key: EMBEDLY_KEY
  }
  ))
};
