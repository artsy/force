import App from './components/App'
import GeneFamiliesQuery from './queries/geneFamilies'
import FeaturedGenesQuery from './queries/featuredGenes'
import _metaphysics from 'lib/metaphysics.coffee'
import { renderLayout as _renderLayout } from '@artsy/stitch'
import { geneFamiliesFromConnection } from './utils'

// FIXME: Rewire
let metaphysics = _metaphysics
let renderLayout = _renderLayout

export const index = async (req, res, next) => {
  try {
    const geneFamilyConnection = await metaphysics({
      query: GeneFamiliesQuery()
    })
    const geneFamilies = geneFamiliesFromConnection(geneFamilyConnection)

    const { gene_families: allFeaturedGenesByFamily } = await metaphysics({
      query: FeaturedGenesQuery()
    })

    const layout = await renderLayout({
      basePath: req.app.get('views'),
      config: {
        styledComponents: true
      },
      layout: '../../../components/main_layout/templates/react_index.jade',
      blocks: {
        head: 'meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'categories'
      },
      data: {
        geneFamilies,
        allFeaturedGenesByFamily
      }
    })

    res.send(layout)
  } catch (err) {
    next(err)
  }
}
