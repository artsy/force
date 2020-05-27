/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FlashBannerQueryVariables = {};
export type FlashBannerQueryResponse = {
    readonly me: {
        readonly canRequestEmailConfirmation: boolean;
        readonly email: string | null;
        readonly id: string;
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
    email
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "me",
    "storageKey": null,
    "args": null,
    "concreteType": "Me",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "canRequestEmailConfirmation",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "email",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FlashBannerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "FlashBannerQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "FlashBannerQuery",
    "id": null,
    "text": "query FlashBannerQuery {\n  me {\n    canRequestEmailConfirmation\n    email\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '0ed576d0211302a9b006204202b61f27';
export default node;
