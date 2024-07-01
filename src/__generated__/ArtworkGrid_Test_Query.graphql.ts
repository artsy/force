/**
 * @generated SignedSource<<c153bbfd153e77a2e9e0d37cf20a1916>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkGrid_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkGrid_Test_Query$data = {
  readonly artworksConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  } | null | undefined;
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
            readonly isP1: boolean | null | undefined;
          };
        } | null | undefined;
        readonly artistNames: string | null | undefined;
        readonly artists: ReadonlyArray<{
          readonly href: string | null | undefined;
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined> | null | undefined;
        readonly attributionClass: {
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly collecting_institution: string | null | undefined;
        readonly cultural_maker: string | null | undefined;
        readonly date: string | null | undefined;
        readonly href: string | null | undefined;
        readonly id: string;
        readonly image: {
          readonly aspectRatio: number;
          readonly blurhashDataURL: string | null | undefined;
          readonly internalID: string | null | undefined;
          readonly placeholder: string | null | undefined;
          readonly resized: {
            readonly height: number | null | undefined;
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null | undefined;
          } | null | undefined;
          readonly url: string | null | undefined;
          readonly versions: ReadonlyArray<string | null | undefined> | null | undefined;
        } | null | undefined;
        readonly imageTitle: string | null | undefined;
        readonly image_title: string | null | undefined;
        readonly internalID: string;
        readonly isSaved: boolean | null | undefined;
        readonly isSavedToList: boolean;
        readonly isUnlisted: boolean;
        readonly is_biddable: boolean | null | undefined;
        readonly marketPriceInsights: {
          readonly demandRank: number | null | undefined;
        } | null | undefined;
        readonly mediumType: {
          readonly filterGene: {
            readonly id: string;
            readonly name: string | null | undefined;
          } | null | undefined;
        } | null | undefined;
        readonly partner: {
          readonly href: string | null | undefined;
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly preview: {
          readonly url: string | null | undefined;
        } | null | undefined;
        readonly sale: {
          readonly cascadingEndTimeIntervalMinutes: number | null | undefined;
          readonly display_timely_at: string | null | undefined;
          readonly endAt: string | null | undefined;
          readonly extendedBiddingIntervalMinutes: number | null | undefined;
          readonly extendedBiddingPeriodMinutes: number | null | undefined;
          readonly id: string;
          readonly is_auction: boolean | null | undefined;
          readonly is_closed: boolean | null | undefined;
          readonly is_preview: boolean | null | undefined;
          readonly startAt: string | null | undefined;
        } | null | undefined;
        readonly saleArtwork: {
          readonly endAt: string | null | undefined;
          readonly extendedBiddingEndAt: string | null | undefined;
          readonly id: string;
          readonly lotID: string | null | undefined;
        } | null | undefined;
        readonly sale_artwork: {
          readonly counts: {
            readonly bidder_positions: any | null | undefined;
          } | null | undefined;
          readonly endAt: string | null | undefined;
          readonly extendedBiddingEndAt: string | null | undefined;
          readonly formattedEndDateTime: string | null | undefined;
          readonly highest_bid: {
            readonly display: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly lotID: string | null | undefined;
          readonly lotLabel: string | null | undefined;
          readonly opening_bid: {
            readonly display: string | null | undefined;
          } | null | undefined;
        } | null | undefined;
        readonly sale_message: string | null | undefined;
        readonly slug: string;
        readonly title: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly id: string;
  } | null | undefined;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v5 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = [
  (v6/*: any*/),
  (v1/*: any*/)
],
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v19 = {
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "includeAll",
                            "value": false
                          }
                        ],
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
                          (v3/*: any*/),
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
                              (v4/*: any*/)
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:[\"larger\",\"large\"])"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "versions",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "blurhashDataURL",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              (v4/*: any*/),
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
                        "storageKey": "image(includeAll:false)"
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
                        "args": (v5/*: any*/),
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
                        "storageKey": "artist(shallow:true)"
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
                        "args": (v5/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          (v6/*: any*/)
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
                        "args": (v5/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
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
                          (v7/*: any*/),
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
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v7/*: any*/),
                          (v9/*: any*/),
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
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isSaved",
                        "storageKey": null
                      },
                      {
                        "alias": "preview",
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "square"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"square\")"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isSavedToList",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": (v11/*: any*/),
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
                            "selections": (v11/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isUnlisted",
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
                          (v7/*: any*/),
                          (v9/*: any*/),
                          (v8/*: any*/),
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
    "cacheID": "5b9afcd697319b26355281e53ec185dc",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "artworksConnection.__isArtworkConnectionInterface": (v12/*: any*/),
        "artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "artworksConnection.edges.__isNode": (v12/*: any*/),
        "artworksConnection.edges.__typename": (v12/*: any*/),
        "artworksConnection.edges.id": (v13/*: any*/),
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
        "artworksConnection.edges.node.artist.id": (v13/*: any*/),
        "artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artworksConnection.edges.node.artist.targetSupply.isP1": (v14/*: any*/),
        "artworksConnection.edges.node.artistNames": (v15/*: any*/),
        "artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artworksConnection.edges.node.artists.href": (v15/*: any*/),
        "artworksConnection.edges.node.artists.id": (v13/*: any*/),
        "artworksConnection.edges.node.artists.name": (v15/*: any*/),
        "artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artworksConnection.edges.node.attributionClass.id": (v13/*: any*/),
        "artworksConnection.edges.node.attributionClass.name": (v15/*: any*/),
        "artworksConnection.edges.node.collecting_institution": (v15/*: any*/),
        "artworksConnection.edges.node.cultural_maker": (v15/*: any*/),
        "artworksConnection.edges.node.date": (v15/*: any*/),
        "artworksConnection.edges.node.href": (v15/*: any*/),
        "artworksConnection.edges.node.id": (v13/*: any*/),
        "artworksConnection.edges.node.image": (v16/*: any*/),
        "artworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "artworksConnection.edges.node.image.blurhashDataURL": (v15/*: any*/),
        "artworksConnection.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "artworksConnection.edges.node.image.placeholder": (v15/*: any*/),
        "artworksConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artworksConnection.edges.node.image.resized.height": (v17/*: any*/),
        "artworksConnection.edges.node.image.resized.src": (v12/*: any*/),
        "artworksConnection.edges.node.image.resized.srcSet": (v12/*: any*/),
        "artworksConnection.edges.node.image.resized.width": (v17/*: any*/),
        "artworksConnection.edges.node.image.url": (v15/*: any*/),
        "artworksConnection.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artworksConnection.edges.node.imageTitle": (v15/*: any*/),
        "artworksConnection.edges.node.image_title": (v15/*: any*/),
        "artworksConnection.edges.node.internalID": (v13/*: any*/),
        "artworksConnection.edges.node.isSaved": (v14/*: any*/),
        "artworksConnection.edges.node.isSavedToList": (v18/*: any*/),
        "artworksConnection.edges.node.isUnlisted": (v18/*: any*/),
        "artworksConnection.edges.node.is_biddable": (v14/*: any*/),
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
        "artworksConnection.edges.node.mediumType.filterGene.id": (v13/*: any*/),
        "artworksConnection.edges.node.mediumType.filterGene.name": (v15/*: any*/),
        "artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artworksConnection.edges.node.partner.href": (v15/*: any*/),
        "artworksConnection.edges.node.partner.id": (v13/*: any*/),
        "artworksConnection.edges.node.partner.name": (v15/*: any*/),
        "artworksConnection.edges.node.preview": (v16/*: any*/),
        "artworksConnection.edges.node.preview.url": (v15/*: any*/),
        "artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v17/*: any*/),
        "artworksConnection.edges.node.sale.display_timely_at": (v15/*: any*/),
        "artworksConnection.edges.node.sale.endAt": (v15/*: any*/),
        "artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v17/*: any*/),
        "artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v17/*: any*/),
        "artworksConnection.edges.node.sale.id": (v13/*: any*/),
        "artworksConnection.edges.node.sale.is_auction": (v14/*: any*/),
        "artworksConnection.edges.node.sale.is_closed": (v14/*: any*/),
        "artworksConnection.edges.node.sale.is_preview": (v14/*: any*/),
        "artworksConnection.edges.node.sale.startAt": (v15/*: any*/),
        "artworksConnection.edges.node.saleArtwork": (v19/*: any*/),
        "artworksConnection.edges.node.saleArtwork.endAt": (v15/*: any*/),
        "artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v15/*: any*/),
        "artworksConnection.edges.node.saleArtwork.id": (v13/*: any*/),
        "artworksConnection.edges.node.saleArtwork.lotID": (v15/*: any*/),
        "artworksConnection.edges.node.sale_artwork": (v19/*: any*/),
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
        "artworksConnection.edges.node.sale_artwork.endAt": (v15/*: any*/),
        "artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v15/*: any*/),
        "artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v15/*: any*/),
        "artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artworksConnection.edges.node.sale_artwork.highest_bid.display": (v15/*: any*/),
        "artworksConnection.edges.node.sale_artwork.id": (v13/*: any*/),
        "artworksConnection.edges.node.sale_artwork.lotID": (v15/*: any*/),
        "artworksConnection.edges.node.sale_artwork.lotLabel": (v15/*: any*/),
        "artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artworksConnection.edges.node.sale_artwork.opening_bid.display": (v15/*: any*/),
        "artworksConnection.edges.node.sale_message": (v15/*: any*/),
        "artworksConnection.edges.node.slug": (v13/*: any*/),
        "artworksConnection.edges.node.title": (v15/*: any*/),
        "artworksConnection.id": (v13/*: any*/)
      }
    },
    "name": "ArtworkGrid_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkGrid_Test_Query {\n  artworksConnection(first: 4) {\n    ...ArtworkGrid_artworks\n    id\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork_3QDGWC\n      ...FlatGridItem_artwork_3QDGWC\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork_3QDGWC on Artwork {\n  ...Metadata_artwork\n  ...DeprecatedSaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n  isSaved\n}\n\nfragment GridItem_artwork_3QDGWC on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "bd86a496c772fe54af37443aa1910a53";

export default node;
