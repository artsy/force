import Items from '../../collections/items'
import JSONPage from '../../components/json_page'
import markdown from '../../components/util/markdown'
import metaphysics from '../../../lib/metaphysics'
import { extend } from 'underscore'

const landing = new JSONPage({ name: 'consignments2/landing' })

export const landingPage = async (req, res, next) => {
  // const recentlySold = new Items([], { item_type: 'Artwork' })
  const inDemand = new Items([], { item_type: 'Artist' })

  try {
    const data = await landing.get()
    const {
      recently_sold,
      in_demand
    } = data.sections
    inDemand.id = in_demand.set.id

    await inDemand.fetch({ cache: true })
    const { ordered_set: recentlySold } = await metaphysics({ query: RecentlySoldQuery(recently_sold.set.id) })
    const { sales } = await metaphysics({ query: SalesQuery() })

    res.locals.sd.RECENTLY_SOLD = recentlySold.artworks
    res.locals.sd.IN_DEMAND = inDemand.toJSON()

    const pageData = extend(data, {
      recentlySold: recentlySold.artworks,
      sales: sales,
      inDemand: inDemand,
      markdown: markdown
    })
    res.render('landing', pageData)
  } catch (e) {
    next(e)
  }
}

export const submissionFlow = async (req, res, next) => {
  res.render('submission_flow', { user: req.user })
}

export const submissionUpload = async (req, res, next) => {
  res.locals.sd.SUBMISSION_ID = req.params.id
  res.render('submission_flow', { user: req.user })
}

function RecentlySoldQuery (id) {
  return `
    {
      ordered_set(id: "${id}") {
        id
        name
        artworks: items {
          ... on ArtworkItem {
            id
            title
            date
            artists(shallow: true) {
              name
            }
            partner(shallow: true) {
              name
            }
            image {
              placeholder
              thumb: resized(height: 170, version: ["large", "larger"]) {
                url
                width
              }
            }
          }
        }
      }
    }
  `
}

function SalesQuery () {
  return `{
    sales(live: true, published: true, is_auction: true, size: 3) {
      _id
      auction_state
      end_at
      id
      is_auction
      is_closed
      is_live_open
      is_open
      live_start_at
      name
      start_at
    }
  }`
}
