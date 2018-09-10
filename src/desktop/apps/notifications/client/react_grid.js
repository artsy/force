import $ from 'jquery'

// import imagesLoaded from 'imagesloaded'
// imagesLoaded.makeJQueryPlugin($)

import React from 'react'
import ReactDOM from 'react-dom'
import { WorksForYou } from 'reaction/Apps/WorksForYou'

import { ContextProvider } from 'reaction/Artsy'

import CurrentUser from '../../../models/current_user.coffee'

function setupReactGrid(options = {}) {
  const user = CurrentUser.orNull()
  const { artistID, forSale } = options

  ReactDOM.render(
    <ContextProvider user={user ? user.toJSON() : null}>
      <WorksForYou forSale={forSale} artistID={artistID || ''} />
    </ContextProvider>,
    document.getElementById('notifications-react-works')
  )
}

export default { setupReactGrid }
