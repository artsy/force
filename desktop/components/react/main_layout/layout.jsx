import PropTypes from 'prop-types'
import React from 'react'
import getForceLayout from './utils/get_force_layout'

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
export default function Layout ({ children, ...props }) {
  const { Header, Body, Footer } = getForceLayout(props)

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
