import React from 'react'
import renderTemplate from 'desktop/components/react/utils/renderTemplate'
import buildTemplateComponent from 'desktop/components/react/utils/buildTemplateComponent'
import { isFunction, isString } from 'underscore'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

/**
 * Utility for rendering a React-based isomorphic app. Note that Once html has
 * been sent over the wire it still needs to be rehydrated on the client.
 *
 * See: https://github.com/artsy/force/tree/master/desktop/apps/react_example
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
    mainLayout = 'desktop/components/main_layout/templates/react_index.jade',
    templates = {}
  } = options

  const templateComponents = renderTemplateComponents(
    templates,
    basePath,
    data
  )

  const { html: headHTML } = render(head)
  const { html: bodyHTML, css } = render(body)

  const layout = renderTemplate(mainLayout, {
    locals: {
      ...locals,
      data: {
        ...data,
        templateComponents
      },
      header: headHTML,
      body: bodyHTML,
      css
    }
  })

  function render (block) {
    let html = ''
    let css = ''

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
      const sheet = new ServerStyleSheet()

      html = renderToString(
        sheet.collectStyles(
          <Component
            {...data}
            templateComponents={templateComponents}
          />
        )
      )

      css = sheet.getStyleTags()

      // String
    } else if (isString(block)) {
      html = block

      // Error
    } else {
      if (process.env.NODE_ENV === 'development') {
        throw new Error(
          '(components/reaect/utils/renderReactLayout.js) ' +
          'Error rendering layout: `block` must be a Jade template, React ' +
          'component or string'
        )
      }
    }

    return {
      html,
      css
    }
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
      '(components/reaect/utils/renderReactLayout.js) ' +
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
  if (bootstrapData && bootstrapData.templateComponents) {
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
