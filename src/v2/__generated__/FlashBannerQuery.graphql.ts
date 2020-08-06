/* tslint:disable */

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
    "name": "FlashBannerQuery",
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
    "name": "FlashBannerQuery",
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
    "name": "FlashBannerQuery",
    "id": null,
    "text": "query FlashBannerQuery {\n  me {\n    canRequestEmailConfirmation\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '1fbac78823b002fb61f95cef929ff464';
export default node;
