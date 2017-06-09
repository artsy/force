import invariant from 'invariant'
import jade from 'jade'
import path from 'path'

import {
  first,
  isArray,
  isString,
  defaults
} from 'underscore'

const defaultOptions = {
  basePath: '',
  compilerOptions: {},
  locals: {}
}

export default function renderTemplate (templates, opts = {}) {
  const isValid = isArray(templates) || isString(templates)

  invariant(isValid,
    '(components/react/utils/render_template.js) ' +
    'Error rendering templates: `templates` must be a string or array of ' +
    'strings representing the path to the template'
  )

  templates = isArray(templates)
    ? templates
    : [templates]

  const {
    basePath,
    compilerOptions,
    locals
  } = defaults(opts, defaultOptions)

  const templateFns = templates.map(file => {
    return jade.compileFile(path.join(basePath, file), {
      cache: false,
      ...compilerOptions
    })
  })

  const renderedTemplates = templateFns.map(template => template(locals))

  // If user only passed in a single template, return a single template
  const out = renderedTemplates.length > 1
    ? renderedTemplates
    : first(renderedTemplates)

  return out
}
