import PropTypes from 'prop-types'
import React from 'react'
import buildReactLayout from './build_react_layout'
import invariant from 'invariant'
import renderTemplate from 'desktop/components/react/utils/render_template'
import { isEmpty } from 'underscore'

export default function withLayout (Component) {
  const LayoutWrapper = (props) => {
    const { templates, ...options } = props
    const renderedTemplates = renderTemplates(templates, options)

    const {
      Layout,
      ...Templates
    } = buildReactLayout({
      ...props,
      templates: renderedTemplates
    })

    return (
      <Component
        {...props.locals}
        Layout={Layout}
        Templates={Templates}
      />
    )
  }

  LayoutWrapper.propTypes = {
    locals: PropTypes.object,
    templates: PropTypes.object
  }

  LayoutWrapper.defaultProps = {
    locals: {},
    templates: {}
  }

  return LayoutWrapper
}

// Helpers

function renderTemplates (templates, options) {
  if (isEmpty(templates)) {
    return {}
  }

  const rendered = Object
    .keys(templates)
    .reduce((components, template) => {
      const file = templates[template]
      const isValid = file.includes('.jade')

      invariant(isValid,
        '(components/react/layout/utils/with_layout_hoc.js)' +
        'Error building layout: Template must be a `.jade` file.'
      )

      return {
        ...components,
        [template]: renderTemplate(file, options)
      }
    }, {})

  return rendered
}
