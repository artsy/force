import PropTypes from 'prop-types'
import React from 'react'

export function makePartial (html) {
  const PartialComponent = ({ children }) => {
    return (
      <div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {children}
      </div>
    )
  }

  PartialComponent.propTypes = {
    children: PropTypes.node
  }

  return PartialComponent
}
