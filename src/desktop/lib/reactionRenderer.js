import React from 'react'
import ReactDOM from 'react-dom'
import { Artwork } from 'reaction/Components/Artwork'
import { ArtworkGrid } from 'reaction/Components/ArtworkGrid'
import { Fillwidth } from 'reaction/Components/Artwork/Fillwidth'
import { ServerStyleSheet } from 'styled-components'
import { data as sd } from 'sharify'
import { renderToString } from 'react-dom/server'
import { isFunction, uniqueId } from 'lodash'

export class ReactionRenderer {
  id
  mode
  type
  res
  props

  constructor({ mode = 'server', res }) {
    this.mode = mode
    this.res = res
  }

  artworkBrick(props) {
    this.props = props
    this.type = this.artworkBrick.name

    const html = this.render(props => {
      return <Artwork artwork={artwork} useRelay={false} />
    })
    return html
  }

  artworkGrid(props) {
    this.props = props
    this.type = this.artworkGrid.name

    const html = this.render(props => {
      return (
        <ArtworkGrid
          columnCount={props.columnCount || 3}
          artworks={artworks}
          useRelay={false}
        />
      )
    })
    return html
  }

  fillWidth(props) {
    this.props = props
    this.type = this.fillWidth.name

    const html = this.render(props => {
      return <Fillwidth artworks={artworks} useRelay={false} />
    })
    return html
  }

  /**
   * Sharify automatically passes over data to the client. Once render is called
   * on the server append block and wait for client-side mount, which will then
   * deserialize and rehydrate.
   */
  addToQueue(block) {
    try {
      if (this.mode === 'server') {
        this.res.locals.sharify.data.reactionBlocks.push(block)
      } else {
        if (!sd.reactionBlocks) {
          sd.reactionBlocks = []
        }

        sd.reactionBlocks.push(block)
      }
    } catch (error) {
      console.error('(lib/reactionRenderer) Error adding to queue:', error)
    }
  }

  serialize() {
    this.id = this.props.mountId || uniqueId('react-mount-reaction-')

    this.addToQueue({
      mode: this.mode,
      id: this.id,
      type: this.type,
      props: this.props,
    })
  }

  deserialize(block) {
    this.mode = 'client'
    this.id = block.id
    this.type = block.type
    this.props = block.props

    const blockType = this[this.type].bind(this)

    if (isFunction(blockType)) {
      blockType(this.props)
    }
  }

  render(blockType) {
    try {
      if (this.mode === 'server') {
        const sheet = new ServerStyleSheet()
        const html = renderToString(sheet.collectStyles(blockType(this.props)))
        const css = sheet.getStyleTags()
        this.serialize()
        const out = [`<div id=${this.id}></div>`, css, html].join('\n')
        return out
      } else {
        // Add timeout so that client-side-only templates have a chance to mount
        // before react attachment / rehydration occurs.
        setTimeout(() => {
          if (this.mode === 'runtime') {
            this.serialize()
          }

          ReactDOM.hydrate(
            blockType(this.props),
            document.getElementById(this.id)
          )
        }, 0)
      }
    } catch (error) {
      console.error(
        `(lib/reactionRenderer) Error rendering ${this.mode}-side:`,
        error
      )
    }
  }
}

module.exports.middleware = (req, res, next) => {
  const renderer = new ReactionRenderer({
    mode: 'server',
    res,
  })

  res.locals.reaction = renderer
  res.locals.sharify.data.reactionBlocks = []

  next()
}

// Fixtures: FIXME: (move)

const artwork = {
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
}

const artworks = {
  edges: [
    {
      node: {
        __id: 'QXJ0d29yazpiYW5rc3ktd2UtbG92ZS15b3Utc28tbG92ZS11cw==',
        image: {
          aspect_ratio: 1,
          placeholder: '100%',
          url:
            'https://d32dm0rphc51dk.cloudfront.net/hoFocUdpgF4mazPIgekpZA/large.jpg',
        },
        href: '/artwork/banksy-we-love-you-so-love-us',
        title: 'We Love You So Love Us',
        date: '2000',
        sale_message: 'Contact For Price',
        cultural_maker: null,
        artists: [
          {
            __id: 'QXJ0aXN0OmJhbmtzeQ==',
            href: '/artist/banksy',
            name: 'Banksy',
          },
        ],
        collecting_institution: null,
        partner: {
          name: 'EHC Fine Art',
          href: '/ehc-fine-art',
          __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
          type: 'Gallery',
        },
        sale: null,
        _id: '58e1a19d275b247d353ff0d9',
        is_inquireable: true,
        sale_artwork: null,
        id: 'banksy-we-love-you-so-love-us',
        is_saved: null,
      },
    },
    {
      node: {
        __id: 'QXJ0d29yazpiYW5rc3ktcmFkYXItcmF0LWRpcnR5LWZ1bmtlci1scA==',
        image: {
          aspect_ratio: 1,
          placeholder: '100%',
          url:
            'https://d32dm0rphc51dk.cloudfront.net/NQvnb87U8oGDm6kpdJ9jLA/large.jpg',
        },
        href: '/artwork/banksy-radar-rat-dirty-funker-lp',
        title: 'Radar Rat (Dirty Funker LP)',
        date: '2008',
        sale_message: '$950',
        cultural_maker: null,
        artists: [
          {
            __id: 'QXJ0aXN0OmJhbmtzeQ==',
            href: '/artist/banksy',
            name: 'Banksy',
          },
        ],
        collecting_institution: null,
        partner: {
          name: 'EHC Fine Art',
          href: '/ehc-fine-art',
          __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
          type: 'Gallery',
        },
        sale: null,
        _id: '58e1a19ecd530e4d612cb07f',
        is_inquireable: true,
        sale_artwork: null,
        id: 'banksy-radar-rat-dirty-funker-lp',
        is_saved: null,
      },
    },
    {
      node: {
        __id: 'QXJ0d29yazpiYW5rc3ktZmxvd2VyLWJvbWJlci1ieS1icmFuZGFsaXNt',
        image: {
          aspect_ratio: 1.5,
          placeholder: '66.66666666666666%',
          url:
            'https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/large.jpg',
        },
        href: '/artwork/banksy-flower-bomber-by-brandalism',
        title: 'Flower Bomber (by Brandalism)',
        date: 'ca. 2017',
        sale_message: 'Contact For Price',
        cultural_maker: null,
        artists: [
          {
            __id: 'QXJ0aXN0OmJhbmtzeQ==',
            href: '/artist/banksy',
            name: 'Banksy',
          },
        ],
        collecting_institution: null,
        partner: {
          name: 'EHC Fine Art',
          href: '/ehc-fine-art',
          __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
          type: 'Gallery',
        },
        sale: null,
        _id: '58e1a19f275b247d353ff0e2',
        is_inquireable: true,
        sale_artwork: null,
        id: 'banksy-flower-bomber-by-brandalism',
        is_saved: null,
      },
    },
    {
      node: {
        __id: 'QXJ0d29yazpiYW5rc3ktZ2lybC13aXRoLWJhbGxvb24tMTQ=',
        image: {
          aspect_ratio: 0.75,
          placeholder: '132.9%',
          url:
            'https://d32dm0rphc51dk.cloudfront.net/RRGE9Ild18_IPghZXT6wuQ/large.jpg',
        },
        href: '/artwork/banksy-girl-with-balloon-14',
        title: 'Girl With Balloon',
        date: '2004',
        sale_message: 'Contact For Price',
        cultural_maker: null,
        artists: [
          {
            __id: 'QXJ0aXN0OmJhbmtzeQ==',
            href: '/artist/banksy',
            name: 'Banksy',
          },
        ],
        collecting_institution: null,
        partner: {
          name: 'Graffik Gallery / Banksy Editions',
          href: '/graffik-gallery-slash-banksy-editions',
          __id: 'UGFydG5lcjpncmFmZmlrLWdhbGxlcnktc2xhc2gtYmFua3N5LWVkaXRpb25z',
          type: 'Gallery',
        },
        sale: null,
        _id: '58e370659c18db774f25ed5b',
        is_inquireable: true,
        sale_artwork: null,
        id: 'banksy-girl-with-balloon-14',
        is_saved: null,
      },
    },
    {
      node: {
        __id: 'QXJ0d29yazpiYW5rc3ktd2UtbG92ZS15b3Utc28tbG92ZS11cw==',
        image: {
          aspect_ratio: 1,
          placeholder: '100%',
          url:
            'https://d32dm0rphc51dk.cloudfront.net/hoFocUdpgF4mazPIgekpZA/large.jpg',
        },
        href: '/artwork/banksy-we-love-you-so-love-us',
        title: 'We Love You So Love Us',
        date: '2000',
        sale_message: 'Contact For Price',
        cultural_maker: null,
        artists: [
          {
            __id: 'QXJ0aXN0OmJhbmtzeQ==',
            href: '/artist/banksy',
            name: 'Banksy',
          },
        ],
        collecting_institution: null,
        partner: {
          name: 'EHC Fine Art',
          href: '/ehc-fine-art',
          __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
          type: 'Gallery',
        },
        sale: null,
        _id: '58e1a19d275b247d353ff0d9',
        is_inquireable: true,
        sale_artwork: null,
        id: 'banksy-we-love-you-so-love-us',
        is_saved: null,
      },
    },
    {
      node: {
        __id: 'QXJ0d29yazpiYW5rc3ktcmFkYXItcmF0LWRpcnR5LWZ1bmtlci1scA==',
        image: {
          aspect_ratio: 1,
          placeholder: '100%',
          url:
            'https://d32dm0rphc51dk.cloudfront.net/NQvnb87U8oGDm6kpdJ9jLA/large.jpg',
        },
        href: '/artwork/banksy-radar-rat-dirty-funker-lp',
        title: 'Radar Rat (Dirty Funker LP)',
        date: '2008',
        sale_message: '$950',
        cultural_maker: null,
        artists: [
          {
            __id: 'QXJ0aXN0OmJhbmtzeQ==',
            href: '/artist/banksy',
            name: 'Banksy',
          },
        ],
        collecting_institution: null,
        partner: {
          name: 'EHC Fine Art',
          href: '/ehc-fine-art',
          __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
          type: 'Gallery',
        },
        sale: null,
        _id: '58e1a19ecd530e4d612cb07f',
        is_inquireable: true,
        sale_artwork: null,
        id: 'banksy-radar-rat-dirty-funker-lp',
        is_saved: null,
      },
    },
    {
      node: {
        __id: 'QXJ0d29yazpiYW5rc3ktZmxvd2VyLWJvbWJlci1ieS1icmFuZGFsaXNt',
        image: {
          aspect_ratio: 1.5,
          placeholder: '66.66666666666666%',
          url:
            'https://d32dm0rphc51dk.cloudfront.net/88LaQZxzQdksn76f0LGFoQ/large.jpg',
        },
        href: '/artwork/banksy-flower-bomber-by-brandalism',
        title: 'Flower Bomber (by Brandalism)',
        date: 'ca. 2017',
        sale_message: 'Contact For Price',
        cultural_maker: null,
        artists: [
          {
            __id: 'QXJ0aXN0OmJhbmtzeQ==',
            href: '/artist/banksy',
            name: 'Banksy',
          },
        ],
        collecting_institution: null,
        partner: {
          name: 'EHC Fine Art',
          href: '/ehc-fine-art',
          __id: 'UGFydG5lcjplaGMtZmluZS1hcnQ=',
          type: 'Gallery',
        },
        sale: null,
        _id: '58e1a19f275b247d353ff0e2',
        is_inquireable: true,
        sale_artwork: null,
        id: 'banksy-flower-bomber-by-brandalism',
        is_saved: null,
      },
    },
    {
      node: {
        __id: 'QXJ0d29yazpiYW5rc3ktZ2lybC13aXRoLWJhbGxvb24tMTQ=',
        image: {
          aspect_ratio: 0.75,
          placeholder: '132.9%',
          url:
            'https://d32dm0rphc51dk.cloudfront.net/RRGE9Ild18_IPghZXT6wuQ/large.jpg',
        },
        href: '/artwork/banksy-girl-with-balloon-14',
        title: 'Girl With Balloon',
        date: '2004',
        sale_message: 'Contact For Price',
        cultural_maker: null,
        artists: [
          {
            __id: 'QXJ0aXN0OmJhbmtzeQ==',
            href: '/artist/banksy',
            name: 'Banksy',
          },
        ],
        collecting_institution: null,
        partner: {
          name: 'Graffik Gallery / Banksy Editions',
          href: '/graffik-gallery-slash-banksy-editions',
          __id: 'UGFydG5lcjpncmFmZmlrLWdhbGxlcnktc2xhc2gtYmFua3N5LWVkaXRpb25z',
          type: 'Gallery',
        },
        sale: null,
        _id: '58e370659c18db774f25ed5b',
        is_inquireable: true,
        sale_artwork: null,
        id: 'banksy-girl-with-balloon-14',
        is_saved: null,
      },
    },
  ],
}
