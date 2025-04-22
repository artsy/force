/**
 * @generated SignedSource<<24c59831a1b8ea4f90249ec35b4e07de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type order2Routes_CheckoutQuery$variables = {
  orderID: string;
};
export type order2Routes_CheckoutQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutRoute_order">;
    } | null | undefined;
  } | null | undefined;
};
export type order2Routes_CheckoutQuery = {
  response: order2Routes_CheckoutQuery$data;
  variables: order2Routes_CheckoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "order2Routes_CheckoutQuery",
    "selections": [
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
            "args": (v1/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2CheckoutRoute_order"
              }
            ],
            "storageKey": null
          }
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
    "name": "order2Routes_CheckoutQuery",
    "selections": [
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
            "args": (v1/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cd4d5a0ae81f56406374aec4eb044059",
    "id": null,
    "metadata": {},
    "name": "order2Routes_CheckoutQuery",
    "operationKind": "query",
    "text": "query order2Routes_CheckoutQuery(\n  $orderID: String!\n) {\n  me {\n    order(id: $orderID) {\n      ...Order2CheckoutRoute_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutRoute_order on Order {\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "8a00cdb9f40239d5d86eb73aff697a83";

export default node;
