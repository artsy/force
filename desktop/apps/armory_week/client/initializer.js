import React from 'react'
import ReactDOM from 'react-dom'
import { Cta } from 'desktop/apps/armory_week/components/Cta'

export const init = () =>
  ReactDOM.hydrate(<Cta {...window.__BOOTSTRAP__} />, document.getElementById('react-root-for-cta'))
