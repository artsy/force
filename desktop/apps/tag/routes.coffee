Q = require 'bluebird-q'
Backbone = require 'backbone'
Tag = require '../../models/tag'

@index = (req, res, next) ->
  tag = new Tag(id: req.params.id)
  tag
    .fetch(cache: true)
    .then ->
      res.locals.sd.TAG = tag.toJSON()
      res.render 'index',
        tag: tag
    .catch next
    .done()