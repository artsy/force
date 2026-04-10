/**
 * @generated SignedSource<<7ab6ac259f77c4ed49753a48fedf51fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
export type ViewingRoomWorksRouteTestQuery$variables = {
  after?: string | null | undefined;
  count: number;
  slug: string;
};
export type ViewingRoomWorksRouteTestQuery$data = {
  readonly viewingRoom: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
  } | null | undefined;
};
export type ViewingRoomWorksRouteTestQuery$rawResponse = {
  readonly viewingRoom: {
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly __typename: "Artwork";
          readonly additionalInformation: string | null | undefined;
          readonly artist: {
            readonly id: string;
            readonly targetSupply: {
              readonly isP1: boolean | null | undefined;
            };
          } | null | undefined;
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
          readonly collectorSignals: {
            readonly auction: {
              readonly bidCount: number;
              readonly liveBiddingStarted: boolean;
              readonly lotClosesAt: string | null | undefined;
              readonly onlineBiddingExtended: boolean;
              readonly registrationEndsAt: string | null | undefined;
            } | null | undefined;
            readonly partnerOffer: {
              readonly endAt: string | null | undefined;
              readonly id: string;
              readonly priceWithDiscount: {
                readonly display: string | null | undefined;
              } | null | undefined;
            } | null | undefined;
            readonly primaryLabel: LabelSignalEnum | null | undefined;
          } | null | undefined;
          readonly cultural_maker: string | null | undefined;
          readonly date: string | null | undefined;
          readonly href: string | null | undefined;
          readonly id: string;
          readonly images: ReadonlyArray<{
            readonly internalID: string | null | undefined;
            readonly resized: {
              readonly height: number | null | undefined;
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null | undefined;
            } | null | undefined;
            readonly solo: {
              readonly height: number | null | undefined;
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null | undefined;
            } | null | undefined;
          } | null | undefined> | null | undefined;
          readonly internalID: string;
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
          readonly sale: {
            readonly cascadingEndTimeIntervalMinutes: number | null | undefined;
            readonly endAt: string | null | undefined;
            readonly extendedBiddingIntervalMinutes: number | null | undefined;
            readonly id: string;
            readonly is_auction: boolean | null | undefined;
            readonly is_closed: boolean | null | undefined;
            readonly startAt: string | null | undefined;
          } | null | undefined;
          readonly saleArtwork: {
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
          readonly title: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly pageInfo: {
        readonly endCursor: string | null | undefined;
        readonly hasNextPage: boolean;
      };
    } | null | undefined;
    readonly slug: string;
  } | null | undefined;
};
export type ViewingRoomWorksRouteTestQuery = {
  rawResponse: ViewingRoomWorksRouteTestQuery$rawResponse;
  response: ViewingRoomWorksRouteTestQuery$data;
  variables: ViewingRoomWorksRouteTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "count"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "version",
  "value": "normalized"
},
v7 = [
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
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
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v15 = [
  (v13/*: any*/),
  (v11/*: any*/)
],
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewingRoomWorksRouteTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "args": (v4/*: any*/),
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ViewingRoomWorksRouteTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ViewingRoom",
        "kind": "LinkedField",
        "name": "viewingRoom",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                      (v5/*: any*/),
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
                          (v5/*: any*/),
                          {
                            "alias": "solo",
                            "args": [
                              (v6/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                              (v6/*: any*/)
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v7/*: any*/),
                            "storageKey": "resized(height:550,version:\"normalized\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CollectorSignals",
                        "kind": "LinkedField",
                        "name": "collectorSignals",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "primaryLabel",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AuctionCollectorSignals",
                            "kind": "LinkedField",
                            "name": "auction",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "bidCount",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotClosesAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "liveBiddingStarted",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "registrationEndsAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "onlineBiddingExtended",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerOfferToCollector",
                            "kind": "LinkedField",
                            "name": "partnerOffer",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "priceWithDiscount",
                                "plural": false,
                                "selections": (v10/*: any*/),
                                "storageKey": null
                              },
                              (v11/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
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
                        "args": (v12/*: any*/),
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
                          (v11/*: any*/)
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
                        "args": (v12/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v11/*: any*/),
                          (v8/*: any*/),
                          (v13/*: any*/)
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
                        "args": (v12/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          (v8/*: any*/),
                          (v11/*: any*/)
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
                          (v11/*: any*/)
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
                          (v14/*: any*/),
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
                          (v11/*: any*/)
                        ],
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
                          (v14/*: any*/),
                          (v11/*: any*/)
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
                        "selections": (v15/*: any*/),
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
                            "selections": (v15/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "HTML"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "additionalInformation",
                        "storageKey": "additionalInformation(format:\"HTML\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ViewingRoomWorksRoute_artworksConnection",
            "kind": "LinkedHandle",
            "name": "artworksConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f44b310d45105133e0f2d7ef6b3166eb",
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
        "viewingRoom.artworksConnection.edges.cursor": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewingRoom.artworksConnection.edges.node.__typename": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.additionalInformation": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewingRoom.artworksConnection.edges.node.artist.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "viewingRoom.artworksConnection.edges.node.artist.targetSupply.isP1": (v19/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "viewingRoom.artworksConnection.edges.node.artists.href": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists.name": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewingRoom.artworksConnection.edges.node.attributionClass.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.attributionClass.name": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collecting_institution": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "viewingRoom.artworksConnection.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "viewingRoom.artworksConnection.edges.node.collectorSignals.auction.bidCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "viewingRoom.artworksConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v20/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collectorSignals.auction.lotClosesAt": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v20/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "viewingRoom.artworksConnection.edges.node.collectorSignals.partnerOffer.endAt": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collectorSignals.partnerOffer.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewingRoom.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "viewingRoom.artworksConnection.edges.node.cultural_maker": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.date": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.href": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.id": (v18/*: any*/),
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
        "viewingRoom.artworksConnection.edges.node.images.resized": (v21/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.height": (v22/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.src": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.srcSet": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.width": (v22/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo": (v21/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.height": (v22/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.src": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.srcSet": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.width": (v22/*: any*/),
        "viewingRoom.artworksConnection.edges.node.internalID": (v18/*: any*/),
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
        "viewingRoom.artworksConnection.edges.node.mediumType.filterGene.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.mediumType.filterGene.name": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewingRoom.artworksConnection.edges.node.partner.href": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner.name": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewingRoom.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v22/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.endAt": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v22/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.is_auction": (v19/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.is_closed": (v19/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.startAt": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.saleArtwork": (v23/*: any*/),
        "viewingRoom.artworksConnection.edges.node.saleArtwork.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.saleArtwork.lotID": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork": (v23/*: any*/),
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
        "viewingRoom.artworksConnection.edges.node.sale_artwork.endAt": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.id": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.lotID": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.lotLabel": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_message": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.title": (v17/*: any*/),
        "viewingRoom.artworksConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewingRoom.artworksConnection.pageInfo.endCursor": (v17/*: any*/),
        "viewingRoom.artworksConnection.pageInfo.hasNextPage": (v20/*: any*/),
        "viewingRoom.slug": (v16/*: any*/)
      }
    },
    "name": "ViewingRoomWorksRouteTestQuery",
    "operationKind": "query",
    "text": "query ViewingRoomWorksRouteTestQuery(\n  $slug: ID!\n  $count: Int!\n  $after: String\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomWorksRoute_viewingRoom_2Q1lIr\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment ViewingRoomArtworkDetails_artwork on Artwork {\n  ...Details_artwork\n  id\n  additionalInformation(format: HTML)\n  href\n}\n\nfragment ViewingRoomWorksRoute_viewingRoom_2Q1lIr on ViewingRoom {\n  slug\n  artworksConnection(first: $count, after: $after) {\n    edges {\n      node {\n        internalID\n        title\n        images {\n          internalID\n          solo: resized(width: 600, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n          resized(height: 550, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        ...ViewingRoomArtworkDetails_artwork\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "144b96c2672579252e53b8ac5178501f";

export default node;
