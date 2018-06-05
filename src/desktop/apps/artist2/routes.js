import React from 'react'

export const routes = [
  {
    Component: props => <div>{props.children}</div>,
    path: '/artist2',
    children: [
      {
        path: '/',
        Component: () => <div>New artist page! :)</div>,
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
