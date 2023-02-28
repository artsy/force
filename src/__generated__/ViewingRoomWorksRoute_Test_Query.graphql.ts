/**
 * @generated SignedSource<<1c259a6628d92dcc547ad822ad6be75b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomWorksRoute_Test_Query$variables = {
  slug: string;
};
export type ViewingRoomWorksRoute_Test_Query$data = {
  readonly viewingRoom: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
  } | null;
};
export type ViewingRoomWorksRoute_Test_Query$rawResponse = {
  readonly viewingRoom: {
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly additionalInformation: string | null;
          readonly artist: {
            readonly id: string;
            readonly targetSupply: {
              readonly isP1: boolean | null;
            } | null;
          } | null;
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
          readonly images: ReadonlyArray<{
            readonly internalID: string | null;
            readonly resized: {
              readonly height: number | null;
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null;
            } | null;
            readonly solo: {
              readonly height: number | null;
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null;
            } | null;
          } | null> | null;
          readonly internalID: string;
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
            readonly endAt: string | null;
            readonly extendedBiddingIntervalMinutes: number | null;
            readonly id: string;
            readonly is_auction: boolean | null;
            readonly is_closed: boolean | null;
            readonly startAt: string | null;
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
    } | null;
  } | null;
};
export type ViewingRoomWorksRoute_Test_Query = {
  rawResponse: ViewingRoomWorksRoute_Test_Query$rawResponse;
  response: ViewingRoomWorksRoute_Test_Query$data;
  variables: ViewingRoomWorksRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "version",
  "value": "normalized"
},
v4 = [
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
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
  (v8/*: any*/),
  (v6/*: any*/)
],
v12 = {
  "enumValues": null,
  "nullable": true,
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
  "type": "ResizedImageUrl"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomWorksRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewingRoomWorksRoute_viewingRoom"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewingRoomWorksRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "images",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": "solo",
                            "args": [
                              (v3/*: any*/),
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 600
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": "resized(version:\"normalized\",width:600)"
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 550
                              },
                              (v3/*: any*/)
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v4/*: any*/),
                            "storageKey": "resized(height:550,version:\"normalized\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
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
                          (v6/*: any*/)
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
                        "args": (v7/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v6/*: any*/),
                          (v5/*: any*/),
                          (v8/*: any*/)
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
                        "args": (v7/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
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
                          (v9/*: any*/),
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
                          (v6/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "extendedBiddingEndAt",
                            "storageKey": null
                          },
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
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
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
                        "name": "additionalInformation",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "049078dfcf9d2eb7116ca00911600093",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewingRoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ViewingRoom"
        },
        "viewingRoom.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "viewingRoom.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "viewingRoom.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewingRoom.artworksConnection.edges.node.additionalInformation": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewingRoom.artworksConnection.edges.node.artist.id": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "viewingRoom.artworksConnection.edges.node.artist.targetSupply.isP1": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "viewingRoom.artworksConnection.edges.node.artists.href": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists.id": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists.name": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewingRoom.artworksConnection.edges.node.attributionClass.id": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.attributionClass.name": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collecting_institution": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.cultural_maker": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.date": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.href": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.id": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "viewingRoom.artworksConnection.edges.node.images.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "viewingRoom.artworksConnection.edges.node.images.resized": (v15/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.height": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.src": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.srcSet": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.width": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo": (v15/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.height": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.src": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.srcSet": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.width": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.internalID": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.is_saved": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "viewingRoom.artworksConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "viewingRoom.artworksConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "viewingRoom.artworksConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "viewingRoom.artworksConnection.edges.node.mediumType.filterGene.id": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.mediumType.filterGene.name": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewingRoom.artworksConnection.edges.node.partner.href": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner.id": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner.name": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewingRoom.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.endAt": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.id": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.is_auction": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.is_closed": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.startAt": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.endAt": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.id": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.lotID": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.lotLabel": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_message": (v12/*: any*/),
        "viewingRoom.artworksConnection.edges.node.slug": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.title": (v12/*: any*/)
      }
    },
    "name": "ViewingRoomWorksRoute_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomWorksRoute_Test_Query(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomWorksRoute_viewingRoom\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToCollectionsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment SaveArtworkToCollectionsButton_artwork on Artwork {\n  id\n  internalID\n  is_saved: isSaved\n  slug\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ViewingRoomArtworkDetails_artwork on Artwork {\n  ...Details_artwork\n  id\n  additionalInformation\n  href\n}\n\nfragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {\n  artworksConnection {\n    edges {\n      node {\n        internalID\n        title\n        images {\n          internalID\n          solo: resized(width: 600, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n          resized(height: 550, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        ...ViewingRoomArtworkDetails_artwork\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "713d62cb90c663c2a684cc471dbe28da";

export default node;
