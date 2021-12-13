ModalView = require './view.coffee'
{ Page } = require '../../models/page'

module.exports = class ModalPageView extends ModalView
  className: 'page-modal'

  template: -> """
    <div class='markdown-content' id='modal-#{@page.get 'id'}'>
      #{@page.mdToHtml 'content'}
    </div>
  """

  initialize: (options) ->
    { @pageId } = options

    @page = new Page id: @pageId
    @page.fetch
      success: (model, response, options) =>
        @templateData.page = @page
        @$('.modal-body').html @template(@templateData)
        @updatePosition()
        @isLoaded()

    super

  postRender: ->
    @isLoading()
