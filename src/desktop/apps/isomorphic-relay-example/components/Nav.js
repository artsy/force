import React from 'react'
import { Link } from 'found'
import { PreloadLink } from 'desktop/lib/isomorphic-relay/PreloadLink'

export default function Nav() {
  return (
    <ul>
      <li>
        <Link to="/isomorphic-relay-example">Home</Link>
      </li>
      <li>
        <Link to="/isomorphic-relay-example/about">About</Link>
      </li>
      <li>
        <PreloadLink to="/isomorphic-relay-example/artsy/pablo-picasso">
          Artsy
        </PreloadLink>
      </li>
      <li>
        <PreloadLink to="/isomorphic-relay-example/artist/pablo-picasso">
          Pablo Picasso
        </PreloadLink>
      </li>
      <li>
        <PreloadLink to="/isomorphic-relay-example/artist/pablo-picasso/auction/shared-live-mocktion-k8s">
          Artist + Artsy Auction (nested queries)
        </PreloadLink>
      </li>
      <li>
        <PreloadLink
          immediate
          to="/isomorphic-relay-example/auction/shared-live-mocktion-k8s"
        >
          Auction (loads immediately in the background)
        </PreloadLink>
      </li>
      <li>
        <Link to="/isomorphic-relay-example/react-loadable/client">
          React Loadable - Clientside
        </Link>
      </li>
      <li>
        <Link to="/isomorphic-relay-example/react-loadable/server">
          React Loadable - SSR
        </Link>
      </li>
    </ul>
  )
}
