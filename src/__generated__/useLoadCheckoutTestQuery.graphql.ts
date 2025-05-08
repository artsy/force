/**
 * @generated SignedSource<<582270b1b245564910a6b88200a19cb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useLoadCheckoutTestQuery$variables = Record<PropertyKey, never>;
export type useLoadCheckoutTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"useLoadCheckout_order">;
    } | null | undefined;
  } | null | undefined;
};
export type useLoadCheckoutTestQuery = {
  response: useLoadCheckoutTestQuery$data;
  variables: useLoadCheckoutTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-id-123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useLoadCheckoutTestQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useLoadCheckout_order"
              }
            ],
            "storageKey": "order(id:\"order-id-123\")"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useLoadCheckoutTestQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "LineItem",
                "kind": "LinkedField",
                "name": "lineItems",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtworkVersion",
                    "kind": "LinkedField",
                    "name": "artworkVersion",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"order-id-123\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4a4da9d2f4c1e5979f7caa63b2b7e918",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v2/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.id": (v2/*: any*/),
        "me.order.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "me.order.lineItems.artworkVersion.id": (v2/*: any*/),
        "me.order.lineItems.artworkVersion.internalID": (v2/*: any*/),
        "me.order.lineItems.id": (v2/*: any*/)
      }
    },
    "name": "useLoadCheckoutTestQuery",
    "operationKind": "query",
    "text": "query useLoadCheckoutTestQuery {\n  me {\n    order(id: \"order-id-123\") {\n      ...useLoadCheckout_order\n      id\n    }\n    id\n  }\n}\n\nfragment useLoadCheckout_order on Order {\n  lineItems {\n    artworkVersion {\n      internalID\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4718eb42e3f20c1afc9cf9937a6effa5";

export default node;
