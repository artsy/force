import React from 'react'

export const routes = [
  {
    Component: props => <div>{props.children}</div>,
    path: '/artwork2',
    children: [
      {
        path: '/',
        Component: () => <div>New artwork page! :)</div>,
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
