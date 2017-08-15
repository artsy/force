import React from 'react'
import { StaticRouter } from 'react-router'
import Items from '../../collections/items'
import JSONPage from '../../components/json_page'
import markdown from '../../components/util/markdown'
import App from 'desktop/apps/consign/components/app'
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
  const store = configureStore(reducers, {
    submissionFlow: appInitialState
  })
  const context = {}

  const layout = renderReactLayout({
    basePath: res.app.get('views'),
    mainLayout: 'desktop/apps/consign/templates/layout.jade',
    blocks: {
      head: 'meta.jade',
      body: props => (
        <StaticRouter
          location={req.url}
          context={context}>
          <App store={store} {...props} />
        </StaticRouter>
      )
    },
    locals: {
      ...res.locals,
      assetPackage: 'misc',
      bodyClass: 'consignments-submission-body minimal-header body-header-fixed'
    },
    data: {
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

