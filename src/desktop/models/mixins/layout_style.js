/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const LayoutStyle = {
  layoutStyle(collectionLength) {
    switch (collectionLength) {
      case 1: return 'full';
      case 2: return 'half';
      case 3: return 'third';
      case 4: return 'quarter';
      case 5: return 'fifth';
      case 6: return 'sixth';
      default: return 'quarter';
    }
  },

  imageSizeForLayout(collectionLength) {
    switch (collectionLength) {
      case 1: return 'wide';
      case 2: case 3: return 'large_rectangle';
      default: return 'medium_rectangle';
    }
  }
};
