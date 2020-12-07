import request from "superagent"
import { extend } from "underscore"
import { fetchToken } from "./helpers"
import Analytics from "analytics-node"
import { AnalyticsSchema } from "v2/Artsy"

const Items = require("../../collections/items")
const JSONPage = require("../../components/json_page")
const markdown = require("../../components/util/markdown")
const metaphysics = require("lib/metaphysics.coffee")

const landing = new JSONPage({ name: "consignments-landing" })

export const landingPage = async (req, res, next) => {
  const inDemand = new Items([], { item_type: "Artist" })

  try {
    const data = await landing.get()
    const { recently_sold, in_demand } = data.sections
    inDemand.id = in_demand.set.id

    await inDemand.fetch({ cache: true })
    const { ordered_set: recentlySold } = await metaphysics({
      query: RecentlySoldQuery(recently_sold.set.id),
      req,
    })
    const { sales } = await metaphysics({ query: SalesQuery(), req })

    res.locals.sd.RECENTLY_SOLD = recentlySold.artworks
    res.locals.sd.IN_DEMAND = inDemand.toJSON()

    const pageData = extend(data, {
      recentlySold: recentlySold.artworks,
      sales: sales,
      inDemand: inDemand,
      markdown: markdown,
    })
    res.render("landing", pageData)
  } catch (e) {
    next(e)
  }
}

export const submissionFlow = async (req, res, next) => {
  try {
    // When entering submission flow from /artist/id/consign or /consign, send
    // initial event indicating the submission process has started.
    sendTrackingEvent(req, res)
    res.render("submission_flow", { user: req.user })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const redirectToSubmissionFlow = async (_req, res, _next) => {
  return res.redirect("/consign/submission")
}

export const submissionFlowWithId = async (req, res, _next) => {
  res.locals.sd.SUBMISSION_ID = req.params.id
  res.render("submission_flow", { user: req.user })
}

export const submissionFlowWithFetch = async (req, res, next) => {
  try {
    if (req.user) {
      const token = await fetchToken(req.user.get("accessToken"))
      const submission = await request
        .get(
          `${res.locals.sd.CONVECTION_APP_URL}/api/submissions/${req.params.id}`
        )
        .set("Authorization", `Bearer ${token}`)
      const {
        artist: { name },
      } = await metaphysics({
        query: ArtistQuery(submission.body.artist_id),
        req,
      })
      res.locals.sd.SUBMISSION = submission.body
      res.locals.sd.SUBMISSION_ARTIST_NAME = name
    }
    res.render("submission_flow", { user: req.user })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

function sendTrackingEvent(req, res) {
  if (!req.user) {
    return
  }

  const { contextPath, subject } = req.query || {}
  if (!(contextPath && subject)) {
    return
  }

  const analytics = new Analytics(res.locals.sd.SEGMENT_WRITE_KEY)
  const event = {
    event: AnalyticsSchema.ActionType.ClickedConsign,
    userId: req.user.id,
    properties: {
      context_page_path: contextPath,
      flow: AnalyticsSchema.Flow.Consignments,
      subject,
    },
  }
  analytics.track(event)
}

function ArtistQuery(artistId) {
  return `
  query ConsignArtistQuery {
    artist(id: "${artistId}") {
      id
      name
    }
  }`
}

function RecentlySoldQuery(id) {
  return `
    query ConsignRecentlySoldQuery {
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

function SalesQuery() {
  return `
  query ConsignSalesQuery {
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
