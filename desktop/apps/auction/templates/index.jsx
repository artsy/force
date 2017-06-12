import Layout from 'desktop/components/react/main_layout/layout.jsx'
import PropTypes from 'prop-types'
import React from 'react'

export default function IndexRoute (props) {
  return (
    <Layout {...props}>
      It works!!!
    </Layout>
  )
}

IndexRoute.propTypes = {
  html: PropTypes.string.isRequired
}
