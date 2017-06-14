import Items from '../../collections/items'
import JSONPage from '../../components/json_page'
import markdown from '../../components/util/markdown'
import metaphysics from 'lib/metaphysics.coffee'
import request from 'superagent'
import { extend } from 'underscore'
import { fetchToken } from './helpers'

const landing = new JSONPage({ name: 'consignments2/landing' })

export const landingPage = async (req, res, next) => {
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

export const redirectToSubmissionFlow = async (req, res, next) => {
  return res.redirect('/consign2/submission')
}

export const submissionFlowWithId = async (req, res, next) => {
  res.locals.sd.SUBMISSION_ID = req.params.id
  res.render('submission_flow', { user: req.user })
}

export const submissionFlowWithFetch = async (req, res, next) => {
  try {
    const token = await fetchToken(req.user.get('accessToken'))
    const submission = await request
                              .get(`${res.locals.sd.CONVECTION_APP_URL}/api/submissions/${req.params.id}`)
                              .set('Authorization', `Bearer ${token}`)
    const { artist: { name } } = await metaphysics({ query: ArtistQuery(submission.body.artist_id) })
    res.locals.sd.SUBMISSION = submission.body
    res.locals.sd.SUBMISSION_ARTIST_NAME = name
    res.render('submission_flow', { user: req.user })
  } catch (e) {
    next(e)
  }
}

function ArtistQuery (artistId) {
  return `{
    artist(id: "${artistId}") {
      id
      name
    }
  }`
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
