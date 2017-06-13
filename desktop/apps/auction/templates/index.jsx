import PropTypes from 'prop-types'
import React from 'react'

export default function IndexRoute ({ html }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

IndexRoute.propTypes = {
  html: PropTypes.string.isRequired
}
