StepView = require './step.coffee'
Galaxy = require '../../../lib/galaxy.coffee'
TypeaheadView = require '../../typeahead/view.coffee'
ResultsListView = require '../../results_list/view.coffee'
template = -> require('../templates/galleries_you_work_with.jade') arguments...

module.exports = class GalleriesYouWorkWith extends StepView
  template: -> template arguments...

  shouldAutofocus: false

  __events__:
    'click button': 'serialize'

  setup: ->
    ids = @user.related()
      .collectorProfile.get 'affiliated_gallery_ids'

    @resultsList = new ResultsListView
      typeahead: new TypeaheadView
        autofocus: true
        headers: Galaxy.headers
        url: Galaxy.url('galleries')
        path: '_embedded.galleries'
        selected: ids

    if ids?.length
      $.ajax
        method: 'GET'
        headers: Galaxy.headers
        data: ids: ids
        url: Galaxy.url('galleries')
        success: ({ _embedded }) =>
          @resultsList.collection.reset _embedded.galleries

  postRender: ->
    @$('.js-user-interests').html @resultsList.render().$el

  serialize: (e) ->
    e.preventDefault()

    ids = @resultsList.collection.pluck 'id'

    @user.related().collectorProfile
      .save affiliated_gallery_ids: ids,
        complete: => @next()

  remove: ->
    @resultsList.remove()
    super
