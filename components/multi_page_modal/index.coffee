modalize = require '../modalize/index.coffee'
MultiPageView = require './view.coffee'
config = require './config.coffee'

module.exports = (key) ->
  view = new MultiPageView config[key]

  modal = modalize view, dimensions: width: '900px', height: '580px'

  modal.load (done) ->
    $.when.apply(null, view.collection.invoke 'fetch')
      .then done
      .fail ->
        modal.close()

  modal
