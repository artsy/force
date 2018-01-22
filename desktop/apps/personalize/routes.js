import * as _ from 'underscore'
import { renderLayout } from '@artsy/stitch'
import { App } from 'desktop/apps/personalize/components/App'

export const index = (req, res) => {
  req.user.fetch({
    success: (model, response, options) => {
      res.locals.sd.CURRENT_USER = _.extend({}, response, res.locals.sd.CURRENT_USER)
      res.render('template')
    }
  })
}

export async function newOnboarding (req, res, next) {
  if (res.locals.sd.ONBOARDING_TEST === 'experiment') {
    try {
      const layout = await renderLayout({
        basePath: req.app.get('views'),
        config: {
          styledComponents: true
        },
        layout: '../../components/main_layout/templates/react_blank_index.jade',
        blocks: {
          body: App
        },
        locals: {
          ...res.locals,
          assetPackage: 'personalize'
        }
      })

      res.send(layout)
    } catch (error) {
      next(error)
    }
  } else {
    res.redirect('/personalize')
  }
}
