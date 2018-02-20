sinon = require 'sinon'

# Pass in a rewired module and this helper will iterate through the classNames
# and create a bunch of stubbed constructor functions with `methods` and
# bind them to `context`. e.g.
#
# stubChildClasses module, @, ['FillWidthView', 'BlurbView'], ['nextPage', 'render']
# @FillwidthView.args[0][0].model.should #...
# @BlurbView::renderargs[0][0].model.should #...
#
@stubChildClasses = (module, context, classNames, methods) ->
  for klass in classNames
    context[klass] = sinon.stub()
    for method in methods
      context[klass]::[method] = sinon.stub()
    module.__set__ klass, context[klass]
