/**
 * @generated SignedSource<<07455c76260566e70f1338de2518465a>>
 * @relayHash b53c8e2c03e8297b889d5cb83bf29ab0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b53c8e2c03e8297b889d5cb83bf29ab0

import { ConcreteRequest, Query } from 'relay-runtime';
export type createMockNetworkLayerTestQuery$variables = Record<PropertyKey, never>;
export type createMockNetworkLayerTestQuery$data = {
  readonly artwork: {
    readonly id: string;
    readonly title: string | null | undefined;
  } | null | undefined;
};
export type createMockNetworkLayerTestQuery = {
  response: createMockNetworkLayerTestQuery$data;
  variables: createMockNetworkLayerTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "untitled"
      }
    ],
    "concreteType": "Artwork",
    "kind": "LinkedField",
    "name": "artwork",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      }
    ],
    "storageKey": "artwork(id:\"untitled\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "createMockNetworkLayerTestQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "createMockNetworkLayerTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "b53c8e2c03e8297b889d5cb83bf29ab0",
    "metadata": {},
    "name": "createMockNetworkLayerTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "e735fd4b2d3daed26a8c2e227bc1cc5f";

export default node;
