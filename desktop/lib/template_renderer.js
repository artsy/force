import invariant from 'invariant'
import jade from 'jade'

import {
  isArray,
  isString
} from 'underscore'

export default function templateRenderer (templates, options = {}) {
  const isValid = isArray(templates) || isString(templates)

  invariant(isValid,
    '(lib/template_renderer.js) ' +
    'Error rendering templates: `templates` must be a string or array of ' +
    'strings representing the path to the template'
  )

  templates = isArray(templates)
    ? templates
    : [templates]

  const templateFns = templates.map(file => {
    return jade.compileFile(file, {
      cache: true,
      ...options
    })
  })

  return {
    render: (locals = {}) => {
      const renderTemplate = locals => template => template(locals)

      return (
        templateFns.map(renderTemplate(locals))
      )
    }
  }
}
