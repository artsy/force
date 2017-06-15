import capitalize from 'underscore.string/capitalize'
import getForceLayout from './get_force_layout'
import buildTemplateComponent from './build_template_component'

/**
 * Utility for working with React and Jade layout code on the server. If raw
 * template html is passed in as locals it will return renderable components for
 * use in Express jsx views.
 *
 * @example
 *
 * // routes.js
 * import renderTemplate from 'components/react/utils/render_template'
 *
 * // Can also pass in an array to return an array
 * const meta = renderTemplate('meta.jade', { locals: res.locals })
 *
 * res.render('index.jsx', {
 *   templates: {
 *     meta // html string
 *   }
 * })
 *
 * // templates/index.jsx
 * import { buildReactLayout } from 'components/react/main_layout'
 *
 * export default IndexRoute (props) {
 *   const { Layout: { Header, Body, Footer }, Meta } = buildReactLayout(props)
 *
 *   return (
 *     <div>
 *       <Header>
 *         <Meta />
 *       </Header>
 *       <Body>
 *         ...
 *       </Body>
 *       <Footer />
 *     </div>
 *   )
 * }
 *
 * @param  {Object} [templates={}] Optional templates to map into React components
 * @param  {Object} locals          Data to render into components
 * @return {Object}
 */
export default function buildReactLayout (options) {
  const { templates = {}, ...locals } = options || {}
  const layout = getForceLayout(locals)

  /**
   * Map over user-supplied templates and return renderable <Component />s. Keys located
   * in `templates` are transformed into typical capital-case form and the html content
   * is set via dangerouslySetInnerHTML.
   */
  const componentMap = Object
    .keys(templates)
    .reduce((components, key) => {
      const Name = capitalize(key)
      const Component = buildTemplateComponent(templates[key])

      return {
        ...components,
        [Name]: Component
      }
    }, {})

  return {
    Layout: {
      ...layout
    },
    ...componentMap
  }
}
