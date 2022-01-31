/**
 * @generated SignedSource<<fefaa8eee6fb6e92f37cc10e5cc861b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FlashBannerQuery$variables = {};
export type FlashBannerQuery$data = {
  readonly me: {
    readonly canRequestEmailConfirmation: boolean;
  } | null;
};
export type FlashBannerQuery = {
  variables: FlashBannerQuery$variables;
  response: FlashBannerQuery$data;
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
    "name": "FlashBannerQuery",
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
    "name": "FlashBannerQuery",
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
    "cacheID": "75a1e79c5334c35035b0a59046243a97",
    "id": null,
    "metadata": {},
    "name": "FlashBannerQuery",
    "operationKind": "query",
    "text": "query FlashBannerQuery {\n  me {\n    canRequestEmailConfirmation\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1fbac78823b002fb61f95cef929ff464";

export default node;
