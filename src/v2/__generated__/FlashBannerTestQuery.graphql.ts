/* tslint:disable */

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
        readonly id: string | null;
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
  "kind": "ScalarField",
  "alias": null,
  "name": "canRequestEmailConfirmation",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FlashBannerTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FlashBannerTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "FlashBannerTestQuery",
    "id": null,
    "text": "query FlashBannerTestQuery {\n  me {\n    canRequestEmailConfirmation\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '3462bf9f36f122833699aad139cf2a14';
export default node;
