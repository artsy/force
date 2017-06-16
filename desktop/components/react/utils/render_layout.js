import renderTemplate from 'desktop/components/react/utils/render_template'
import { isFunction, isString } from 'underscore'
import { renderToString } from 'react-dom/server'

const { NODE_ENV } = process.env

export default function renderLayout (options) {
  const {
    basePath = '',
    blocks: { header, body } = {},
    locals = {}
  } = options

  function render (block) {
    let html = ''

    // Jade template
    if (isJadeTemplate(block)) {
      html = renderTemplate(block, {
        basePath,
        locals
      })

      // Component
    } else if (isReactComponent(block)) {
      html = renderToString(block(locals))

      // String
    } else if (isString(block)) {
      html = block

      // Error
    } else {
      if (NODE_ENV === 'development') {
        throw new Error(
          '(components/reaect/utils/render_layout.js) ' +
          'Error rendering layout: `block` must be a j'
        )
      }
    }

    return html
  }

  const layout = renderTemplate('desktop/components/main_layout/templates/react_index.jade', {
    locals: {
      ...locals,
      header: render(header),
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
  if (isFunction(Component) && Component.prototype.render) {
    throw new Error(
      '(components/reaect/utils/render_layout.js) ' +
      'Error rendering layout: Component must be a stateless functional component'
    )
  } else {
    return isFunction(Component)
  }
}
