import Items from '../../collections/items'
import JSONPage from '../../components/json_page'
import markdown from '../../components/util/markdown'
import metaphysics from '../../../lib/metaphysics'
import { extend } from 'underscore'

const landing = new JSONPage({ name: 'consignments2/landing' })

export const landingPage = async (req, res, next) => {
  const recentlySold = new Items([], { item_type: 'Artwork' })
  const inDemand = new Items([], { item_type: 'Artist' })

  try {
    const data = await landing.get()
    const {
      recently_sold,
      in_demand
    } = data.sections
    recentlySold.id = recently_sold.set.id
    inDemand.id = in_demand.set.id

    await recentlySold.fetch({ cache: true })
    await inDemand.fetch({ cache: true })
    const { sales } = await metaphysics({ query: SalesQuery(req.params.id) })

    res.locals.sd.RECENTLY_SOLD = recentlySold.toJSON()
    res.locals.sd.IN_DEMAND = inDemand.toJSON()

    const pageData = extend(data, {
      recentlySold: recentlySold,
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

function SalesQuery (id) {
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

