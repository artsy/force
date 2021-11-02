/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _InstallShot;
const { AdditionalImage } = require('./additional_image');

export default (_InstallShot = (function() {
  _InstallShot = class InstallShot extends AdditionalImage {
    static initClass() {

      this.prototype.sizes = [
        ['square', { width: 230, height: 230}],
        ['medium', { width: Infinity, height: 260}],
        ['general', { width: 320, height: 210}],
        ['large', { width: 640, height: 640}],
        ['featured', { width: 720, height: 480}],
        ['larger', { width: 1024, height: 1024}]
      ];
    }
  };
  _InstallShot.initClass();
  return _InstallShot;
})());
export const InstallShot = _InstallShot
