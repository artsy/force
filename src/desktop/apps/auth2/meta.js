import PropTypes from 'prop-types'
import React from 'react'

export const AuthenticationMeta = props => {
  const { meta: { description, title } } = props

  return (
    <div>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />
    </div>
  )
}

AuthenticationMeta.propTypes = {
  meta: PropTypes.object,
}
