import path from 'path'
import templateRenderer from 'desktop/components/react/utils/template_renderer'
import { makePartial } from './partial'

const defaultLayout = [
  '_header.jade',
  '_body.jade',
  '_footer.jade'
]
  .map(templatePath => {
    return path.join(__dirname, '../../../main_layout/templates/layout/', templatePath)
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
