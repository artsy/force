require 'hulk-editor'
require 'jquery-ui'
require 'blueimp-file-upload'
require 'jquery.iframe-transport'
GeminiForm = require '../../../components/gemini_form/view.coffee'

module.exports = class JSONPageEditor
  constructor: ({ @$el, @data, @paths }) -> #

  disable: [
    '.hulk-separator'
    '.hulk-map-add-pair'
    '.hulk-array-add-pair'
  ]

  save: (data) =>
    return unless confirm 'Are you sure you want to update the data (these changes can’t be undone)?'

    ($button = $('.hulk-save'))
      .addClass 'is-loading'

    $.ajax
      type: 'POST'
      url: @paths.edit
      data: JSON.stringify(data)
      contentType: 'application/json'
      success: ->
        $('.hulk-preview-iframe > iframe')[0]
          .contentWindow.location.reload true
        $button.removeClass 'is-loading'
      error: ->
        alert 'There was a problem. Check your console for details.'

  setup: ->
    @$el.html "
      <div class='hulk-editor-wrap'>
        <div class='hulk-editor'></div>
        <div class='hulk-preview-iframe'>
          <iframe src='#{@paths.show}'></iframe>
        </div>
      </div>
    "

    $.hulk @$el.find('.hulk-editor'), @data, @save,
      depth: 0
      separator: null
      permissions: 'values-only'

    attachRemove = ($el) ->
      $el.find('.hulk-array-element-remove').remove() # Remove any existing button
      $el.append $remove = $ "<button class='hulk-array-element-remove'>Remove</button>"
      $remove.click -> $el.remove()

    initImageUpload = ->
      return unless $(this).val().match /\.jpg|png|gif|svg/
      $(this).after "<div class='hulk-edit-upload-form'>Replace Image</div>"
      $(this).before "<img src='#{$(this).val()}' class='hulk-preview-image'>"

      $form = $(this).next()

      new GeminiForm
        el: $form
        onUploadComplete: (res) =>
          url = res.url + $form.find('[name=key]').val()
            .replace('${filename}', encodeURIComponent(res.files[0].name))

          $(this).val(url).trigger 'keyup'
          $(this).prev('img').attr 'src', url

          $form.removeClass 'is-loading'

      $form.find('input').change ->
        $form.addClass 'is-loading'

    # Visually disable key editing
    $('.hulk-map-key').prop 'disabled', true

    # Remove some other features
    $(@disable.join ',').remove()

    $('input, textarea').each initImageUpload

    $('.hulk-array').each ->
      $(this).children('.hulk-array-element').each ->
        attachRemove $(this)

      $(this).append $button = $ "<button>Add</button>"

      $button.click ->
        attachRemove $el = $(this).prev().clone()
        $(this).before $el

    this
