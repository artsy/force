/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require('sinon');

// Pass in a rewired module and this helper will iterate through the classNames
// and create a bunch of stubbed constructor functions with `methods` and
// bind them to `context`. e.g.
//
// stubChildClasses module, @, ['FillWidthView', 'BlurbView'], ['nextPage', 'render']
// @FillwidthView.args[0][0].model.should #...
// @BlurbView::renderargs[0][0].model.should #...
//
export const stubChildClasses = (module, context, classNames, methods) => (() => {
  const result = [];
  for (let klass of Array.from(classNames)) {
    context[klass] = sinon.stub();
    for (let method of Array.from(methods)) {
      context[klass].prototype[method] = sinon.stub();
    }
    result.push(module.__set__(klass, context[klass]));
  }
  return result;
})();
