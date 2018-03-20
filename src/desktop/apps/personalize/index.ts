import express, { NextFunction } from 'express'
import { renderLayout } from '@artsy/stitch'
import { App } from 'desktop/apps/personalize/components/App'
import { attachControllers, Controller, Get, Middleware } from "@decorators/express"

export const app = express()
app.set('views', __dirname)
app.set('view engine', 'jade')

class EnsureLoggedInUserMiddleware implements Middleware {
  public use(_, response, next: NextFunction): void {
    if (!response.locals.sd.CURRENT_USER) {
      return response.redirect('/personalize')
    }

    next()
  }
}

@Controller('/')
class PersonalizeController {
  @Get('/personalize')
  redirectToFirstStep(_, res) {
    return res.redirect('/personalize/interests')
  }

  @Get('/personalize/:slug', [EnsureLoggedInUserMiddleware])
  async index(req, res, next) {
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
}

attachControllers(app, [PersonalizeController])