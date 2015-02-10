ModalView = require '../modal/view.coffee'

module.exports = class PageModalView extends ModalView
  className: 'iframed-page-modal'

  template: ->
    "<iframe id='iframed-page-modal' width='100%' height='100%' src='#{@src}'></iframe>"

  initialize: ({ @src }) ->
    super

  postRender: ->
    @isLoading()

    @alreadySetup = false

    @$('iframe').load (e) =>
      if @alreadySetup
        # Safety net incase this loads more than once
        return window.location.href = @contents()[0].location.href

      @alreadySetup = true
      @retargetLinks()
      @isLoaded()

  contents: ->
    @$('iframe').contents()

  retargetLinks: ->
    @contents().on 'click', 'a:not([target])', ->
      $(this).attr 'target', '_parent'
