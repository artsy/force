Gene = require '../../models/gene'

@index = (req, res, next) ->
  new Gene(id: req.params.id).fetch
    success: (gene) ->
      res.locals.sd.GENE = gene.toJSON()

      # Do not include fragment meta tag for urls that reflection does not crawl (/gene/:id/artworks*)
      #
      # If the head of a page has both a meta fragment and a canonical
      # tag, google's crawler will use the meta fragment FIRST
      # (re-crawling with ?_escaped_fragment_=). It then respects the
      # canonical tag in the escaped_fragment html.
      includeMetaFragment = !req.originalUrl.match('/artworks')

      res.render 'index',
        gene: gene
        filterRoot: gene.href() + '/artworks'
        includeMetaFragment: includeMetaFragment
    error: res.backboneError
