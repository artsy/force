modalize = require '../modalize/index.coffee'
multiPageView = require '../multi_page/index.coffee'

module.exports = (key, defaultPageId = null, cb = null) ->
  view = multiPageView key, defaultPageId

  modal = modalize view,
    dimensions: width: '900px', height: '580px'
    className: 'modalize multi-page-modal'

  modal.load (done) ->
    if (view.collection.url)
      view.collection.fetch()
        .then ->
          cb(modal) if cb
        .then done
        .catch ->
          modal.close()
    else
      cb(modal) if cb
      done()

  modal
