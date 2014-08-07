_ = require 'underscore'
require '../../../lib/vendor/hulk'
sectionsTemplates = require '../templates/sections.jade'
{ DATA } = sd = require('sharify').data
GeminiForm = require '../../../components/gemini_form/view.coffee'
{ crop } = require '../../../lib/resizer.coffee'

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
  renderData = JSON.parse(JSON.stringify(data))
  $('#about2-edit-example').html sectionsTemplates _.extend renderData,
    crop: crop

initImageUploads = ->
  $('input, textarea').each ->
    return unless $(this).val().match(/\.jpg|\.png/)
    $(this).after("<div class='about2-edit-upload-form'>Replace Image</div>")
    $(this).before("<img src='#{$(this).val()}' class='about2-preview-image'>")
    new GeminiForm
      el: $form = $(this).next()
      onUploadComplete: (res) =>
        url = res.url + $form.find('[name=key]').val()
          .replace('${filename}', encodeURIComponent(res.files[0].name))
        $(this).val(url).trigger 'keyup'
        $(this).prev('img').attr 'src', url
        $form.removeClass 'is-loading'
    $form.find('input').change -> $form.addClass 'is-loading'

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