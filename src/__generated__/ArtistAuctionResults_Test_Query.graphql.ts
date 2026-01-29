/**
 * @generated SignedSource<<b1aeade401938534dd6683e25b134e82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResults_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistAuctionResults_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResults_artist">;
  } | null | undefined;
};
export type ArtistAuctionResults_Test_Query = {
  response: ArtistAuctionResults_Test_Query$data;
  variables: ArtistAuctionResults_Test_Query$variables;
};

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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v7 = [
  (v5/*: any*/),
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v10 = [
  (v8/*: any*/)
],
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultConnection"
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
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
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
  "type": "PageCursor"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistAuctionResults_Test_Query",
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
            "name": "ArtistAuctionResults_artist"
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
    "name": "ArtistAuctionResults_Test_Query",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "page",
                "value": "AUCTION_RESULTS"
              }
            ],
            "concreteType": "ArtistMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "meta(page:\"AUCTION_RESULTS\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistStatuses",
            "kind": "LinkedField",
            "name": "statuses",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "auctionLots",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "DATE_DESC"
              },
              {
                "kind": "Literal",
                "name": "state",
                "value": "ALL"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
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
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": "dimension_text",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dimensionText",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "organization",
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
                          (v1/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionLotImages",
                        "kind": "LinkedField",
                        "name": "images",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "thumbnail",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 130
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": [
                                      "square140"
                                    ]
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 130
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
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
                                "storageKey": "cropped(height:130,version:[\"square140\"],width:130)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mediumText",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "categoryText",
                        "storageKey": null
                      },
                      {
                        "alias": "date_text",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dateText",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "boughtIn",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "currency",
                        "storageKey": null
                      },
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          {
                            "alias": "display_usd",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayUSD",
                            "storageKey": null
                          },
                          {
                            "alias": "cents_usd",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "centsUSD",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionLotPerformance",
                        "kind": "LinkedField",
                        "name": "performance",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "mid",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionLotEstimate",
                        "kind": "LinkedField",
                        "name": "estimate",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "location",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lotNumber",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isUpcoming",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:50,sort:\"DATE_DESC\",state:\"ALL\")"
          },
          {
            "alias": "pastAuctionResults",
            "args": [
              {
                "kind": "Literal",
                "name": "state",
                "value": "PAST"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": "auctionResultsConnection(state:\"PAST\")"
          },
          {
            "alias": "upcomingAuctionResults",
            "args": [
              {
                "kind": "Literal",
                "name": "state",
                "value": "UPCOMING"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": "auctionResultsConnection(state:\"UPCOMING\")"
          },
          {
            "alias": "sidebarAggregations",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "SIMPLE_PRICE_HISTOGRAM",
                  "CURRENCIES_COUNT",
                  "LOTS_BY_SALE_YEAR",
                  "LOTS_BY_CREATED_YEAR"
                ]
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultsAggregationType",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(aggregations:[\"SIMPLE_PRICE_HISTOGRAM\",\"CURRENCIES_COUNT\",\"LOTS_BY_SALE_YEAR\",\"LOTS_BY_CREATED_YEAR\"])"
          }
        ],
        "storageKey": "artist(id:\"pablo-picasso\")"
      }
    ]
  },
  "params": {
    "cacheID": "ccde97d124faff618ef56df5abf6509b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": (v11/*: any*/),
        "artist.auctionResultsConnection": (v12/*: any*/),
        "artist.auctionResultsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AuctionResultEdge"
        },
        "artist.auctionResultsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResult"
        },
        "artist.auctionResultsConnection.edges.node.artist": (v11/*: any*/),
        "artist.auctionResultsConnection.edges.node.artist.id": (v13/*: any*/),
        "artist.auctionResultsConnection.edges.node.artist.name": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.boughtIn": (v15/*: any*/),
        "artist.auctionResultsConnection.edges.node.categoryText": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.currency": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.date_text": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.dimension_text": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.estimate": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotEstimate"
        },
        "artist.auctionResultsConnection.edges.node.estimate.display": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.id": (v13/*: any*/),
        "artist.auctionResultsConnection.edges.node.images": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotImages"
        },
        "artist.auctionResultsConnection.edges.node.images.thumbnail": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.auctionResultsConnection.edges.node.images.thumbnail.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.height": (v16/*: any*/),
        "artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.src": (v17/*: any*/),
        "artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.srcSet": (v17/*: any*/),
        "artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.width": (v16/*: any*/),
        "artist.auctionResultsConnection.edges.node.internalID": (v13/*: any*/),
        "artist.auctionResultsConnection.edges.node.isUpcoming": (v15/*: any*/),
        "artist.auctionResultsConnection.edges.node.location": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.lotNumber": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.mediumText": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.organization": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.performance": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotPerformance"
        },
        "artist.auctionResultsConnection.edges.node.performance.mid": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultPriceRealized"
        },
        "artist.auctionResultsConnection.edges.node.price_realized.cents_usd": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artist.auctionResultsConnection.edges.node.price_realized.display": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized.display_usd": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.saleDate": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.saleTitle": (v14/*: any*/),
        "artist.auctionResultsConnection.edges.node.title": (v14/*: any*/),
        "artist.auctionResultsConnection.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "artist.auctionResultsConnection.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "artist.auctionResultsConnection.pageCursors.around.cursor": (v17/*: any*/),
        "artist.auctionResultsConnection.pageCursors.around.isCurrent": (v18/*: any*/),
        "artist.auctionResultsConnection.pageCursors.around.page": (v16/*: any*/),
        "artist.auctionResultsConnection.pageCursors.first": (v19/*: any*/),
        "artist.auctionResultsConnection.pageCursors.first.cursor": (v17/*: any*/),
        "artist.auctionResultsConnection.pageCursors.first.isCurrent": (v18/*: any*/),
        "artist.auctionResultsConnection.pageCursors.first.page": (v16/*: any*/),
        "artist.auctionResultsConnection.pageCursors.last": (v19/*: any*/),
        "artist.auctionResultsConnection.pageCursors.last.cursor": (v17/*: any*/),
        "artist.auctionResultsConnection.pageCursors.last.isCurrent": (v18/*: any*/),
        "artist.auctionResultsConnection.pageCursors.last.page": (v16/*: any*/),
        "artist.auctionResultsConnection.pageCursors.previous": (v19/*: any*/),
        "artist.auctionResultsConnection.pageCursors.previous.cursor": (v17/*: any*/),
        "artist.auctionResultsConnection.pageCursors.previous.page": (v16/*: any*/),
        "artist.auctionResultsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artist.auctionResultsConnection.pageInfo.endCursor": (v14/*: any*/),
        "artist.auctionResultsConnection.pageInfo.hasNextPage": (v18/*: any*/),
        "artist.auctionResultsConnection.totalCount": (v20/*: any*/),
        "artist.id": (v13/*: any*/),
        "artist.internalID": (v13/*: any*/),
        "artist.meta": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistMeta"
        },
        "artist.meta.description": (v17/*: any*/),
        "artist.meta.title": (v17/*: any*/),
        "artist.name": (v14/*: any*/),
        "artist.pastAuctionResults": (v12/*: any*/),
        "artist.pastAuctionResults.totalCount": (v20/*: any*/),
        "artist.sidebarAggregations": (v12/*: any*/),
        "artist.sidebarAggregations.aggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AuctionResultsAggregationType"
        },
        "artist.sidebarAggregations.aggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AggregationCount"
        },
        "artist.sidebarAggregations.aggregations.counts.count": (v16/*: any*/),
        "artist.sidebarAggregations.aggregations.counts.name": (v17/*: any*/),
        "artist.sidebarAggregations.aggregations.counts.value": (v17/*: any*/),
        "artist.sidebarAggregations.aggregations.slice": {
          "enumValues": [
            "CURRENCIES_COUNT",
            "LOTS_BY_CREATED_YEAR",
            "LOTS_BY_SALE_YEAR",
            "SIMPLE_PRICE_HISTOGRAM"
          ],
          "nullable": true,
          "plural": false,
          "type": "AuctionResultsAggregation"
        },
        "artist.slug": (v13/*: any*/),
        "artist.statuses": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStatuses"
        },
        "artist.statuses.auctionLots": (v15/*: any*/),
        "artist.upcomingAuctionResults": (v12/*: any*/),
        "artist.upcomingAuctionResults.totalCount": (v20/*: any*/)
      }
    },
    "name": "ArtistAuctionResults_Test_Query",
    "operationKind": "query",
    "text": "query ArtistAuctionResults_Test_Query {\n  artist(id: \"pablo-picasso\") {\n    ...ArtistAuctionResults_artist\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    id\n    name\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtistAuctionResults_artist on Artist {\n  slug\n  id\n  internalID\n  name\n  meta(page: AUCTION_RESULTS) {\n    description\n    title\n  }\n  statuses {\n    auctionLots\n  }\n  auctionResultsConnection(first: 50, sort: DATE_DESC, state: ALL) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        isUpcoming\n        id\n      }\n    }\n  }\n  pastAuctionResults: auctionResultsConnection(state: PAST) {\n    totalCount\n  }\n  upcomingAuctionResults: auctionResultsConnection(state: UPCOMING) {\n    totalCount\n  }\n  sidebarAggregations: auctionResultsConnection(aggregations: [SIMPLE_PRICE_HISTOGRAM, CURRENCIES_COUNT, LOTS_BY_SALE_YEAR, LOTS_BY_CREATED_YEAR]) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d6f7af18cfdce7e873d630fed41196d";

export default node;
