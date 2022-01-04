/* tslint:disable */
/* eslint-disable */

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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.canRequestEmailConfirmation": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "FlashBannerTestQuery",
    "operationKind": "query",
    "text": "query FlashBannerTestQuery {\n  me {\n    canRequestEmailConfirmation\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f3601d608439e328bcfce96e31a134c0';
export default node;
