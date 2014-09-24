_ = require 'underscore'
require '../../../lib/vendor/hulk'
GeminiForm = require '../../../components/gemini_form/view.coffee'
sectionsTemplates = require '../templates/sections.jade'
{ DATA } = sd = require('sharify').data
{ crop } = require '../../../components/resizer/index.coffee'

hulkCallback = (data) ->
  renderPreview(data)
  return unless confirm "Are you sure you want to update the gallery-partnerships page " +
                        "(these changes can't be undone)?"
  $('.hulk-save').addClass 'is-loading'
  $.ajax
    type: 'POST'
    url: '/gallery-partnerships/edit'
    data: data
    error: -> alert "Whoops. Something went wrong, try again. If it doesn't work ask Craig."
    success: -> location.assign '/gallery-partnerships'

renderPreview = (data) ->
  renderData = JSON.parse JSON.stringify(data)
  $('#gallery-partnerships-edit-preview').html(
    sectionsTemplates _.extend(renderData, crop: crop)
  )

initImageUploads = ->
  $('input, textarea').each ->
    return unless $(this).val().match(/\.jpg|\.png/)
    $(this).after("<div class='gallery-partnerships-edit-upload-form'>Replace Image</div>")
    $(this).before("<img src='#{$(this).val()}' class='gallery-partnerships-preview-image'>")
    new GeminiForm
      el: $form = $(this).next()
      onUploadComplete: (res) =>
        url = res.url + $form.find('[name=key]').val()
          .replace('${filename}', encodeURIComponent(res.files[0].name))
        $(this).val(url).trigger 'keyup'
        $(this).prev('img').attr 'src', url
        $form.removeClass 'is-loading'
    $form.find('input').change -> $form.addClass 'is-loading'

setupArrayAddRemove = ->
  addX = ($el) ->
    $el.append $remove = $ "<button class='gallery-partnerships-edit-remove'>✖</button>"
    $remove.click -> $el.remove()
  $('.hulk-array').each ->
    $(this).children('.hulk-array-element').each -> addX $(this)
    $(this).append $add = $ "<button class='avant-garde-button'>Add another</button>"
    $add.click ->
      $(this).before $el = $(this).prev().clone()
      addX $el

module.exports.init = ->
  $.hulk '#gallery-partnerships-edit-hulk', DATA, hulkCallback,
    separator: null
    permissions: "values-only"
  $('button').addClass 'avant-garde-button'
  $('#gallery-partnerships-edit-hulk *:hidden').remove()

  # Update the preview when typing in text fields.
  $('textarea, input').on 'keyup', _.debounce(->
    renderPreview $.hulkSmash('#gallery-partnerships-edit-hulk')
  , 300)

  renderPreview DATA
  initImageUploads()
  setupArrayAddRemove()
