const { EMBEDLY_KEY } = require('sharify').data;
const { resizer } = require ('./index');

export const embedly =  {
  endpoint: 'https://i.embed.ly/1/display',

  resize: resizer.resize((url, width, height, quality) => resizer.exec(embedly.endpoint, 'resize', {
    url,
    width,
    height,
    quality,
    key: EMBEDLY_KEY
  }
  )),

  crop: resizer.crop((url, width, height, quality) => resizer.exec(embedly.endpoint, 'crop', {
    url,
    width,
    height,
    quality,
    key: EMBEDLY_KEY
  }
  )),

  fill: resizer.fill((url, width, height, quality, color) => resizer.exec(embedly.endpoint, 'fill', {
    url,
    width,
    height,
    color,
    quality,
    key: EMBEDLY_KEY
  }
  ))
};
