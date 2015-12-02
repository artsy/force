RelatedShowsView = require './view.coffee'

module.exports = (type, show, data, city, title) ->

  el = $('.js-related-shows')
  new RelatedShowsView
    data: data
    el: el
    show: show
    city: city
    title: title
