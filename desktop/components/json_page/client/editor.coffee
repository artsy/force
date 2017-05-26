_ = require 'underscore'
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

    ($button = @$el.find('.hulk-save'))
      .addClass 'is-loading'

    $.ajax
      type: 'POST'
      url: @paths.edit
      data: JSON.stringify(data)
      contentType: 'application/json'
      success: =>
        @$el.find('.hulk-preview-iframe > iframe')[0]
          .contentWindow.location.reload true
        $button.removeClass 'is-loading'
      error: ->
        alert 'There was a problem. Check your console for details.'

  setup: ->
    @$el.html "
      <div class='hulk-editor-wrap'>
        <div class='hulk-editor-container'>
          <div class='hulk-editor'></div>
        </div>
        <div class='hulk-preview-iframe'>
          <iframe src='#{@paths.show}'></iframe>
        </div>
      </div>
    "
    @render()

  render: ->
    @$el.find('.hulk-editor').html('')
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
    @$el.find('.hulk-map-key').prop 'disabled', true

    # Remove some other features
    $(@disable.join ',').remove()
    @$el.find('input, textarea').each initImageUpload

    @$el.find('.hulk-array').each ->
      $(this).children('.hulk-array-element').each ->
        attachRemove $(this)

      $(this).append $button = $ "<button>Add</button>"

      $button.click ->
        attachRemove $el = $(this).prev().clone()
        $(this).before $el

    @addSortingArrows()
    this

  #
  # Adds the ability to sort array items with arrows.
  # Unfortunately Hulk.js doesn't provide this functionality or the ability to
  # re-render based on data manipulations so we have to jump through hoops to
  # associate the DOM to `@data` and update the ordering for both.
  # We could porbably avoid this classic problem with a React based solution:
  # https://github.com/arqex/react-json
  #
  addSortingArrows: ->
    @$el.find('.hulk-array-element').prepend "
      <div class='json-page-array-header'>
        <div class='json-page-array-header-up'>▲</div>
        <div class='json-page-array-header-down'>▼</div>
      </div>
    "
    moveArrayItem = (dir) => (e) =>
      # Find the array's key and index this arrow is a part of in @data
      arrayKey = $(e.target)
        .closest('.hulk-array')
        .siblings('.hulk-map-key')
        .val()
      index = $(e.target).closest('.hulk-array-element').index()
      targetIndex = index + if dir is 'up' then -1 else 1

      # Traverse to the top of the DOM tree, storing the `keys` needed
      # to then traverse down @data and grab the associated data reference
      keys = [arrayKey]
      goUpALevelFrom = ($el) =>
        $map = $el.closest('.hulk-map')
        $parentVal = $map.closest('.hulk-map-value-container')
        if $parentVal.length
          keys.unshift $parentVal.siblings('.hulk-map-key').val()
          goUpALevelFrom $map
        else
          array = keys.reduce ((acc, part) => acc && acc[part]), @data

          # Now that we've found the reference in @data swap the two items
          # in @data and re-render keeping the list expanded
          [item, target] = [array[index], array[targetIndex]]
          array[index] = target
          array[targetIndex] = item
          @render()
          @$el.find(".hulk-map-key[value=#{arrayKey}]")
            .siblings('.hulk-collapse-item')
            .removeClass('collapsed')
            .html('Collapse')
            .siblings('.hulk-array')
            .show()
          @$el.find('.hulk-preview-iframe')
            .get()
            .contentWindow
            ?.location
            .reload true

      goUpALevelFrom $(e.target)
    @$el.find('.json-page-array-header-up').click moveArrayItem('up')
    @$el.find('.json-page-array-header-down').click moveArrayItem('down')
