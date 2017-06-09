import path from 'path'
import templateRenderer from 'desktop/lib/template_renderer'
import { makePartial } from '../templates/partial_component'

const defaultLayout = [
  '../templates/layout/_header.jade',
  '../templates/layout/_body.jade',
  '../templates/layout/_footer.jade'
]
  .map(templatePath => {
    return path.join(__dirname, templatePath)
  })

export default function getLayout (layout = defaultLayout) {
  return {
    render: (locals) => {
      const [header, body, footer] = templateRenderer(layout).render(locals)

      return {
        Header: makePartial(header),
        Body: makePartial(body),
        Footer: makePartial(footer)
      }
    }
  }
}
