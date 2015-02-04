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

  # Bounce all links out to the parent if they don't
  # already have targets
  retargetLinks: ->
    @$('iframe').contents()
      .find('a:not([target])')
      .attr('target', '_parent')
