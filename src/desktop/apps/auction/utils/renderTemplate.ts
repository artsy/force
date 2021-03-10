import jade from "jade"
import path from "path"
import { first, isArray } from "lodash"

type RenderOptions = {
  basePath?: string,
  compilerOptions?: object,
  locals?: object,
}

export default function renderTemplate(templates: string, options: RenderOptions): string;
export default function renderTemplate(templates: string[], options: RenderOptions): string[];
export default function renderTemplate(templates: string | string[], options: RenderOptions = {}): string | string[] {
  const normalizedTemplates = isArray(templates) ? templates : [templates]

  const { basePath = "", compilerOptions = {}, locals = {} } = options

  const templateFns = normalizedTemplates.map(file => {
    return jade.compileFile(path.join(basePath, file), compilerOptions) as (obj: any) => string
  })

  const renderedTemplates = templateFns.map(template => template(locals))

  // If user only passed in a single template, return a single template
  const out =
    renderedTemplates.length > 1 ? renderedTemplates : first(renderedTemplates)

  return out
}
