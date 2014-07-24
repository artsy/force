#
# Error pages and redirections
#

routes = require './routes'

# Awkward b/c we can't have root apps use sub-apps error handlers.
# See this thread: https://github.com/visionmedia/express/issues/1522
module.exports = (app, options) ->
  routes options
  app.use routes.pageNotFound
  app.use routes.socialAuthError
  app.use '/users/sign_in', routes.loginError
  app.use routes.internalError