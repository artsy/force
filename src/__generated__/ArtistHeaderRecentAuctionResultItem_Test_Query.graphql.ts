/**
 * @generated SignedSource<<832076cd830acc59972ea65be7c3f667>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeaderRecentAuctionResultItem_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistHeaderRecentAuctionResultItem_Test_Query$data = {
  readonly auctionResult: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderRecentAuctionResultItem_auctionResult">;
  } | null | undefined;
};
export type ArtistHeaderRecentAuctionResultItem_Test_Query = {
  response: ArtistHeaderRecentAuctionResultItem_Test_Query$data;
  variables: ArtistHeaderRecentAuctionResultItem_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistHeaderRecentAuctionResultItem_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistHeaderRecentAuctionResultItem_auctionResult"
          }
        ],
        "storageKey": "auctionResult(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistHeaderRecentAuctionResultItem_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
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
            "kind": "ScalarField",
            "name": "slug",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "auctionResult(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "0d973c925de2bdf2d159692994e26e15",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "auctionResult": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResult"
        },
        "auctionResult.dateText": (v1/*: any*/),
        "auctionResult.id": (v2/*: any*/),
        "auctionResult.images": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotImages"
        },
        "auctionResult.images.thumbnail": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "auctionResult.images.thumbnail.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "auctionResult.images.thumbnail.resized.src": (v3/*: any*/),
        "auctionResult.images.thumbnail.resized.srcSet": (v3/*: any*/),
        "auctionResult.internalID": (v2/*: any*/),
        "auctionResult.performance": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionLotPerformance"
        },
        "auctionResult.performance.mid": (v1/*: any*/),
        "auctionResult.priceRealized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultPriceRealized"
        },
        "auctionResult.priceRealized.centsUSD": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "auctionResult.priceRealized.display": (v1/*: any*/),
        "auctionResult.saleDate": (v1/*: any*/),
        "auctionResult.slug": (v1/*: any*/),
        "auctionResult.title": (v1/*: any*/)
      }
    },
    "name": "ArtistHeaderRecentAuctionResultItem_Test_Query",
    "operationKind": "query",
    "text": "query ArtistHeaderRecentAuctionResultItem_Test_Query {\n  auctionResult(id: \"example\") {\n    ...ArtistHeaderRecentAuctionResultItem_auctionResult\n    id\n  }\n}\n\nfragment ArtistHeaderRecentAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  slug\n  title\n  dateText\n  saleDate\n  images {\n    thumbnail {\n      resized(width: 75, height: 75) {\n        src\n        srcSet\n      }\n    }\n  }\n  priceRealized {\n    display\n    centsUSD\n  }\n  performance {\n    mid\n  }\n}\n"
  }
};
})();

(node as any).hash = "ad8c4669f42a72acfad459496dee800d";

export default node;
