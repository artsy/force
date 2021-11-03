const { DISABLE_IMAGE_PROXY, IMAGE_PROXY } = require('sharify').data;

export default {
  enabled: DISABLE_IMAGE_PROXY !== 'true',
  proxy: IMAGE_PROXY || 'EMBEDLY', // Fallback for specs (sigh)
  defaults: {
    quality: 80,
    color: 'fff'
  }
};
