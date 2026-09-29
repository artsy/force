/**
 * @generated SignedSource<<5cc91f44ff154b195a3cd07e182e9854>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeaderRecentAuctionResults_Test_Query$variables = {
  saleEndYear?: number | null | undefined;
  saleStartYear?: number | null | undefined;
};
export type ArtistHeaderRecentAuctionResults_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderRecentAuctionResults_artist">;
  } | null | undefined;
};
export type ArtistHeaderRecentAuctionResults_Test_Query = {
  response: ArtistHeaderRecentAuctionResults_Test_Query$data;
  variables: ArtistHeaderRecentAuctionResults_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "saleEndYear"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "saleStartYear"
},
v2 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistHeaderRecentAuctionResults_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistHeaderRecentAuctionResults_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArtistHeaderRecentAuctionResults_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": "recentAuctionResultsConnection",
            "args": [
              {
                "kind": "Literal",
                "name": "allowUnspecifiedSaleDates",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "includeUnknownPrices",
                "value": false
              },
              {
                "kind": "Variable",
                "name": "saleEndYear",
                "variableName": "saleEndYear"
              },
              {
                "kind": "Variable",
                "name": "saleStartYear",
                "variableName": "saleStartYear"
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "DATE_DESC"
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
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                                    "value": 75
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 75
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
                                  }
                                ],
                                "storageKey": "resized(height:75,width:75)"
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
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": null
                          },
                          {
                            "alias": null,
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
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "5c756b0ef52e778711a6d632391904dd",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.href": (v6/*: any*/),
        "artist.id": (v7/*: any*/),
        "artist.internalID": (v7/*: any*/),
        "artist.recentAuctionResultsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultConnection"
        },
        "artist.recentAuctionResultsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AuctionResultEdge"
        },
        "artist.recentAuctionResultsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResult"
        },
        "artist.recentAuctionResultsConnection.edges.node.dateText": (v6/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.id": (v7/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.images": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotImages"
        },
        "artist.recentAuctionResultsConnection.edges.node.images.thumbnail": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.recentAuctionResultsConnection.edges.node.images.thumbnail.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artist.recentAuctionResultsConnection.edges.node.images.thumbnail.resized.src": (v8/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.images.thumbnail.resized.srcSet": (v8/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.internalID": (v7/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.performance": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotPerformance"
        },
        "artist.recentAuctionResultsConnection.edges.node.performance.mid": (v6/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.priceRealized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultPriceRealized"
        },
        "artist.recentAuctionResultsConnection.edges.node.priceRealized.centsUSD": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artist.recentAuctionResultsConnection.edges.node.priceRealized.display": (v6/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.saleDate": (v6/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.slug": (v6/*: any*/),
        "artist.recentAuctionResultsConnection.edges.node.title": (v6/*: any*/),
        "artist.slug": (v7/*: any*/)
      }
    },
    "name": "ArtistHeaderRecentAuctionResults_Test_Query",
    "operationKind": "query",
    "text": "query ArtistHeaderRecentAuctionResults_Test_Query(\n  $saleStartYear: Int\n  $saleEndYear: Int\n) {\n  artist(id: \"example\") {\n    ...ArtistHeaderRecentAuctionResults_artist\n    id\n  }\n}\n\nfragment ArtistHeaderRecentAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  slug\n  title\n  dateText\n  saleDate\n  images {\n    thumbnail {\n      resized(width: 75, height: 75) {\n        src\n        srcSet\n      }\n    }\n  }\n  priceRealized {\n    display\n    centsUSD\n  }\n  performance {\n    mid\n  }\n}\n\nfragment ArtistHeaderRecentAuctionResults_artist on Artist {\n  internalID\n  slug\n  href\n  recentAuctionResultsConnection: auctionResultsConnection(first: 10, sort: DATE_DESC, saleStartYear: $saleStartYear, saleEndYear: $saleEndYear, includeUnknownPrices: false, allowUnspecifiedSaleDates: false) {\n    edges {\n      node {\n        internalID\n        ...ArtistHeaderRecentAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f03f412aefda8cf2f34fd882e1f8ac54";

export default node;
