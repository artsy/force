import React from 'react'
import renderTemplate from 'desktop/components/react/utils/render_template'
import buildTemplateComponent from 'desktop/components/react/utils/build_template_component'
import { isFunction, isString } from 'underscore'
import { renderToString } from 'react-dom/server'

/**
 * Utility for rendering a React-based isomorphic app. Note that Once html has
 * been sent over the wire it still needs to be rehydrated on the client. See
 * apps/react_example/client.js for example.
 *
 * @example
 *
 * // Routes.js
 *
 * import { renderReactLayout } from 'desktop/components/react/utils/render_react_layout'
 *
 * export function index (req, res, next) {
 *   const layout = renderReactLayout({
 *     basePath: req.app.get('views'),
 *     blocks: {
 *       head: 'meta.jade',
 *       body: AppComponent
 *     },
 *     locals: {
 *       ...res.locals,
 *       assetPackage: 'react_example',
 *       bodyClass: 'someCSSClass'
 *     },
 *     data: {
 *       name: 'Leif',
 *       description: 'hi how are you'
 *     },
 *     templates: {
 *       MyLegacyJadeView: 'some_jade_view.jade'
 *     }
 *   })
 * }
 *
 * // Client.js
 *
 * import { rehydrateClient } from 'desktop/components/react/utils/render_react_layout'
 *
 * const bootstrapData = rehydrateClient(window.__BOOTSTRAP__)
 *
 * ReactDOM.render(
 *   <App {...bootstrapData} />, document.getElementById('react-root')
 * )
 *
 * @param  {Object} options Options configuration object
 * @return {String}         String of html to render
 */
export function renderReactLayout (options) {
  const {
    basePath = '',
    blocks: { head, body } = {},
    locals = {},
    data = {},
    templates = {}
  } = options

  const templateComponents = renderTemplateComponents(
    templates,
    basePath,
    data
  )

  const layout = renderTemplate('desktop/components/main_layout/templates/react_index.jade', {
    locals: {
      ...locals,
      data: {
        ...data,
        templateComponents
      },
      header: render(head),
      body: render(body)
    }
  })

  function render (block) {
    let html = ''

    if (!block) {
      return html
    }

    // Jade template
    if (isJadeTemplate(block)) {
      html = renderTemplate(block, {
        basePath,
        locals: {
          ...locals,
          ...data
        }
      })

      // Component
    } else if (isReactComponent(block)) {
      const Component = block

      html = renderToString(
        <Component {...data} templateComponents={templateComponents} />
      )

      // String
    } else if (isString(block)) {
      html = block

      // Error
    } else {
      if (process.env.NODE_ENV === 'development') {
        throw new Error(
          '(components/reaect/utils/render_react_layout.js) ' +
          'Error rendering layout: `block` must be a Jade template, React ' +
          'component or string'
        )
      }
    }

    return html
  }

  return layout
}

// Helpers

function isJadeTemplate (fileName) {
  return isString(fileName) && fileName.includes('.jade')
}

function isReactComponent (Component) {
  if (isFunction(Component)) {
    return Component
  } else {
    throw new Error(
      '(components/reaect/utils/render_react_layout.js) ' +
      'Error rendering layout: Invalid React component'
    )
  }
}

function renderTemplateComponents (templates, basePath, locals) {
  const templateComponents = Object
    .keys(templates)
    .reduce((componentMap, key) => {
      const templateComponent = buildTemplateComponent(templates[key], {
        basePath,
        locals
      })

      return {
        ...componentMap,
        [key]: {
          Component: templateComponent,
          html: renderTemplate(templates[key], {
            basePath,
            locals
          })
        }
      }
    }, {})

  return templateComponents
}

// TODO: Refactor this into method above
export function rehydrateClient (bootstrapData) {
  if (bootstrapData.templateComponents) {
    const templates = bootstrapData.templateComponents || {}

    const templateComponents = Object
      .keys(templates)
      .reduce((componentMap, key) => {
        const templateComponent = buildTemplateComponent(templates[key].html, {
          isClient: true
        })

        return {
          ...componentMap,
          [key]: {
            Component: templateComponent
          }
        }
      }, {})

    bootstrapData.templateComponents = templateComponents
  }

  return bootstrapData
}
