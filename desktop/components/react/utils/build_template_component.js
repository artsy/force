import PropTypes from 'prop-types'
import React from 'react'
import renderTemplate from './render_template'

/**
 * Takes a string of html and returns a Component
 *
 * @param  {String} html
 * @return {Component}
 */
export default function buildTemplateComponent (template, options) {
  const TemplateComponent = ({ children }) => {
    return (
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: renderTemplate(template, options)
          }}
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
