/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type FlashBannerQueryVariables = {};
export type FlashBannerQueryResponse = {
    readonly me: {
        readonly canRequestEmailConfirmation: boolean;
    } | null;
};
export type FlashBannerQuery = {
    readonly response: FlashBannerQueryResponse;
    readonly variables: FlashBannerQueryVariables;
};



/*
query FlashBannerQuery {
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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "FlashBannerQuery",
    "operationKind": "query",
    "text": "query FlashBannerQuery {\n  me {\n    canRequestEmailConfirmation\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1fbac78823b002fb61f95cef929ff464';
export default node;
