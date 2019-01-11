#
# CLient-side code that runs **everywhere**. STOP! Think if what you're about
# to include in this file can actually live somewhere else like a relavent app
# or component.
#
sd = require('sharify').data
globalReactModules = require('./global_react_modules')
hydrateStitch = require('@artsy/stitch/dist/internal/hydrate').hydrate

module.exports = ->
  hydrateStitch({
    sharifyData: sd
    modules: globalReactModules
    wrapper: globalReactModules.StitchWrapper
  })

