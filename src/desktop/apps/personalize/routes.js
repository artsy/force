import * as _ from 'underscore'
import { renderLayout as _renderLayout } from '@artsy/stitch'
import { App } from 'desktop/apps/personalize/components/App'

let renderLayout = _renderLayout

export const index = async (req, res, next) => {
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

export const ensureLoggedInUser = (req, res, next) => {
  if (!res.locals.sd.CURRENT_USER) return res.redirect('/personalize')
  next()
}
