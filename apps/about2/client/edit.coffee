_ = require 'underscore'
require '../../../lib/vendor/hulk'
sectionsTemplates = require '../templates/sections.jade'
{ DATA } = require('sharify').data

hulkCallback = (data) ->
  render(data)
  return unless confirm "Are you sure you want to update the about page " +
                        "(these changes can't be undone)?"
  $('.hulk-save').addClass 'is-loading'
  $.ajax
    type: 'POST'
    url: '/about2/edit'
    data: data
    error: -> alert "Whoops. Something went wrong, try again. If it doesn't work ask Craig."
    success: -> location.assign '/about2'

render = (data) ->
  $('#about2-edit-example').html sectionsTemplates(data)

initImageUploads = ->
  $('input').each ->
    return unless $(this).val().match(/\.jpg|\.png/)
    $(this).after("<input type='file' />")
    $file = $(this).next()
    $file.click -> $file.val ''
    $file.change ->
      alert 'Direct image upload coming soon.'
      # TODO: Integrate Gemini for direct S3 upload
      # formData = new FormData
      # formData.append('image', $file[0].files[0], $file[0].files[0].name)
      # $.ajax
      #   type: 'POST'
      #   url: '/about2/edit/image'
      #   data: formData
      #   contentType: false
      #   processData: false
      #   error: -> alert "Whoops. Something went wrong, try again. If it doesn't work ask Craig."
      #   success: (data) -> console.log "UPLOADED!", data

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
  initImageUploads()