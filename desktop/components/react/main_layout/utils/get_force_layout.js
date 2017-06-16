import path from 'path'
import renderTemplate from 'desktop/components/react/utils/render_template'
import buildTemplateComponent from './build_template_component'

const defaultLayout = [
  '_header.jade',
  '_body.jade',
  '_footer.jade'
]
  .map(templatePath => {
    return path.resolve(__dirname, '../../../../../',
      'desktop/components/main_layout/templates/layout', templatePath
    )
  })

export default function getForceLayout (locals = {}, layout = defaultLayout) {
  const [header, body, footer] = renderTemplate(layout, { locals })

  return {
    Header: buildTemplateComponent(header),
    Body: buildTemplateComponent(body),
    Footer: buildTemplateComponent(footer)
  }
}
