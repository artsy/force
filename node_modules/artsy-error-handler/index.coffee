#
# Error pages and redirections
#

routes = require './routes'

@helpers = (req, res, next) ->
  routes.backboneErrorHelper req, res, next

# Awkward b/c we can't have root apps use sub-apps error handlers.
# See this thread: https://github.com/visionmedia/express/issues/1522
@handlers = (app, options) ->
  routes.template = options.template
  app.use routes.pageNotFound
  app.use routes.socialAuthError
  app.use '/users/sign_in', routes.loginError
  app.use routes.internalError