import * as _ from 'underscore'
import { renderLayout } from '@artsy/stitch'
import { App } from 'desktop/apps/personalize/components/App'

export const index = (req, res, next) => {
  if (res.locals.sd.ONBOARDING_TEST !== 'experiment') {
    req.user.fetch({
      success: (model, response, options) => {
        res.locals.sd.CURRENT_USER = _.extend(
          {},
          response,
          res.locals.sd.CURRENT_USER
        )
        res.render('template')
      },
    })
  } else {
    newOnboarding(req, res, next)
  }
}

export async function newOnboarding(req, res, next) {
  try {
    const layout = await renderLayout({
      basePath: req.app.get('views'),
      config: {
        styledComponents: true,
      },
      layout: '../../components/main_layout/templates/react_blank_index.jade',
      blocks: {
        head: './meta.jade',
        body: App,
      },
      locals: {
        ...res.locals,
        assetPackage: 'onboarding',
      },
      data: {
        title: 'Personalize | Artsy',
        currentUser: res.locals.sd.CURRENT_USER,
        redirectTo: req.query.redirectTo,
        forceStep: req.params.slug,
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
