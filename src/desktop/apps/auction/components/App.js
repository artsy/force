import DOM from "desktop/apps/auction/components/DOM"
import Layout from "desktop/apps/auction/components/Layout"
import PropTypes from "prop-types"
import React, { Component } from "react"
import ResponsiveWindow from "desktop/components/react/responsive_window"
import { Provider } from "react-redux"
import { Theme } from "@artsy/palette"

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Theme>
        <Provider store={this.props.store}>
          <ResponsiveWindow>
            <DOM>
              <Layout />
            </DOM>
          </ResponsiveWindow>
        </Provider>
      </Theme>
    )
  }
}
