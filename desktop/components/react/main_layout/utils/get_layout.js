import path from 'path'
import { makeTemplate } from 'desktop/components/react/utils/template_renderer'
import { makeTemplateComponent } from '../index'

const defaultLayout = [
  '_header.jade',
  '_body.jade',
  '_footer.jade'
]
  .map(templatePath => {
    return path.join(__dirname, '../../../main_layout/templates/layout/', templatePath)
  })

export default function getLayout (locals = {}, layout = defaultLayout) {
  const [header, body, footer] = makeTemplate(layout, { locals })

  return {
    Header: makeTemplateComponent(header),
    Body: makeTemplateComponent(body),
    Footer: makeTemplateComponent(footer)
  }
}
