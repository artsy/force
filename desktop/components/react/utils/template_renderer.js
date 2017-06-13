import invariant from 'invariant'
import jade from 'jade'
import path from 'path'
import { merge } from 'lodash'

import {
  first,
  isArray,
  isString
} from 'underscore'

const defaultOptions = {
  basePath: '',
  compilerOptions: {},
  locals: {}
}

export function makeTemplate (templates, opts = {}) {
  const isValid = isArray(templates) || isString(templates)

  invariant(isValid,
    '(lib/template_renderer.js) ' +
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
  } = merge(defaultOptions, opts)

  const templateFns = templates.map(file => {
    return jade.compileFile(path.join(basePath, file), {
      cache: true,
      ...compilerOptions
    })
  })

  const renderTemplate = locals => template => template(locals)
  const renderedTemplates = templateFns.map(renderTemplate(locals))

  // If user only passed in a single template, return a single template
  const out = renderedTemplates.length > 1
    ? renderedTemplates
    : first(renderedTemplates)

  return out
}
