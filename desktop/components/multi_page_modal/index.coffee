modalize = require '../modalize/index'
multiPageView = require '../multi_page/index'

module.exports = (key, defaultPageId = null, cb = null) ->
  view = multiPageView key, defaultPageId

  modal = modalize view,
    dimensions: width: '900px', height: '580px'
    className: 'modalize multi-page-modal'

  modal.load (done) ->
    $.when.apply(null, view.collection.invoke 'fetch')
      .then ->
        cb(modal) if cb
      .then done
      .fail ->
        modal.close()

  modal
