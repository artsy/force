#
# CLient-side code that runs **everywhere**. STOP! Think if what you're about
# to include in this file can actually live somewhere else like a relavent app
# or component.
#
globalReactModules = require('./global_react_modules')
{ componentRenderer } = require('@artsy/stitch/iso')

module.exports = ->
  mountStitchBlocks()


mountStitchBlocks = ->
  {components, mountOnClient} = componentRenderer({
    mode: 'client',
    modules: globalReactModules
  })

  sd.stitch.renderQueue.forEach (block) ->
    mountOnClient(block)

  # Mount renderer for runtime client-side templates. NOTE: must be included
  # in template when rendering data; e.g., html = myTemplate({ data, reaction })
  sd.stitch.components = components
