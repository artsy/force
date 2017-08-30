import App from './components/App'
import GeneFamiliesQuery from './queries/geneFamilies'
import FeaturedGenesQuery from './queries/featuredGenes'
import metaphysics from 'lib/metaphysics.coffee'
import { renderLayout } from '@artsy/stitch'

export const index = async (req, res, next) => {
  try {
    const { gene_families: geneFamilies } = await metaphysics({
      query: GeneFamiliesQuery()
    })
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
        assetPackage: 'categories3'
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
