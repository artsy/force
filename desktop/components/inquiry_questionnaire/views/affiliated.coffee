_ = require 'underscore'
Form = require '../../form/index'
Galaxy = require '../../../lib/galaxy'
TypeaheadView = require '../../typeahead/view'
ResultsListView = require '../../results_list/view'
StepView = require './step'
template = -> require('../templates/affiliated.jade') arguments...

module.exports = class Affiliated extends StepView
  template: (data) ->
    template _.extend data,
      title: @title

  shouldAutofocus: false
  title: null
  collectorProfileAttribute: null
  galaxyPath: null
  galaxyEndpoint: null

  __events__:
    'click button': 'serialize'

  setup: ->
    { @collectorProfile } = @user.related()

    ids = @collectorProfile.get @collectorProfileAttribute

    @resultsList = new ResultsListView
      typeahead: new TypeaheadView
        autofocus: true
        headers: Galaxy.headers
        url: Galaxy.url @galaxyEndpoint
        path: @galaxyPath
        selected: ids

    if ids?.length
      $.ajax
        method: 'GET'
        headers: Galaxy.headers
        data: ids: ids
        url: Galaxy.url @galaxyEndpoint
        success: (response) =>
          @resultsList.collection.reset _.reduce @galaxyPath.split('.'), (memo, key) ->
            return memo[key]
          , response

  postRender: ->
    @$('.js-user-interests').html @resultsList.render().$el

  serialize: (e) ->
    e.preventDefault()

    form = new Form model: @collectorProfile, $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    ids = @resultsList.collection.pluck 'id'
    @collectorProfile.set @collectorProfileAttribute, ids

    @collectorProfile.save null,
      success: => @next()
      error: form.error.bind form

  remove: ->
    @resultsList.remove()
    super
