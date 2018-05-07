import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Artwork as ReactionArtwork } from '@artsy/reaction/dist/Components/Artwork'
import { ArtworkGrid as ReactionArtworkGrid } from '@artsy/reaction/dist/Components/ArtworkGrid'
import { Tooltip } from '@artsy/reaction/dist/Components/Tooltip'
import { Help } from '@artsy/reaction/dist/Assets/Icons/Help'

export const TooltipQuestion = props => {
  return (
    <Tooltip {...props}>
      <Help />
    </Tooltip>
  )
}

export const Artwork = props => <ReactionArtwork {...props} useRelay={false} />

export class ArtworkGrid extends Component {
  static propTypes = {
    artworks: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      artworks: props.artworks || [],
    }

    // NOTE: Reaction's ArtworkGrid has its own conception of infinite scroll
    // which is enabled when `onLoadMore` is passed in. Since we're detecting
    // scroll thresholds from backbone and thus externally, this callback can
    // be used instead. See desktop/components/artwork_masonry/view.coffee for
    // an example implementation
    if (props.onAppendArtworks) {
      props.onAppendArtworks(this.appendArtworks)
    }
  }

  appendArtworks = artworks => {
    this.setState({
      artworks,
    })
  }

  render() {
    const artworks = mapToRelayConnection(this.state.artworks)

    return (
      <ReactionArtworkGrid
        {...this.props}
        artworks={artworks}
        useRelay={false}
      />
    )
  }
}

export const Fillwidth = props => {
  if (typeof window !== 'undefined') {
    const {
      Fillwidth: ReactionFillWidth,
    } = require('@artsy/reaction/dist/Components/Artwork/Fillwidth')

    const artworks = mapToRelayConnection(props.artworks) // eslint-disable-line

    return <ReactionFillWidth {...props} artworks={artworks} useRelay={false} />
  } else {
    return ''
  }
}

// Helpers

// Ensure that old artwork collections conform to new Relay connection api
const mapToRelayConnection = artworks => {
  return {
    edges: artworks.map(artwork => {
      return {
        node: artwork,
      }
    }),
  }
}

// export const artwork = {
//   id: 'mikael-olson-some-kind-of-dinosaur',
//   title: 'Some Kind of Dinosaur',
//   date: '2015',
//   sale_message: '$875',
//   is_in_auction: false,
//   image: {
//     placeholder: 200,
//     // only required prop
//     url:
//       'https://d32dm0rphc51dk.cloudfront.net/w6h1rYqIqhhCRE5f0_fxMQ/larger.jpg',
//     aspect_ratio: 0.74,
//   },
//   artists: [
//     {
//       __id: 'mikael-olson',
//       name: 'Mikael Olson',
//     },
//   ],
//   partner: {
//     name: 'Gallery 1261',
//   },
//   href: '/artwork/mikael-olson-some-kind-of-dinosaur',
// }

// export const artworks = {
//   edges: [
//     {
//       node: {
//         __id: 'QXJ0d29yazpiYW5rc3ktd2UtbG92ZS15b3Utc28tbG92ZS11cw==',
//         image: {
//           aspect_ratio: 1,
//           placeholder: '100%',
//           url:
//             'https://d32dm0rphc51dk.cloudfront.net/hoFocUdpgF4mazPIgekpZA/large.jpg',
//         },
//         href: '/artwork/banksy-we-love-you-so-love-us',
//         title: 'We Love You So Love Us',
//         date: '2000',
//         sale_message: 'Contact For Price',
//         cultural_maker: null,
//         artists: [
//           {
//             __id: 'QXJ0aXN0OmJhbmtzeQ==',
//             href: '/artist/banksy',
//             name: 'Banksy',
//           },
//         ],
//         collecting_institution: null,
//         partner: {
//           name: 'EHC Fine Art',
//           href: '/ehc-fine-art',
//           __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
//           type: 'Gallery',
//         },
//         sale: null,
//         _id: '58e1a19d275b247d353ff0d9',
//         is_inquireable: true,
//         sale_artwork: null,
//         id: 'banksy-we-love-you-so-love-us',
//         is_saved: null,
//       },
//     },
//     {
//       node: {
//         __id: 'QXJ0d29yazpiYW5rc3ktcmFkYXItcmF0LWRpcnR5LWZ1bmtlci1scA==',
//         image: {
//           aspect_ratio: 1,
//           placeholder: '100%',
//           url:
//             'https://d32dm0rphc51dk.cloudfront.net/NQvnb87U8oGDm6kpdJ9jLA/large.jpg',
//         },
//         href: '/artwork/banksy-radar-rat-dirty-funker-lp',
//         title: 'Radar Rat (Dirty Funker LP)',
//         date: '2008',
//         sale_message: '$950',
//         cultural_maker: null,
//         artists: [
//           {
//             __id: 'QXJ0aXN0OmJhbmtzeQ==',
//             href: '/artist/banksy',
//             name: 'Banksy',
//           },
//         ],
//         collecting_institution: null,
//         partner: {
//           name: 'EHC Fine Art',
//           href: '/ehc-fine-art',
//           __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
//           type: 'Gallery',
//         },
//         sale: null,
//         _id: '58e1a19ecd530e4d612cb07f',
//         is_inquireable: true,
//         sale_artwork: null,
//         id: 'banksy-radar-rat-dirty-funker-lp',
//         is_saved: null,
//       },
//     },
//     {
//       node: {
//         __id: 'QXJ0d29yazpiYW5rc3ktZmxvd2VyLWJvbWJlci1ieS1icmFuZGFsaXNt',
//         image: {
//           aspect_ratio: 1.5,
//           placeholder: '66.66666666666666%',
//           url:
//             'https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/large.jpg',
//         },
//         href: '/artwork/banksy-flower-bomber-by-brandalism',
//         title: 'Flower Bomber (by Brandalism)',
//         date: 'ca. 2017',
//         sale_message: 'Contact For Price',
//         cultural_maker: null,
//         artists: [
//           {
//             __id: 'QXJ0aXN0OmJhbmtzeQ==',
//             href: '/artist/banksy',
//             name: 'Banksy',
//           },
//         ],
//         collecting_institution: null,
//         partner: {
//           name: 'EHC Fine Art',
//           href: '/ehc-fine-art',
//           __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
//           type: 'Gallery',
//         },
//         sale: null,
//         _id: '58e1a19f275b247d353ff0e2',
//         is_inquireable: true,
//         sale_artwork: null,
//         id: 'banksy-flower-bomber-by-brandalism',
//         is_saved: null,
//       },
//     },
//     {
//       node: {
//         __id: 'QXJ0d29yazpiYW5rc3ktZ2lybC13aXRoLWJhbGxvb24tMTQ=',
//         image: {
//           aspect_ratio: 0.75,
//           placeholder: '132.9%',
//           url:
//             'https://d32dm0rphc51dk.cloudfront.net/RRGE9Ild18_IPghZXT6wuQ/large.jpg',
//         },
//         href: '/artwork/banksy-girl-with-balloon-14',
//         title: 'Girl With Balloon',
//         date: '2004',
//         sale_message: 'Contact For Price',
//         cultural_maker: null,
//         artists: [
//           {
//             __id: 'QXJ0aXN0OmJhbmtzeQ==',
//             href: '/artist/banksy',
//             name: 'Banksy',
//           },
//         ],
//         collecting_institution: null,
//         partner: {
//           name: 'Graffik Gallery / Banksy Editions',
//           href: '/graffik-gallery-slash-banksy-editions',
//           __id: 'UGFydG5lcjpncmFmZmlrLWdhbGxlcnktc2xhc2gtYmFua3N5LWVkaXRpb25z',
//           type: 'Gallery',
//         },
//         sale: null,
//         _id: '58e370659c18db774f25ed5b',
//         is_inquireable: true,
//         sale_artwork: null,
//         id: 'banksy-girl-with-balloon-14',
//         is_saved: null,
//       },
//     },
//     {
//       node: {
//         __id: 'QXJ0d29yazpiYW5rc3ktd2UtbG92ZS15b3Utc28tbG92ZS11cw==',
//         image: {
//           aspect_ratio: 1,
//           placeholder: '100%',
//           url:
//             'https://d32dm0rphc51dk.cloudfront.net/hoFocUdpgF4mazPIgekpZA/large.jpg',
//         },
//         href: '/artwork/banksy-we-love-you-so-love-us',
//         title: 'We Love You So Love Us',
//         date: '2000',
//         sale_message: 'Contact For Price',
//         cultural_maker: null,
//         artists: [
//           {
//             __id: 'QXJ0aXN0OmJhbmtzeQ==',
//             href: '/artist/banksy',
//             name: 'Banksy',
//           },
//         ],
//         collecting_institution: null,
//         partner: {
//           name: 'EHC Fine Art',
//           href: '/ehc-fine-art',
//           __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
//           type: 'Gallery',
//         },
//         sale: null,
//         _id: '58e1a19d275b247d353ff0d9',
//         is_inquireable: true,
//         sale_artwork: null,
//         id: 'banksy-we-love-you-so-love-us',
//         is_saved: null,
//       },
//     },
//     {
//       node: {
//         __id: 'QXJ0d29yazpiYW5rc3ktcmFkYXItcmF0LWRpcnR5LWZ1bmtlci1scA==',
//         image: {
//           aspect_ratio: 1,
//           placeholder: '100%',
//           url:
//             'https://d32dm0rphc51dk.cloudfront.net/NQvnb87U8oGDm6kpdJ9jLA/large.jpg',
//         },
//         href: '/artwork/banksy-radar-rat-dirty-funker-lp',
//         title: 'Radar Rat (Dirty Funker LP)',
//         date: '2008',
//         sale_message: '$950',
//         cultural_maker: null,
//         artists: [
//           {
//             __id: 'QXJ0aXN0OmJhbmtzeQ==',
//             href: '/artist/banksy',
//             name: 'Banksy',
//           },
//         ],
//         collecting_institution: null,
//         partner: {
//           name: 'EHC Fine Art',
//           href: '/ehc-fine-art',
//           __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
//           type: 'Gallery',
//         },
//         sale: null,
//         _id: '58e1a19ecd530e4d612cb07f',
//         is_inquireable: true,
//         sale_artwork: null,
//         id: 'banksy-radar-rat-dirty-funker-lp',
//         is_saved: null,
//       },
//     },
//     {
//       node: {
//         __id: 'QXJ0d29yazpiYW5rc3ktZmxvd2VyLWJvbWJlci1ieS1icmFuZGFsaXNt',
//         image: {
//           aspect_ratio: 1.5,
//           placeholder: '66.66666666666666%',
//           url:
//             'https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/large.jpg',
//         },
//         href: '/artwork/banksy-flower-bomber-by-brandalism',
//         title: 'Flower Bomber (by Brandalism)',
//         date: 'ca. 2017',
//         sale_message: 'Contact For Price',
//         cultural_maker: null,
//         artists: [
//           {
//             __id: 'QXJ0aXN0OmJhbmtzeQ==',
//             href: '/artist/banksy',
//             name: 'Banksy',
//           },
//         ],
//         collecting_institution: null,
//         partner: {
//           name: 'EHC Fine Art',
//           href: '/ehc-fine-art',
//           __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
//           type: 'Gallery',
//         },
//         sale: null,
//         _id: '58e1a19f275b247d353ff0e2',
//         is_inquireable: true,
//         sale_artwork: null,
//         id: 'banksy-flower-bomber-by-brandalism',
//         is_saved: null,
//       },
//     },
//     {
//       node: {
//         __id: 'QXJ0d29yazpiYW5rc3ktZ2lybC13aXRoLWJhbGxvb24tMTQ=',
//         image: {
//           aspect_ratio: 0.75,
//           placeholder: '132.9%',
//           url:
//             'https://d32dm0rphc51dk.cloudfront.net/RRGE9Ild18_IPghZXT6wuQ/large.jpg',
//         },
//         href: '/artwork/banksy-girl-with-balloon-14',
//         title: 'Girl With Balloon',
//         date: '2004',
//         sale_message: 'Contact For Price',
//         cultural_maker: null,
//         artists: [
//           {
//             __id: 'QXJ0aXN0OmJhbmtzeQ==',
//             href: '/artist/banksy',
//             name: 'Banksy',
//           },
//         ],
//         collecting_institution: null,
//         partner: {
//           name: 'Graffik Gallery / Banksy Editions',
//           href: '/graffik-gallery-slash-banksy-editions',
//           __id: 'UGFydG5lcjpncmFmZmlrLWdhbGxlcnktc2xhc2gtYmFua3N5LWVkaXRpb25z',
//           type: 'Gallery',
//         },
//         sale: null,
//         _id: '58e370659c18db774f25ed5b',
//         is_inquireable: true,
//         sale_artwork: null,
//         id: 'banksy-girl-with-balloon-14',
//         is_saved: null,
//       },
//     },
//   ],
// }
