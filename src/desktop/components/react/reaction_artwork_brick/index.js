import React from 'react'
import { renderToString } from 'react-dom/server'
import { RelayStubProvider } from 'desktop/components/react/RelayStubProvider'
import Artwork from '@artsy/reaction/dist/Components/Artwork'

export function renderArtworkBrick(props = {}) {
  // TODO: Make this entirely dynamic
  const artworkProps = {
    id: 'mikael-olson-some-kind-of-dinosaur',
    title: 'Some Kind of Dinosaur',
    date: '2015',
    sale_message: '$875',
    is_in_auction: false,
    image: {
      placeholder: 200,
      // only required prop
      url:
        'https://d32dm0rphc51dk.cloudfront.net/w6h1rYqIqhhCRE5f0_fxMQ/larger.jpg',
      aspect_ratio: 0.74,
    },
    artists: [
      {
        __id: 'mikael-olson',
        name: 'Mikael Olson',
      },
    ],
    partner: {
      name: 'Gallery 1261',
    },
    href: '/artwork/mikael-olson-some-kind-of-dinosaur',
    ...props,
  }

  try {
    const out = renderToString(
      <RelayStubProvider>
        <Artwork artwork={artworkProps} />
      </RelayStubProvider>
    )
    return out
  } catch (error) {
    console.log(error)
  }
}
