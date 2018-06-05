/* tslint:disable */

import { ConcreteRequest } from 'relay-runtime'
export type InquiryArtworkQueryVariables = {
  readonly artworkID: string
}
export type InquiryArtworkQueryResponse = {
  readonly artwork: ({}) | null
}

/*
query InquiryArtworkQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...InquiryArtwork_artwork
    __id
  }
}

fragment InquiryArtwork_artwork on Artwork {
  ...Artwork_artwork
  __id
}

fragment Artwork_artwork on Artwork {
  id
  image {
    url(version: "large")
    aspect_ratio
  }
  ...Metadata_artwork
  __id
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  __id
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message
  cultural_maker
  artists(shallow: true) {
    __id
    href
    name
  }
  collecting_institution
  partner(shallow: true) {
    name
    href
    __id
  }
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    __id
  }
  __id
}

fragment Contact_artwork on Artwork {
  _id
  href
  is_inquireable
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    __id
  }
  partner(shallow: true) {
    type
    __id
  }
  sale_artwork {
    highest_bid {
      display
      __id: id
    }
    opening_bid {
      display
    }
    counts {
      bidder_positions
    }
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'artworkID',
        type: 'String!',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'artworkID',
        type: 'String!',
      },
    ],
    v2 = {
      kind: 'ScalarField',
      alias: null,
      name: '__id',
      args: null,
      storageKey: null,
    },
    v3 = [
      {
        kind: 'Literal',
        name: 'shallow',
        value: true,
        type: 'Boolean',
      },
    ],
    v4 = {
      kind: 'ScalarField',
      alias: null,
      name: 'href',
      args: null,
      storageKey: null,
    },
    v5 = {
      kind: 'ScalarField',
      alias: null,
      name: 'name',
      args: null,
      storageKey: null,
    },
    v6 = {
      kind: 'ScalarField',
      alias: null,
      name: 'display',
      args: null,
      storageKey: null,
    }
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'InquiryArtworkQuery',
    id: null,
    text:
      'query InquiryArtworkQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...InquiryArtwork_artwork\n    __id\n  }\n}\n\nfragment InquiryArtwork_artwork on Artwork {\n  ...Artwork_artwork\n  __id\n}\n\nfragment Artwork_artwork on Artwork {\n  id\n  image {\n    url(version: "large")\n    aspect_ratio\n  }\n  ...Metadata_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  __id\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'InquiryArtworkQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'artwork',
          storageKey: null,
          args: v1,
          concreteType: 'Artwork',
          plural: false,
          selections: [
            {
              kind: 'FragmentSpread',
              name: 'InquiryArtwork_artwork',
              args: null,
            },
            v2,
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'InquiryArtworkQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'artwork',
          storageKey: null,
          args: v1,
          concreteType: 'Artwork',
          plural: false,
          selections: [
            {
              kind: 'LinkedField',
              alias: null,
              name: 'artists',
              storageKey: 'artists(shallow:true)',
              args: v3,
              concreteType: 'Artist',
              plural: true,
              selections: [v2, v4, v5],
            },
            {
              kind: 'ScalarField',
              alias: null,
              name: 'id',
              args: null,
              storageKey: null,
            },
            v4,
            {
              kind: 'ScalarField',
              alias: null,
              name: 'title',
              args: null,
              storageKey: null,
            },
            {
              kind: 'ScalarField',
              alias: null,
              name: 'date',
              args: null,
              storageKey: null,
            },
            {
              kind: 'ScalarField',
              alias: null,
              name: 'sale_message',
              args: null,
              storageKey: null,
            },
            {
              kind: 'ScalarField',
              alias: null,
              name: 'cultural_maker',
              args: null,
              storageKey: null,
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'image',
              storageKey: null,
              args: null,
              concreteType: 'Image',
              plural: false,
              selections: [
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'url',
                  args: [
                    {
                      kind: 'Literal',
                      name: 'version',
                      value: 'large',
                      type: '[String]',
                    },
                  ],
                  storageKey: 'url(version:"large")',
                },
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'aspect_ratio',
                  args: null,
                  storageKey: null,
                },
              ],
            },
            {
              kind: 'ScalarField',
              alias: null,
              name: 'collecting_institution',
              args: null,
              storageKey: null,
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'partner',
              storageKey: 'partner(shallow:true)',
              args: v3,
              concreteType: 'Partner',
              plural: false,
              selections: [
                v5,
                v4,
                v2,
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'type',
                  args: null,
                  storageKey: null,
                },
              ],
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'sale',
              storageKey: null,
              args: null,
              concreteType: 'Sale',
              plural: false,
              selections: [
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'is_auction',
                  args: null,
                  storageKey: null,
                },
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'is_live_open',
                  args: null,
                  storageKey: null,
                },
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'is_open',
                  args: null,
                  storageKey: null,
                },
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'is_closed',
                  args: null,
                  storageKey: null,
                },
                v2,
              ],
            },
            v2,
            {
              kind: 'ScalarField',
              alias: null,
              name: '_id',
              args: null,
              storageKey: null,
            },
            {
              kind: 'ScalarField',
              alias: null,
              name: 'is_inquireable',
              args: null,
              storageKey: null,
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'sale_artwork',
              storageKey: null,
              args: null,
              concreteType: 'SaleArtwork',
              plural: false,
              selections: [
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'highest_bid',
                  storageKey: null,
                  args: null,
                  concreteType: 'SaleArtworkHighestBid',
                  plural: false,
                  selections: [
                    v6,
                    {
                      kind: 'ScalarField',
                      alias: '__id',
                      name: 'id',
                      args: null,
                      storageKey: null,
                    },
                  ],
                },
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'opening_bid',
                  storageKey: null,
                  args: null,
                  concreteType: 'SaleArtworkOpeningBid',
                  plural: false,
                  selections: [v6],
                },
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'counts',
                  storageKey: null,
                  args: null,
                  concreteType: 'SaleArtworkCounts',
                  plural: false,
                  selections: [
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'bidder_positions',
                      args: null,
                      storageKey: null,
                    },
                  ],
                },
                v2,
              ],
            },
          ],
        },
      ],
    },
  }
})()
;(node as any).hash = 'eb94957e52e758f2900df09788731187'
export default node
