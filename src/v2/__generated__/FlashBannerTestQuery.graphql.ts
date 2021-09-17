/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FlashBannerTestQueryVariables = {};
export type FlashBannerTestQueryResponse = {
    readonly me: {
        readonly canRequestEmailConfirmation: boolean;
    } | null;
};
export type FlashBannerTestQueryRawResponse = {
    readonly me: ({
        readonly canRequestEmailConfirmation: boolean;
        readonly id: string;
    }) | null;
};
export type FlashBannerTestQuery = {
    readonly response: FlashBannerTestQueryResponse;
    readonly variables: FlashBannerTestQueryVariables;
    readonly rawResponse: FlashBannerTestQueryRawResponse;
};



/*
query FlashBannerTestQuery {
  me {
    canRequestEmailConfirmation
    id
  }
}
*/

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
    "metadata": {},
    "name": "FlashBannerTestQuery",
    "operationKind": "query",
    "text": "query FlashBannerTestQuery {\n  me {\n    canRequestEmailConfirmation\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3462bf9f36f122833699aad139cf2a14';
export default node;
