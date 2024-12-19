/**
 * @generated SignedSource<<c3ddd141c0e63de1d63b980ff0c4ed20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmittedOrderModalQuery$variables = {
  orderId: string;
};
export type SubmittedOrderModalQuery$data = {
  readonly submittedOrder: {
    readonly impulseConversationId: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"SubmittedOrderModal_submittedOrder">;
  } | null | undefined;
};
export type SubmittedOrderModalQuery = {
  response: SubmittedOrderModalQuery$data;
  variables: SubmittedOrderModalQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "impulseConversationId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmittedOrderModalQuery",
    "selections": [
      {
        "alias": "submittedOrder",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmittedOrderModal_submittedOrder"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmittedOrderModalQuery",
    "selections": [
      {
        "alias": "submittedOrder",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D"
              }
            ],
            "kind": "ScalarField",
            "name": "stateExpiresAt",
            "storageKey": "stateExpiresAt(format:\"MMM D\")"
          },
          (v2/*: any*/),
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
    "cacheID": "9e16052ca5e02190f9995a01c9b1c83d",
    "id": null,
    "metadata": {},
    "name": "SubmittedOrderModalQuery",
    "operationKind": "query",
    "text": "query SubmittedOrderModalQuery(\n  $orderId: ID!\n) {\n  submittedOrder: commerceOrder(id: $orderId) {\n    __typename\n    ...SubmittedOrderModal_submittedOrder\n    impulseConversationId\n    id\n  }\n}\n\nfragment SubmittedOrderModal_submittedOrder on CommerceOrder {\n  __isCommerceOrder: __typename\n  stateExpiresAt(format: \"MMM D\")\n  impulseConversationId\n}\n"
  }
};
})();

(node as any).hash = "2e9856bda0da465ce5cc03349f7e38ce";

export default node;
