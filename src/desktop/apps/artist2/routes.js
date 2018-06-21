import React from 'react'
import { Artist } from '@artsy/reaction/dist/Styleguide/Pages/Artist'

export const routes = [
  {
    Component: props => <div>{props.children}</div>,
    path: '/artist2',
    children: [
      {
        path: '/',
        Component: () => {
          return <Artist />
        },
      },
      {
        path: '/:artistID',
        Component: props => (
          <div>New artist page for {props.params.artistID}</div>
        ),
      },
    ],
  },
]
