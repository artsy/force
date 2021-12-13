let _Shortcut;
const Backbone = require('backbone');
const sd = require('sharify').data;

export default (_Shortcut = class Shortcut extends Backbone.Model {

  urlRoot() { return `${sd.API_URL}/api/v1/shortcut`; }
});
export const Shortcut = _Shortcut
