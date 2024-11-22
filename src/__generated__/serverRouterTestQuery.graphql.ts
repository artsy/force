/**
 * @generated SignedSource<<f6d055df62e495338cca92570be227af>>
 * @relayHash c85fc2f1dd2dbaef3a4a7d3890e693a1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c85fc2f1dd2dbaef3a4a7d3890e693a1

import { ConcreteRequest, Query } from 'relay-runtime';
export type serverRouterTestQuery$variables = Record<PropertyKey, never>;
export type serverRouterTestQuery$data = {
  readonly me: {
    readonly id: string;
  } | null | undefined;
};
export type serverRouterTestQuery = {
  response: serverRouterTestQuery$data;
  variables: serverRouterTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Me",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "serverRouterTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "serverRouterTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "c85fc2f1dd2dbaef3a4a7d3890e693a1",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "serverRouterTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "afa24b0a31e96afac8e81e648171c487";

export default node;
