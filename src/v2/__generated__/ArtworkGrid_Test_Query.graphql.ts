/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkGrid_Test_QueryVariables = {};
export type ArtworkGrid_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artist">;
    } | null;
};
export type ArtworkGrid_Test_QueryRawResponse = {
    readonly artist: ({
        readonly artworks_connection: ({
            readonly __isArtworkConnectionInterface: "ArtworkConnection";
            readonly edges: ReadonlyArray<({
                readonly __typename: string;
                readonly node: ({
                    readonly id: string;
                    readonly slug: string;
                    readonly href: string | null;
                    readonly internalID: string;
                    readonly image: ({
                        readonly aspect_ratio: number;
                        readonly placeholder: string | null;
                        readonly url: string | null;
                        readonly resized: ({
                            readonly src: string;
                            readonly srcSet: string;
                            readonly width: number | null;
                            readonly height: number | null;
                        }) | null;
                    }) | null;
                    readonly title: string | null;
                    readonly image_title: string | null;
                    readonly artistNames: string | null;
                    readonly is_saved: boolean | null;
                    readonly date: string | null;
                    readonly sale_message: string | null;
                    readonly cultural_maker: string | null;
                    readonly artists: ReadonlyArray<({
                        readonly id: string;
                        readonly href: string | null;
                        readonly name: string | null;
                    }) | null> | null;
                    readonly collecting_institution: string | null;
                    readonly partner: ({
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly id: string;
                        readonly type: string | null;
                    }) | null;
                    readonly sale: ({
                        readonly endAt: string | null;
                        readonly cascadingEndTimeIntervalMinutes: number | null;
                        readonly extendedBiddingIntervalMinutes: number | null;
                        readonly startAt: string | null;
                        readonly is_auction: boolean | null;
                        readonly is_closed: boolean | null;
                        readonly id: string;
                        readonly is_live_open: boolean | null;
                        readonly is_open: boolean | null;
                        readonly is_preview: boolean | null;
                        readonly display_timely_at: string | null;
                        readonly extendedBiddingPeriodMinutes: number | null;
                    }) | null;
                    readonly sale_artwork: ({
                        readonly lotID: string | null;
                        readonly lotLabel: string | null;
                        readonly endAt: string | null;
                        readonly extendedBiddingEndAt: string | null;
                        readonly formattedEndDateTime: string | null;
                        readonly counts: ({
                            readonly bidder_positions: number | null;
                        }) | null;
                        readonly highest_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly opening_bid: ({
                            readonly display: string | null;
                        }) | null;
                        readonly id: string;
                    }) | null;
                    readonly attributionClass: ({
                        readonly name: string | null;
                        readonly id: string;
                    }) | null;
                    readonly mediumType: ({
                        readonly filterGene: ({
                            readonly name: string | null;
                            readonly id: string;
                        }) | null;
                    }) | null;
                    readonly is_inquireable: boolean | null;
                    readonly is_biddable: boolean | null;
                    readonly saleArtwork: ({
                        readonly endAt: string | null;
                        readonly extendedBiddingEndAt: string | null;
                        readonly lotID: string | null;
                        readonly id: string;
                    }) | null;
                }) | null;
                readonly __isNode: string;
                readonly id: string;
            }) | null> | null;
        }) | null;
        readonly id: string;
    }) | null;
};
export type ArtworkGrid_Test_Query = {
    readonly response: ArtworkGrid_Test_QueryResponse;
    readonly variables: ArtworkGrid_Test_QueryVariables;
    readonly rawResponse: ArtworkGrid_Test_QueryRawResponse;
};



/*
query ArtworkGrid_Test_Query {
  artist(id: "pablo-picasso") {
    ...ArtworkGrid_artist
    id
  }
}

fragment ArtworkGrid_artist on Artist {
  artworks_connection: artworksConnection(first: 4) {
    ...ArtworkGrid_artworks
  }
}

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  __isArtworkConnectionInterface: __typename
  edges {
    __typename
    node {
      id
      slug
      href
      internalID
      image {
        aspect_ratio: aspectRatio
      }
      ...GridItem_artwork
      ...FlatGridItem_artwork
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
}

fragment Badge_artwork on Artwork {
  is_biddable: isBiddable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Contact_artwork on Artwork {
  href
  is_inquireable: isInquireable
  sale {
    is_auction: isAuction
    is_live_open: isLiveOpen
    is_open: isOpen
    is_closed: isClosed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork: saleArtwork {
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collecting_institution: collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    endAt
    cascadingEndTimeIntervalMinutes
    extendedBiddingIntervalMinutes
    startAt
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    lotID
    lotLabel
    endAt
    extendedBiddingEndAt
    formattedEndDateTime
    counts {
      bidder_positions: bidderPositions
    }
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    id
  }
  ...NewSaveButton_artwork
  ...HoverDetails_artwork
}

fragment FlatGridItem_artwork on Artwork {
  ...Metadata_artwork
  ...SaveButton_artwork
  sale {
    extendedBiddingPeriodMinutes
    extendedBiddingIntervalMinutes
    startAt
    id
  }
  saleArtwork {
    endAt
    extendedBiddingEndAt
    lotID
    id
  }
  internalID
  title
  image_title: imageTitle
  image {
    resized(width: 445, version: ["normalized", "larger", "large"]) {
      src
      srcSet
      width
      height
    }
  }
  artistNames
  href
  is_saved: isSaved
}

fragment GridItem_artwork on Artwork {
  internalID
  title
  image_title: imageTitle
  image {
    placeholder
    url(version: "large")
    aspect_ratio: aspectRatio
  }
  artistNames
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}

fragment HoverDetails_artwork on Artwork {
  internalID
  attributionClass {
    name
    id
  }
  mediumType {
    filterGene {
      name
      id
    }
  }
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment NewSaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "pablo-picasso"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v9 = [
  (v4/*: any*/),
  (v1/*: any*/)
],
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkGrid_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkGrid_artist"
          }
        ],
        "storageKey": "artist(id:\"pablo-picasso\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkGrid_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": "artworks_connection",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 4
              }
            ],
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "internalID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "aspect_ratio",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "aspectRatio",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "placeholder",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": "large"
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": "url(version:\"large\")"
                              },
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": [
                                      "normalized",
                                      "larger",
                                      "large"
                                    ]
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 445
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "src",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "srcSet",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "width",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "height",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:445)"
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": "image_title",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "imageTitle",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artistNames",
                            "storageKey": null
                          },
                          {
                            "alias": "is_saved",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSaved",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": "sale_message",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "saleMessage",
                            "storageKey": null
                          },
                          {
                            "alias": "cultural_maker",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "culturalMaker",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": "artists(shallow:true)"
                          },
                          {
                            "alias": "collecting_institution",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "collectingInstitution",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v2/*: any*/),
                              (v1/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "type",
                                "storageKey": null
                              }
                            ],
                            "storageKey": "partner(shallow:true)"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Sale",
                            "kind": "LinkedField",
                            "name": "sale",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "cascadingEndTimeIntervalMinutes",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "extendedBiddingIntervalMinutes",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "startAt",
                                "storageKey": null
                              },
                              {
                                "alias": "is_auction",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isAuction",
                                "storageKey": null
                              },
                              {
                                "alias": "is_closed",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isClosed",
                                "storageKey": null
                              },
                              (v1/*: any*/),
                              {
                                "alias": "is_live_open",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isLiveOpen",
                                "storageKey": null
                              },
                              {
                                "alias": "is_open",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isOpen",
                                "storageKey": null
                              },
                              {
                                "alias": "is_preview",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isPreview",
                                "storageKey": null
                              },
                              {
                                "alias": "display_timely_at",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "displayTimelyAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "extendedBiddingPeriodMinutes",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "sale_artwork",
                            "args": null,
                            "concreteType": "SaleArtwork",
                            "kind": "LinkedField",
                            "name": "saleArtwork",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v5/*: any*/),
                              (v7/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "formattedEndDateTime",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "SaleArtworkCounts",
                                "kind": "LinkedField",
                                "name": "counts",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": "bidder_positions",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "bidderPositions",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": "highest_bid",
                                "args": null,
                                "concreteType": "SaleArtworkHighestBid",
                                "kind": "LinkedField",
                                "name": "highestBid",
                                "plural": false,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              },
                              (v1/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": (v9/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkMedium",
                            "kind": "LinkedField",
                            "name": "mediumType",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Gene",
                                "kind": "LinkedField",
                                "name": "filterGene",
                                "plural": false,
                                "selections": (v9/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "is_inquireable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isInquireable",
                            "storageKey": null
                          },
                          {
                            "alias": "is_biddable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isBiddable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtwork",
                            "kind": "LinkedField",
                            "name": "saleArtwork",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v7/*: any*/),
                              (v6/*: any*/),
                              (v1/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArtworkConnectionInterface",
                "abstractKey": "__isArtworkConnectionInterface"
              }
            ],
            "storageKey": "artworksConnection(first:4)"
          },
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"pablo-picasso\")"
      }
    ]
  },
  "params": {
    "cacheID": "e239ea9dfe4db2fb63120894f4cbd786",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.artworks_connection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "artist.artworks_connection.__isArtworkConnectionInterface": (v10/*: any*/),
        "artist.artworks_connection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "artist.artworks_connection.edges.__isNode": (v10/*: any*/),
        "artist.artworks_connection.edges.__typename": (v10/*: any*/),
        "artist.artworks_connection.edges.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artist.artworks_connection.edges.node.artistNames": (v12/*: any*/),
        "artist.artworks_connection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artist.artworks_connection.edges.node.artists.href": (v12/*: any*/),
        "artist.artworks_connection.edges.node.artists.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node.artists.name": (v12/*: any*/),
        "artist.artworks_connection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artist.artworks_connection.edges.node.attributionClass.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node.attributionClass.name": (v12/*: any*/),
        "artist.artworks_connection.edges.node.collecting_institution": (v12/*: any*/),
        "artist.artworks_connection.edges.node.cultural_maker": (v12/*: any*/),
        "artist.artworks_connection.edges.node.date": (v12/*: any*/),
        "artist.artworks_connection.edges.node.href": (v12/*: any*/),
        "artist.artworks_connection.edges.node.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.artworks_connection.edges.node.image.aspect_ratio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "artist.artworks_connection.edges.node.image.placeholder": (v12/*: any*/),
        "artist.artworks_connection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artist.artworks_connection.edges.node.image.resized.height": (v13/*: any*/),
        "artist.artworks_connection.edges.node.image.resized.src": (v10/*: any*/),
        "artist.artworks_connection.edges.node.image.resized.srcSet": (v10/*: any*/),
        "artist.artworks_connection.edges.node.image.resized.width": (v13/*: any*/),
        "artist.artworks_connection.edges.node.image.url": (v12/*: any*/),
        "artist.artworks_connection.edges.node.image_title": (v12/*: any*/),
        "artist.artworks_connection.edges.node.internalID": (v11/*: any*/),
        "artist.artworks_connection.edges.node.is_biddable": (v14/*: any*/),
        "artist.artworks_connection.edges.node.is_inquireable": (v14/*: any*/),
        "artist.artworks_connection.edges.node.is_saved": (v14/*: any*/),
        "artist.artworks_connection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artist.artworks_connection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artist.artworks_connection.edges.node.mediumType.filterGene.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node.mediumType.filterGene.name": (v12/*: any*/),
        "artist.artworks_connection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artist.artworks_connection.edges.node.partner.href": (v12/*: any*/),
        "artist.artworks_connection.edges.node.partner.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node.partner.name": (v12/*: any*/),
        "artist.artworks_connection.edges.node.partner.type": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artist.artworks_connection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v13/*: any*/),
        "artist.artworks_connection.edges.node.sale.display_timely_at": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale.endAt": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale.extendedBiddingIntervalMinutes": (v13/*: any*/),
        "artist.artworks_connection.edges.node.sale.extendedBiddingPeriodMinutes": (v13/*: any*/),
        "artist.artworks_connection.edges.node.sale.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node.sale.is_auction": (v14/*: any*/),
        "artist.artworks_connection.edges.node.sale.is_closed": (v14/*: any*/),
        "artist.artworks_connection.edges.node.sale.is_live_open": (v14/*: any*/),
        "artist.artworks_connection.edges.node.sale.is_open": (v14/*: any*/),
        "artist.artworks_connection.edges.node.sale.is_preview": (v14/*: any*/),
        "artist.artworks_connection.edges.node.sale.startAt": (v12/*: any*/),
        "artist.artworks_connection.edges.node.saleArtwork": (v15/*: any*/),
        "artist.artworks_connection.edges.node.saleArtwork.endAt": (v12/*: any*/),
        "artist.artworks_connection.edges.node.saleArtwork.extendedBiddingEndAt": (v12/*: any*/),
        "artist.artworks_connection.edges.node.saleArtwork.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node.saleArtwork.lotID": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork": (v15/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artist.artworks_connection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artist.artworks_connection.edges.node.sale_artwork.endAt": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork.extendedBiddingEndAt": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork.formattedEndDateTime": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artist.artworks_connection.edges.node.sale_artwork.highest_bid.display": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork.id": (v11/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork.lotID": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork.lotLabel": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artist.artworks_connection.edges.node.sale_artwork.opening_bid.display": (v12/*: any*/),
        "artist.artworks_connection.edges.node.sale_message": (v12/*: any*/),
        "artist.artworks_connection.edges.node.slug": (v11/*: any*/),
        "artist.artworks_connection.edges.node.title": (v12/*: any*/),
        "artist.id": (v11/*: any*/)
      }
    },
    "name": "ArtworkGrid_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkGrid_Test_Query {\n  artist(id: \"pablo-picasso\") {\n    ...ArtworkGrid_artist\n    id\n  }\n}\n\nfragment ArtworkGrid_artist on Artist {\n  artworks_connection: artworksConnection(first: 4) {\n    ...ArtworkGrid_artworks\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    resized(width: 445, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n  is_saved: isSaved\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();
(node as any).hash = '51ca8aab02eda0c71128e6460a6425fe';
export default node;
