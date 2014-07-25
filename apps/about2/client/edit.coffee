_ = require 'underscore'
require '../../../lib/vendor/hulk'
sectionsTemplates = require '../templates/sections.jade'
{ DATA } = require('sharify').data

hulkCallback = (data) ->
  render(data)
  return unless confirm "Are you sure you want to update the about page " +
                        "(these change can't be undone)."
  $.ajax
    type: 'POST'
    url: '/about2/edit'
    data: data
    error: -> alert "Whoops. Something went wrong, try again. If it doesn't work ask Craig."
    success: ->
      alert "Saved!"

render = (data) ->
  $('#about2-edit-example').html sectionsTemplates(data)

module.exports.init = ->
  $.hulk '#about2-edit-hulk', DATA, hulkCallback,
    separator: null
    permissions: "values-only"
  $('button').addClass 'avant-garde-button'
  $('#about2-edit-hulk *:hidden').remove()
  # TODO: Find out how to move the title to the top without messing up serializing
  # $('[value=title]').each -> $(this).parent().insertBefore $(this).parent().parent()
  $('textarea, input').on 'keyup', _.debounce (-> render $.hulkSmash('#about2-edit-hulk')), 300
  render(DATA)