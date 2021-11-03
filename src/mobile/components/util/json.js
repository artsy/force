/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export default {
  // remove newlines and other characters that cannot be embedded in an html script tag
  stringifyJSONForWeb(json) {
    return JSON.stringify(json).replace(/</g, '\\u003c').replace(/-->/g, '--\\>');
  }
};
