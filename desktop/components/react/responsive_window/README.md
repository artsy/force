# `<ResponsiveWindow />`

A Redux-oriented React component that listens for changes to the window size and dispatches an action. Additionally, exports an action and a reducer for use throughout other sections of the app, matching on `RESIZE_WINDOW` and updating `isMobile` to `true` if window width is less or equal to 650px.

## Usage with Redux

```javascript
// reducers.js
import { combineReducers } from 'redux'
import { composeReducers } from 'components/react/utils/compose_reducers'
import { responsiveWindowReducer } from 'components/react/responsive_window'

function myMainReducer(state, action) {
  ...
}

export default combineReducers({
  someAppState: composeReducers(
    myMainReducer,
    responsiveWindowReducer
  )
})

// my_app.js
import ResponsiveWindow from 'components/react/responsive_window'

export default function MyApp() {
  return (
    <ResponsiveWindow>
      <App />
    </ResponsiveWindow
  )
}

// app.js
export default function App({ isMobile }) {
  return (
    <div>
      { isMobile
        ? <MobileView />
        : <DesktopView /> }
    </div>
  )
}
```

## Usage without Redux

```javascript
import ResponsiveWindow from 'components/react/responsive_window'

function handleWindowChange(innerWidth) {
  console.log(innerWidth)
}

export default function MyApp() {
  return (
    <ResponsiveWindow onChange={handleWindowChange}>
      <App />
    </ResponsiveWindow
  )
}
```
