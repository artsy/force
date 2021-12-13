/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
//
// Hides any list items for artists without images.
//

export default () => $('.artist-list img').error(function() { return $(this).closest('li').hide(); });
