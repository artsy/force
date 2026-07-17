/**
 * @generated SignedSource<<f3510f0439d38daf0c01aae104f8546e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type gamesRoutes_HammerPriceQuery$variables = {
  auctionResultId: string;
};
export type gamesRoutes_HammerPriceQuery$data = {
  readonly auctionResult: {
    readonly " $fragmentSpreads": FragmentRefs<"HammerPriceApp_auctionResult">;
  } | null | undefined;
};
export type gamesRoutes_HammerPriceQuery = {
  response: gamesRoutes_HammerPriceQuery$data;
  variables: gamesRoutes_HammerPriceQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "auctionResultId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "auctionResultId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "version",
  "value": "larger"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "gamesRoutes_HammerPriceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HammerPriceApp_auctionResult"
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
    "name": "gamesRoutes_HammerPriceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
            "name": "title",
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
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v2/*: any*/)
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
                "name": "larger",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      (v3/*: any*/)
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"larger\")"
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 400
                      },
                      (v3/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 400
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
                        "name": "height",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "resized(height:400,version:\"larger\",width:400)"
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
            "name": "dateText",
            "storageKey": null
          },
          {
            "alias": "formattedSaleDate",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM DD, YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "saleDate",
            "storageKey": "saleDate(format:\"MMM DD, YYYY\")"
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
            "kind": "ScalarField",
            "name": "location",
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
            "name": "lotNumber",
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
                "name": "centsUSD",
                "storageKey": null
              },
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
                "name": "displayUSD",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6d164fab77950174581a99d7f6a98acd",
    "id": null,
    "metadata": {},
    "name": "gamesRoutes_HammerPriceQuery",
    "operationKind": "query",
    "text": "query gamesRoutes_HammerPriceQuery(\n  $auctionResultId: String!\n) @cacheable {\n  auctionResult(id: $auctionResultId) @principalField {\n    ...HammerPriceApp_auctionResult\n    id\n  }\n}\n\nfragment AuctionResultImage_auctionResult on AuctionResult {\n  title\n  images {\n    larger {\n      resized(height: 400, width: 400, version: \"larger\") {\n        src\n        srcSet\n        height\n        width\n      }\n    }\n  }\n}\n\nfragment HammerPriceApp_auctionResult on AuctionResult {\n  internalID\n  ...HammerPriceMeta_auctionResult\n  ...HammerPriceLotDetails_auctionResult\n  ...HammerPriceGamePanel_auctionResult\n}\n\nfragment HammerPriceGamePanel_auctionResult on AuctionResult {\n  internalID\n  ...useHammerPriceGame_auctionResult\n  ...HammerPriceResultModal_auctionResult\n}\n\nfragment HammerPriceLotDetails_auctionResult on AuctionResult {\n  internalID\n  title\n  dateText\n  artist {\n    name\n    id\n  }\n  formattedSaleDate: saleDate(format: \"MMM DD, YYYY\")\n  mediumText\n  dimensionText\n  organization\n  location\n  saleTitle\n  lotNumber\n  currency\n  ...AuctionResultImage_auctionResult\n}\n\nfragment HammerPriceMeta_auctionResult on AuctionResult {\n  internalID\n  title\n  artist {\n    name\n    id\n  }\n  images {\n    larger {\n      url(version: \"larger\")\n    }\n  }\n}\n\nfragment HammerPriceResultModal_auctionResult on AuctionResult {\n  internalID\n  title\n  dateText\n  currency\n  artist {\n    name\n    id\n  }\n  priceRealized {\n    display\n    displayUSD\n  }\n}\n\nfragment useHammerPriceGame_auctionResult on AuctionResult {\n  internalID\n  priceRealized {\n    centsUSD\n  }\n}\n"
  }
};
})();

(node as any).hash = "08a0e175ceacde8ab0883194483bfdf9";

export default node;
