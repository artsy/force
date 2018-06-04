import React from 'react'
import loadable from 'loadable-components'

const Example1 = loadable(
  () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(import(/* webpackChunkName: "Example1" */ './Example1'))
      }, 300)
    })
  },
  {
    LoadingComponent: () => <div>Loading...</div>,
    ErrorComponent: () => <div>Error...</div>,
  }
)

export function ReactLoadableClientRoute() {
  return (
    <div>
      <h1 style={{ fontSize: 30 }}>ReactLoadableClient!</h1>
      <Example1 />
    </div>
  )
}
