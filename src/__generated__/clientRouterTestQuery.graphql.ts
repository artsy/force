/**
 * @generated SignedSource<<484d6a4c15c591de678cf0531ff0b27b>>
 * @relayHash 4f5dff1b35458e561b7911853d082d48
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4f5dff1b35458e561b7911853d082d48

import { ConcreteRequest, Query } from 'relay-runtime';
export type clientRouterTestQuery$variables = Record<PropertyKey, never>;
export type clientRouterTestQuery$data = {
  readonly me: {
    readonly id: string;
  } | null | undefined;
};
export type clientRouterTestQuery = {
  response: clientRouterTestQuery$data;
  variables: clientRouterTestQuery$variables;
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
    "name": "clientRouterTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "clientRouterTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "4f5dff1b35458e561b7911853d082d48",
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
    "name": "clientRouterTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "51c9f32da98ec8ebc074f392f444cd80";

export default node;
