/**
 * @generated SignedSource<<78b6f15155d444ba43f23482f6eae9d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HammerPriceIndexAppPuzzleRowQuery$variables = {
  auctionResultId: string;
};
export type HammerPriceIndexAppPuzzleRowQuery$data = {
  readonly auctionResult: {
    readonly artist: {
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly priceRealized: {
      readonly centsUSD: number | null | undefined;
    } | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
};
export type HammerPriceIndexAppPuzzleRowQuery = {
  response: HammerPriceIndexAppPuzzleRowQuery$data;
  variables: HammerPriceIndexAppPuzzleRowQuery$variables;
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
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
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HammerPriceIndexAppPuzzleRowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
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
    "name": "HammerPriceIndexAppPuzzleRowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4f0586d60f11cee9df0e1b43db33a5b0",
    "id": null,
    "metadata": {},
    "name": "HammerPriceIndexAppPuzzleRowQuery",
    "operationKind": "query",
    "text": "query HammerPriceIndexAppPuzzleRowQuery(\n  $auctionResultId: String!\n) {\n  auctionResult(id: $auctionResultId) {\n    internalID\n    title\n    artist {\n      name\n      id\n    }\n    priceRealized {\n      centsUSD\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d52c93ce201154054d43e203b4269da";

export default node;
