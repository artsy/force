LocationSearchView = require '../../../../components/location_search/index.coffee'
UserEditFormView = require '../user_edit/view.coffee'
template = -> require('./template.jade') arguments...

module.exports = class AboutYouFormView extends UserEditFormView
  template: -> template arguments...

  postRender: ->
    @locationSearch = new LocationSearchView autofocus: false

    @listenTo @locationSearch, 'location:update', (value) =>
      @model.setLocation value

    @$('.js-location-search').html @locationSearch.render(
      @model.related().location.toString()
    ).$el
