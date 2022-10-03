/**
 * @generated SignedSource<<08904e464db92a236aa0b8c7e3f0d4c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type InquiryAuctionHousesYouWorkWithQuery$variables = {
  term: string;
};
export type InquiryAuctionHousesYouWorkWithQuery$data = {
  readonly external: {
    readonly auctionHouses: ReadonlyArray<{
      readonly internalID: string;
      readonly name: string;
    }>;
  };
};
export type InquiryAuctionHousesYouWorkWithQuery = {
  variables: InquiryAuctionHousesYouWorkWithQuery$variables;
  response: InquiryAuctionHousesYouWorkWithQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "term"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "size",
    "value": 5
  },
  {
    "kind": "Variable",
    "name": "term",
    "variableName": "term"
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
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InquiryAuctionHousesYouWorkWithQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "External",
        "kind": "LinkedField",
        "name": "external",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ExternalAuctionHouse",
            "kind": "LinkedField",
            "name": "auctionHouses",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
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
    "name": "InquiryAuctionHousesYouWorkWithQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "External",
        "kind": "LinkedField",
        "name": "external",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "ExternalAuctionHouse",
            "kind": "LinkedField",
            "name": "auctionHouses",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
    "cacheID": "e2e4605ff2601595267a0ca271c0dd8a",
    "id": null,
    "metadata": {},
    "name": "InquiryAuctionHousesYouWorkWithQuery",
    "operationKind": "query",
    "text": "query InquiryAuctionHousesYouWorkWithQuery(\n  $term: String!\n) {\n  external {\n    auctionHouses(size: 5, term: $term) {\n      internalID\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f5cacd67efc799a7387e076ab088afda";

export default node;
