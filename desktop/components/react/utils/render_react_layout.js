import React from 'react'
import renderTemplate from 'desktop/components/react/utils/render_template'
import buildTemplateComponent from 'desktop/components/react/utils/build_template_component'
import { isFunction, isString } from 'underscore'
import { renderToString } from 'react-dom/server'

export default function renderReactLayout (options) {
  const {
    basePath = '',
    blocks: { head, body } = {},
    locals = {}, // Typically a spread from `res.locals`, or global state
    data = {},   // Data relevant to components / subapp
    templates = {}
  } = options

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
      const Component = block // Alias for JSX transpilation
      const templateComponents = renderTemplateComponents(templates, basePath, data)

      html = renderToString(
        <Component
          {...data}
          templateComponents={templateComponents}
        />
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

  const layout = renderTemplate('desktop/components/main_layout/templates/react_index.jade', {
    locals: {
      ...locals,
      data,
      header: render(head),
      body: render(body)
    }
  })

  return layout
}

// Helpers

function isJadeTemplate (fileName) {
  return isString(fileName) && fileName.includes('.jade')
}

function isReactComponent (Component) {
  if (!isFunction(Component)) {
    throw new Error(
      '(components/reaect/utils/render_react_layout.js) ' +
      'Error rendering layout: Invalid React component'
    )
  } else {
    return Component
  }
}

function renderTemplateComponents (templates, basePath, locals) {
  const templateComponents = Object
    .keys(templates)
    .reduce((componentMap, key) => ({
      ...componentMap,
      [key]: buildTemplateComponent(templates[key], {
        basePath,
        locals
      })
    }), {})

  return templateComponents
}
