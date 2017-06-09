import Layout from 'desktop/components/main_layout/templates/layout.jsx'
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
