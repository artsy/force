/**
 * @generated SignedSource<<e9f1ba1b00b4de152a765281148e6189>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkGrid_Test_Query$variables = {};
export type ArtworkGrid_Test_Query$data = {
  readonly artworksConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  } | null;
};
export type ArtworkGrid_Test_Query$rawResponse = {
  readonly artworksConnection: {
    readonly __isArtworkConnectionInterface: "FilterArtworksConnection";
    readonly edges: ReadonlyArray<{
      readonly __typename: string;
      readonly __isNode: string;
      readonly id: string;
      readonly node: {
        readonly artist: {
          readonly id: string;
          readonly targetSupply: {
            readonly isP1: boolean | null;
          } | null;
        } | null;
        readonly artistNames: string | null;
        readonly artists: ReadonlyArray<{
          readonly href: string | null;
          readonly id: string;
          readonly name: string | null;
        } | null> | null;
        readonly attributionClass: {
          readonly id: string;
          readonly name: string | null;
        } | null;
        readonly collecting_institution: string | null;
        readonly cultural_maker: string | null;
        readonly date: string | null;
        readonly href: string | null;
        readonly id: string;
        readonly image: {
          readonly aspectRatio: number;
          readonly placeholder: string | null;
          readonly resized: {
            readonly height: number | null;
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null;
          } | null;
          readonly url: string | null;
        } | null;
        readonly imageTitle: string | null;
        readonly image_title: string | null;
        readonly internalID: string;
        readonly is_biddable: boolean | null;
        readonly is_saved: boolean | null;
        readonly marketPriceInsights: {
          readonly demandRank: number | null;
        } | null;
        readonly mediumType: {
          readonly filterGene: {
            readonly id: string;
            readonly name: string | null;
          } | null;
        } | null;
        readonly partner: {
          readonly href: string | null;
          readonly id: string;
          readonly name: string | null;
        } | null;
        readonly sale: {
          readonly cascadingEndTimeIntervalMinutes: number | null;
          readonly display_timely_at: string | null;
          readonly endAt: string | null;
          readonly extendedBiddingIntervalMinutes: number | null;
          readonly extendedBiddingPeriodMinutes: number | null;
          readonly id: string;
          readonly is_auction: boolean | null;
          readonly is_closed: boolean | null;
          readonly is_preview: boolean | null;
          readonly startAt: string | null;
        } | null;
        readonly saleArtwork: {
          readonly endAt: string | null;
          readonly extendedBiddingEndAt: string | null;
          readonly id: string;
          readonly lotID: string | null;
        } | null;
        readonly sale_artwork: {
          readonly counts: {
            readonly bidder_positions: any | null;
          } | null;
          readonly endAt: string | null;
          readonly extendedBiddingEndAt: string | null;
          readonly formattedEndDateTime: string | null;
          readonly highest_bid: {
            readonly display: string | null;
          } | null;
          readonly id: string;
          readonly lotID: string | null;
          readonly lotLabel: string | null;
          readonly opening_bid: {
            readonly display: string | null;
          } | null;
        } | null;
        readonly sale_message: string | null;
        readonly slug: string;
        readonly title: string | null;
      } | null;
    } | null> | null;
    readonly id: string;
  } | null;
};
export type ArtworkGrid_Test_Query = {
  rawResponse: ArtworkGrid_Test_Query$rawResponse;
  response: ArtworkGrid_Test_Query$data;
  variables: ArtworkGrid_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
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
v3 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v4 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v10 = [
  (v5/*: any*/),
  (v1/*: any*/)
],
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v16 = {
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
        "concreteType": "FilterArtworksConnection",
        "kind": "LinkedField",
        "name": "artworksConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkGrid_artworks"
          }
        ],
        "storageKey": "artworksConnection(first:4)"
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
        "concreteType": "FilterArtworksConnection",
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
                            "alias": null,
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
                              (v3/*: any*/)
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:[\"larger\",\"large\"])"
                          },
                          {
                            "alias": null,
                            "args": [
                              (v3/*: any*/),
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
                            "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
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
                        "alias": null,
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
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtistTargetSupply",
                            "kind": "LinkedField",
                            "name": "targetSupply",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isP1",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkPriceInsights",
                        "kind": "LinkedField",
                        "name": "marketPriceInsights",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "demandRank",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v4/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          (v5/*: any*/)
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
                        "args": (v4/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v2/*: any*/),
                          (v1/*: any*/)
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
                          (v6/*: any*/),
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
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v6/*: any*/),
                          (v8/*: any*/),
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
                            "selections": (v9/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v9/*: any*/),
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
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
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": (v10/*: any*/),
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
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          }
                        ],
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
                          (v6/*: any*/),
                          (v8/*: any*/),
                          (v7/*: any*/),
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "image_title",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageTitle",
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
          },
          (v1/*: any*/)
        ],
        "storageKey": "artworksConnection(first:4)"
      }
    ]
  },
  "params": {
    "cacheID": "fc75d74cc2f3e32a398bc186f860d876",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "artworksConnection.__isArtworkConnectionInterface": (v11/*: any*/),
        "artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "artworksConnection.edges.__isNode": (v11/*: any*/),
        "artworksConnection.edges.__typename": (v11/*: any*/),
        "artworksConnection.edges.id": (v12/*: any*/),
        "artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artworksConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artworksConnection.edges.node.artist.id": (v12/*: any*/),
        "artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artworksConnection.edges.node.artist.targetSupply.isP1": (v13/*: any*/),
        "artworksConnection.edges.node.artistNames": (v14/*: any*/),
        "artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artworksConnection.edges.node.artists.href": (v14/*: any*/),
        "artworksConnection.edges.node.artists.id": (v12/*: any*/),
        "artworksConnection.edges.node.artists.name": (v14/*: any*/),
        "artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artworksConnection.edges.node.attributionClass.id": (v12/*: any*/),
        "artworksConnection.edges.node.attributionClass.name": (v14/*: any*/),
        "artworksConnection.edges.node.collecting_institution": (v14/*: any*/),
        "artworksConnection.edges.node.cultural_maker": (v14/*: any*/),
        "artworksConnection.edges.node.date": (v14/*: any*/),
        "artworksConnection.edges.node.href": (v14/*: any*/),
        "artworksConnection.edges.node.id": (v12/*: any*/),
        "artworksConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "artworksConnection.edges.node.image.placeholder": (v14/*: any*/),
        "artworksConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artworksConnection.edges.node.image.resized.height": (v15/*: any*/),
        "artworksConnection.edges.node.image.resized.src": (v11/*: any*/),
        "artworksConnection.edges.node.image.resized.srcSet": (v11/*: any*/),
        "artworksConnection.edges.node.image.resized.width": (v15/*: any*/),
        "artworksConnection.edges.node.image.url": (v14/*: any*/),
        "artworksConnection.edges.node.imageTitle": (v14/*: any*/),
        "artworksConnection.edges.node.image_title": (v14/*: any*/),
        "artworksConnection.edges.node.internalID": (v12/*: any*/),
        "artworksConnection.edges.node.is_biddable": (v13/*: any*/),
        "artworksConnection.edges.node.is_saved": (v13/*: any*/),
        "artworksConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artworksConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artworksConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artworksConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artworksConnection.edges.node.mediumType.filterGene.id": (v12/*: any*/),
        "artworksConnection.edges.node.mediumType.filterGene.name": (v14/*: any*/),
        "artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artworksConnection.edges.node.partner.href": (v14/*: any*/),
        "artworksConnection.edges.node.partner.id": (v12/*: any*/),
        "artworksConnection.edges.node.partner.name": (v14/*: any*/),
        "artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v15/*: any*/),
        "artworksConnection.edges.node.sale.display_timely_at": (v14/*: any*/),
        "artworksConnection.edges.node.sale.endAt": (v14/*: any*/),
        "artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v15/*: any*/),
        "artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v15/*: any*/),
        "artworksConnection.edges.node.sale.id": (v12/*: any*/),
        "artworksConnection.edges.node.sale.is_auction": (v13/*: any*/),
        "artworksConnection.edges.node.sale.is_closed": (v13/*: any*/),
        "artworksConnection.edges.node.sale.is_preview": (v13/*: any*/),
        "artworksConnection.edges.node.sale.startAt": (v14/*: any*/),
        "artworksConnection.edges.node.saleArtwork": (v16/*: any*/),
        "artworksConnection.edges.node.saleArtwork.endAt": (v14/*: any*/),
        "artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v14/*: any*/),
        "artworksConnection.edges.node.saleArtwork.id": (v12/*: any*/),
        "artworksConnection.edges.node.saleArtwork.lotID": (v14/*: any*/),
        "artworksConnection.edges.node.sale_artwork": (v16/*: any*/),
        "artworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artworksConnection.edges.node.sale_artwork.endAt": (v14/*: any*/),
        "artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v14/*: any*/),
        "artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v14/*: any*/),
        "artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artworksConnection.edges.node.sale_artwork.highest_bid.display": (v14/*: any*/),
        "artworksConnection.edges.node.sale_artwork.id": (v12/*: any*/),
        "artworksConnection.edges.node.sale_artwork.lotID": (v14/*: any*/),
        "artworksConnection.edges.node.sale_artwork.lotLabel": (v14/*: any*/),
        "artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artworksConnection.edges.node.sale_artwork.opening_bid.display": (v14/*: any*/),
        "artworksConnection.edges.node.sale_message": (v14/*: any*/),
        "artworksConnection.edges.node.slug": (v12/*: any*/),
        "artworksConnection.edges.node.title": (v14/*: any*/),
        "artworksConnection.id": (v12/*: any*/)
      }
    },
    "name": "ArtworkGrid_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkGrid_Test_Query {\n  artworksConnection(first: 4) {\n    ...ArtworkGrid_artworks\n    id\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n  is_saved: isSaved\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image {\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "bd86a496c772fe54af37443aa1910a53";

export default node;
