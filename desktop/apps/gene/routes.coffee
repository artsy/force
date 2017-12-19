Q = require 'bluebird-q'
{ last } = require 'underscore'
_s = require 'underscore.string'
qs = require 'qs'
Backbone = require 'backbone'
Gene = require '../../models/gene'

@index = (req, res, next) ->
  gene = new Gene id: req.params.id

  gene
  .fetch()
  .then ->
    # Permanently redirect to the new location
    # if the gene slug has been updated
    if gene.id isnt req.params.id
      return res.redirect 301, gene.href()

    # override mode if path is set
    path = req.path.split('/')
    if last(path) is 'artworks'
      mode = 'artworks'
    else if last(path) is 'artist'
      mode = 'artist'
    else
      mode = gene.mode()

    res.locals.sd.GENE = gene.toJSON()
    res.locals.sd.MODE = mode

    res.render 'index',
      gene: gene
  
  .catch next
  .done()
