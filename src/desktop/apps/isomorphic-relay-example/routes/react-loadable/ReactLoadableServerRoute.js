import React from 'react'
import loadable from 'loadable-components'

const Example2 = loadable(() => import('./Example2'), {
  LoadingComponent: () => <div>Loading...</div>,
  ErrorComponent: () => <div>Error...</div>,
})

export function ReactLoadableServerRoute() {
  return (
    <div>
      <h1 style={{ fontSize: 30 }}>Another Example!</h1>
      <Example2 />
    </div>
  )
}
