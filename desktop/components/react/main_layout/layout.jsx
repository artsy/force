import PropTypes from 'prop-types'
import React from 'react'
import capitalize from 'underscore.string/capitalize'
import getLayout from './utils/get_layout'

export default function Layout ({ children, ...props }) {
  const { Header, Body, Footer } = getLayout().render(props)

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

export function makeLayout ({ templates = {}, ...props }) {
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
    ...layout,
    ...componentMap
  }
}

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
