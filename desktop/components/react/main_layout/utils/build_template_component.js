import PropTypes from 'prop-types'
import React from 'react'

/**
 * Takes a string of html and returns a Component
 *
 * @param  {String} html
 * @return {Component}
 */
export default function buildTemplateComponent (html) {
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
