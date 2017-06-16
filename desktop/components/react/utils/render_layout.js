import renderTemplate from 'desktop/components/react/utils/render_template'
import { isFunction, isString } from 'underscore'
import { renderToString } from 'react-dom/server'

export default function renderLayout (props) {
  const {
    basePath = '',
    blocks: { header, body } = {},
    locals = {}
  } = props

  function render (block) {
    let html

    // Passing in Jade template
    if (isString(block)) {
      html = renderTemplate(block, { basePath, locals })

      // Passing in Component
    } else if (isFunction(block)) {
      html = renderToString(block(locals))
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
