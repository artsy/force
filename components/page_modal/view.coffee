ModalView = require '../modal/view.coffee'

module.exports = class PageModalView extends ModalView
  className: 'iframed-page-modal'

  template: ->
    "<iframe id='iframed-page-modal' width='100%' height='100%' src='#{@src}'></iframe>"

  initialize: ({ @src }) ->
    super

  postRender: ->
    @isLoading()
    @$('iframe').load =>
      @retargetLinks()
      @isLoaded()

  contents: ->
    @$('iframe').contents()

  retargetLinks: ->
    @contents().on 'click', 'a:not([target])', ->
      $(this).attr 'target', '_parent'
