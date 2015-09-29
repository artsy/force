StepView = require './step.coffee'
TypeaheadView = require '../../typeahead/view.coffee'
template = -> require('../templates/galleries_you_work_with.jade') arguments...

module.exports = class GalleriesYouWorkWith extends StepView
  template: -> template arguments...

  shouldAutofocus: false

  __events__:
    'click button': 'next'

  postRender: ->
    @typeahead = new TypeaheadView
      autofocus: true
      url: '/galaxy?type=galleries'

    @$('.js-user-interests')
      .html @typeahead.render().$el

    @listenTo @typeahead, 'selected', @select

  select: (suggestion) ->
    console.log suggestion

  remove: ->
    @typeahead.remove()
    super
