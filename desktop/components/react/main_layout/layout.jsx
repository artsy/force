import PropTypes from 'prop-types'
import React from 'react'
import capitalize from 'underscore.string/capitalize'
import getLayout from './utils/get_layout'

/**
 * Utility for working with React and Jade layout code on the server. If raw
 * template html is passed in as props it will return renderable components for
 * use in Express jsx views.
 *
 * @example
 *
 * // routes.js
 * import { makeTemplate } from 'components/react/utils/template_renderer'
 *
 * const [meta] = makeTemplate(['meta.jade']).render(res.locals)
 *
 * res.render('index.jsx', {
 *   templates: {
 *     meta // html string
 *   }
 * })
 *
 * // templates/index.jsx
 * import { makeLayout } from 'components/react/main_layout'
 *
 * export default IndexRoute (props) {
 *   const { Layout: { Header, Body, Footer }, Meta } = makeLayout(props)
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
 * @param  {Object} props          Data to render into components
 * @return {Object}
 */
export function makeLayout ({ templates, ...props } = { templates: {} }) {
  const layout = getLayout().render(props)

  /**
   * Map over user-supplied templates and return renderable <Component />s. Keys located
   * in `templates` are transformed into typical capital-case form and the html content
   * is set via dangerouslySetInnerHTML.
   */
  const componentMap = Object
    .keys(templates)
    .reduce((components, key) => {
      const Name = capitalize(key)
      const Component = makeTemplateComponent(templates[key])

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

/**
 * Takes a string of html and returns a Component
 *
 * @param  {String} html
 * @return {Component}
 */
export function makeTemplateComponent (html) {
  const TemplateComponent = ({ children }) => {
    return (
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {children}
      </div>
    )
  }

  TemplateComponent.propTypes = {
    children: PropTypes.node
  }

  return TemplateComponent
}

/**
 * Default layout, without custom header or footer content.
 *
 * @example
 *
 * import { Layout } from 'components/react/main_layout'
 *
 * export default IndexRoute (props) {
 *   return (
 *     <Layout {...props}>
 *       ...
 *     </Layout>
 *   )
 * }
 *
 * @param {Object} children Child content to render
 * @param {Object} props Data to render into layout
 */
export function Layout ({ children, ...props }) {
  const {
    Header,
    Body,
    Footer
  } = getLayout().render(props)

  return (
    <div>
      <Header />
      <Body>
        {children}
      </Body>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
