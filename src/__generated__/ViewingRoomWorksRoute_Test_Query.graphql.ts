/**
 * @generated SignedSource<<59b5e32fb7cd6fbd2f136e3b923fe665>>
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
  } | null | undefined;
};
export type ViewingRoomWorksRoute_Test_Query$rawResponse = {
  readonly viewingRoom: {
    readonly artworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly additionalInformation: string | null | undefined;
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
          readonly isSaved: boolean | null | undefined;
          readonly isSavedToList: boolean;
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
            readonly endAt: string | null | undefined;
            readonly extendedBiddingIntervalMinutes: number | null | undefined;
            readonly id: string;
            readonly is_auction: boolean | null | undefined;
            readonly is_closed: boolean | null | undefined;
            readonly startAt: string | null | undefined;
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
    } | null | undefined;
  } | null | undefined;
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
  "name": "quality",
  "value": 85
},
v4 = {
  "kind": "Literal",
  "name": "version",
  "value": "normalized"
},
v5 = [
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
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
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v11 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v12 = [
  (v9/*: any*/),
  (v8/*: any*/)
],
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
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
                              (v4/*: any*/),
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
                            "selections": (v5/*: any*/),
                            "storageKey": "resized(quality:85,version:\"normalized\",width:600)"
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 550
                              },
                              (v3/*: any*/),
                              (v4/*: any*/)
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v5/*: any*/),
                            "storageKey": "resized(height:550,quality:85,version:\"normalized\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/),
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
                        "args": (v7/*: any*/),
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
                          (v8/*: any*/)
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
                        "args": (v7/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v8/*: any*/),
                          (v6/*: any*/),
                          (v9/*: any*/)
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
                          (v9/*: any*/),
                          (v6/*: any*/),
                          (v8/*: any*/)
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
                          (v10/*: any*/),
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
                          (v8/*: any*/)
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
                          (v10/*: any*/),
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
                            "selections": (v11/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v11/*: any*/),
                            "storageKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
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
                        "selections": (v12/*: any*/),
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
                            "selections": (v12/*: any*/),
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
    "cacheID": "9dbed21c2b7330951dbc655d3a1eb80f",
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
        "viewingRoom.artworksConnection.edges.node.additionalInformation": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewingRoom.artworksConnection.edges.node.artist.id": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "viewingRoom.artworksConnection.edges.node.artist.targetSupply.isP1": (v15/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artistNames": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "viewingRoom.artworksConnection.edges.node.artists.href": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists.id": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.artists.name": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewingRoom.artworksConnection.edges.node.attributionClass.id": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.attributionClass.name": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.collecting_institution": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.cultural_maker": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.date": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.href": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.id": (v14/*: any*/),
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
        "viewingRoom.artworksConnection.edges.node.images.resized": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.height": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.src": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.srcSet": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.resized.width": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo": (v16/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.height": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.src": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.srcSet": (v18/*: any*/),
        "viewingRoom.artworksConnection.edges.node.images.solo.width": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.internalID": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.isSaved": (v15/*: any*/),
        "viewingRoom.artworksConnection.edges.node.isSavedToList": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
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
        "viewingRoom.artworksConnection.edges.node.mediumType.filterGene.id": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.mediumType.filterGene.name": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewingRoom.artworksConnection.edges.node.partner.href": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner.id": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.partner.name": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.preview": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewingRoom.artworksConnection.edges.node.preview.url": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewingRoom.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.endAt": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v17/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.id": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.is_auction": (v15/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.is_closed": (v15/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale.startAt": (v13/*: any*/),
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
        "viewingRoom.artworksConnection.edges.node.sale_artwork.endAt": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.id": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.lotID": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.lotLabel": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "viewingRoom.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.sale_message": (v13/*: any*/),
        "viewingRoom.artworksConnection.edges.node.slug": (v14/*: any*/),
        "viewingRoom.artworksConnection.edges.node.title": (v13/*: any*/)
      }
    },
    "name": "ViewingRoomWorksRoute_Test_Query",
    "operationKind": "query",
    "text": "query ViewingRoomWorksRoute_Test_Query(\n  $slug: ID!\n) {\n  viewingRoom(id: $slug) {\n    ...ViewingRoomWorksRoute_viewingRoom\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment ViewingRoomArtworkDetails_artwork on Artwork {\n  ...Details_artwork\n  id\n  additionalInformation\n  href\n}\n\nfragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {\n  artworksConnection {\n    edges {\n      node {\n        internalID\n        title\n        images {\n          internalID\n          solo: resized(quality: 85, width: 600, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n          resized(quality: 85, height: 550, version: \"normalized\") {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        ...ViewingRoomArtworkDetails_artwork\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "713d62cb90c663c2a684cc471dbe28da";

export default node;
