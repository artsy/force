/**
 * @generated SignedSource<<80304810548042d75121dda629fcf0fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FlashBannerTestQuery$variables = {};
export type FlashBannerTestQuery$data = {
  readonly me: {
    readonly canRequestEmailConfirmation: boolean;
  } | null;
};
export type FlashBannerTestQuery$rawResponse = {
  readonly me: {
    readonly canRequestEmailConfirmation: boolean;
    readonly id: string;
  } | null;
};
export type FlashBannerTestQuery = {
  variables: FlashBannerTestQuery$variables;
  response: FlashBannerTestQuery$data;
  rawResponse: FlashBannerTestQuery$rawResponse;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "canRequestEmailConfirmation",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FlashBannerTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FlashBannerTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "3100e134abd39082018558b8616c21bd",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.canRequestEmailConfirmation": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "FlashBannerTestQuery",
    "operationKind": "query",
    "text": "query FlashBannerTestQuery {\n  me {\n    canRequestEmailConfirmation\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f3601d608439e328bcfce96e31a134c0";

export default node;
