// import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import { ContextProvider } from '@artsy/reaction-force/dist/Components/Artsy'
import Wizard from '@artsy/reaction-force/dist/Components/Onboarding/Wizard'
import CollectorIntent from '@artsy/reaction-force/dist/Components/Onboarding/Steps/CollectorIntent'
import Artists from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Artists'
import Genes from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Genes'
import Budget from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Budget'
const sd = require('sharify').data
export default class App extends React.Component {
  render () {
    return (
      <ContextProvider currentUser={sd.CURRENT_USER} >
        <Wizard stepComponents={[CollectorIntent, Artists, Genes, Budget]} />
      </ContextProvider>
    )
  }
}
