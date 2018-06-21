import React from 'react'
import { Artwork } from '@artsy/reaction/dist/Styleguide/Pages/Artwork'

export const routes = [
  {
    Component: props => <div>{props.children}</div>,
    path: '/artwork2',
    children: [
      {
        path: '/',
        Component: () => {
          return <Artwork />
        },
      },
      {
        path: '/:artworkID',
        Component: props => (
          <div>New artwork page for {props.params.artworkID}</div>
        ),
      },
    ],
  },
]
