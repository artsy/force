import PropTypes from 'prop-types'
import React from 'react'
import { ContextProvider } from '@artsy/reaction-force/dist/Components/Artsy'
import Wizard from '@artsy/reaction-force/dist/Components/Onboarding/Wizard'
import CollectorIntent from '@artsy/reaction-force/dist/Components/Onboarding/Steps/CollectorIntent'
import Artists from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Artists'
import Genes from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Genes'
import Budget from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Budget'

export class App extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    redirectTo: PropTypes.string,
    forceStep: PropTypes.string
  }

  render () {
    return (
      <ContextProvider currentUser={this.props.currentUser} >
        <Wizard
          stepComponents={[CollectorIntent, Artists, Genes, Budget]}
          redirectTo={this.props.redirectTo}
          forceStep={this.props.forceStep}
        />
      </ContextProvider>
    )
  }
}
