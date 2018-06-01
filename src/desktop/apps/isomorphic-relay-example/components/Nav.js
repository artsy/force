import React, { Fragment } from 'react'
import { Link, PreloadLink } from 'reaction/Router'

export default function Nav() {
  return (
    <ul>
      <li>
        <Link to="/isomorphic-relay-example">Home</Link>
      </li>
      <li>
        <PreloadLink to="/isomorphic-relay-example/artsy/pablo-picasso">
          {({ isLoading }) => {
            return <Fragment>ArtworkGrid {isLoading && `[loading]`} </Fragment>
          }}
        </PreloadLink>
      </li>
      <li>
        <PreloadLink to="/isomorphic-relay-example/artist/pablo-picasso">
          {({ isLoading }) => {
            return (
              <Fragment>
                Pablo Picasso (loads on link click) {isLoading && `[loading]`}
              </Fragment>
            )
          }}
        </PreloadLink>
      </li>

      {/* <li>
        <PreloadLink
          immediate
          to="/isomorphic-relay-example/auction/shared-live-mocktion-k8s"
        >
          Auction (loads immediately in the background)
        </PreloadLink>
      </li>
      <li>
        <PreloadLink to="/isomorphic-relay-example/artist/pablo-picasso/auction/shared-live-mocktion-k8s">
          Artist + Artsy Auction (nested queries, loads on click)
        </PreloadLink>
      </li>
      <li>
        <Link to="/isomorphic-relay-example/react-loadable/client">
          Async bundle splitting - Example 1
        </Link>
      </li>
      <li>
        <Link to="/isomorphic-relay-example/react-loadable/server">
          Async bundle splitting - Example 2
        </Link>
      </li> */}
    </ul>
  )
}
