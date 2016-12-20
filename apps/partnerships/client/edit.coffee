_ = require 'underscore'
require 'hulk-editor'
GeminiForm = require '../../../components/gemini_form/view.coffee'
{ DATA } = sd = require('sharify').data
{ crop } = require '../../../components/resizer/index.coffee'
template =-> require('../templates/content.jade') arguments...

hulkCallback = (data) ->
  renderPreview(data)
  return unless confirm "Are you sure you want to update the #{sd.SUBJECT} " +
                        "partnerships page (these changes can't be undone)?"
  $('.hulk-save').addClass 'is-loading'
  $.ajax
    type: 'POST'
    url: "/#{sd.SUBJECT}-partnerships/edit"
    data: JSON.stringify(data)
    contentType: 'application/json'
    success: -> location.assign "/#{sd.SUBJECT}-partnerships"
    error: -> alert "Whoops. Something went wrong, try again. If it doesn't " +
                    "work ask Craig."

renderPreview = (data) ->
  renderData = JSON.parse JSON.stringify(data)
  $('#partnerships-edit-preview').html(
    template _.extend(renderData, crop: crop, path: location.pathname, subject: sd.SUBJECT)
  )

#
# Initialize image uploading for all the images.
#
initImageUploads = ->
  $('input, textarea').each ->
    return unless $(this).val().match(/\.jpg|\.png/)
    initImageUploadMockup this
    initImageUploadForm this

#
# Insert a preview before an input and a replace button after it.
#
initImageUploadMockup = (input) ->
  $(input).before("<img src='#{$(input).val()}' class='partnerships-preview-image'>")
  $(input).after("<div class='partnerships-edit-upload-form'>Replace Image</div>")

#
# Initialize a Gemini Form for the replace button immediately after an input.
#
initImageUploadForm = (input) ->
  new GeminiForm
    el: $form = $(input).next('.partnerships-edit-upload-form')
    onUploadComplete: (res) ->
      url = res.url + $form.find('[name=key]').val()
        .replace('${filename}', encodeURIComponent(res.files[0].name))
      $(input).val(url).trigger 'keyup'
      $(input).prev('img').attr 'src', url
      $form.removeClass 'is-loading'
  $form.find('input').change -> $form.addClass 'is-loading'

setupArrayAddRemove = ->
  addX = ($el) ->
    $("<button class='partnerships-edit-remove'>✖</button>")
      .appendTo($el).click -> $el.remove()

  $('.hulk-array').each ->
    $(this).children('.hulk-array-element').each -> addX $(this)
    $(this).append $add = $ "<button class='avant-garde-button'>Add another</button>"
    $add.click ->
      # jQuery's `clone` won't copy the value of inputs, so we do it manually.
      ($clonee = $(this).prev()).find('.hulk-map-value').each ->
        $(this).attr 'value', $(this).val()
      ($clone = $clonee.clone()).find('.hulk-map-value').each ->
        $(this).val $(this).attr('value')
        initImageUploadForm this if $(this).val().match(/\.jpg|\.png/)
      addX $clone.insertBefore $(this)

module.exports.init = ->
  $.hulk '#partnerships-edit-hulk', DATA, hulkCallback,
    separator: null
    permissions: "values-only"

  # The `permissions` option in `$.hulk` is to be implemented; in the
  # meantime, disable all the key fields for now.
  $('.hulk-map-key').prop 'disabled', true

  $('button').addClass 'avant-garde-button'
  $('#partnerships-edit-hulk *:hidden').remove()

  # Update the preview when typing in text fields.
  $('textarea, input').on 'keyup', _.debounce(->
    renderPreview $.hulkSmash('#partnerships-edit-hulk')
  , 300)
  renderPreview DATA
  initImageUploads()
  setupArrayAddRemove()
