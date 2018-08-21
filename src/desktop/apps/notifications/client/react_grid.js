import $ from 'jquery'

import imagesLoaded from 'imagesloaded'
imagesLoaded.makeJQueryPlugin($)

import React from 'react'
import ReactDOM from 'react-dom'
import { Contents as WorksForYouContent } from 'reaction/Styleguide/Components/WorksForYou'
import { ContextProvider } from 'reaction/Components/Artsy'

import CurrentUser from '../../../models/current_user.coffee'

function setupReactGrid() {
  const user = CurrentUser.orNull()
  ReactDOM.render(
    <ContextProvider currentUser={user ? user.toJSON() : null}>
      <WorksForYouContent />
    </ContextProvider>,
    document.getElementById('notifications-react-works')
  )
}

export default { setupReactGrid }
