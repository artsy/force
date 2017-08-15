import React from 'react'
import Items from '../../collections/items'
import JSONPage from '../../components/json_page'
import markdown from '../../components/util/markdown'
import App from 'desktop/apps/consign/components/App'
import metaphysics from 'lib/metaphysics.coffee'
import request from 'superagent'
import { extend } from 'underscore'
import { fetchToken } from './helpers'
import { ArtistQuery, RecentlySoldQuery, SalesQuery } from './queries'
import configureStore from 'desktop/components/react/utils/configureStore'
import reducers, { initialState as appInitialState } from './client/reducers'
import { renderReactLayout } from 'desktop/components/react/utils/renderReactLayout'

const landing = new JSONPage({ name: 'consignments-landing' })

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
  // res.render('submission_flow', { user: req.user })
  const store = configureStore(reducers, {
    app: appInitialState
  })

  const layout = renderReactLayout({
    basePath: res.app.get('views'),
    blocks: {
      head: 'meta.jade',
      body: props => <App store={store} {...props} />
    },
    locals: {
      ...res.locals,
      assetPackage: 'consign',
      bodyClass: 'consignments-submission-body body-header-fixed body-no-margins'
    },
    data: {
      app: store.getState().app
    }
  })

  res.send(layout)
}

export const redirectToSubmissionFlow = async (req, res, next) => {
  return res.redirect('/consign/submission')
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

