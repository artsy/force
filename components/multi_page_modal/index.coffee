modalize = require '../modalize/index.coffee'
multiPageView = require '../multi_page/index.coffee'

module.exports = (key, state = null) ->
  view = multiPageView key

  modal = modalize view,
    dimensions: width: '900px', height: '580px'
    className: 'modalize multi-page-modal'

  modal.load (done) ->
    $.when.apply(null, view.collection.invoke 'fetch')
      .then ->
        view.state.set('active', state) if state
      .then done
      .fail ->
        modal.close()

  modal
