import jade from 'jade'
import path from 'path'
import { first, isArray } from 'underscore'

export default function renderTemplate(templates, options = {}) {
  templates = isArray(templates) ? templates : [templates]

  const { basePath = '', compilerOptions = {}, locals = {} } = options

  const templateFns = templates.map((file) => {
    return jade.compileFile(path.join(basePath, file), compilerOptions)
  })

  const renderedTemplates = templateFns.map((template) => template(locals))

  // If user only passed in a single template, return a single template
  const out =
    renderedTemplates.length > 1 ? renderedTemplates : first(renderedTemplates)

  return out
}
