/**
 * @generated SignedSource<<642484f2e33e27fd1245627a3417dbc9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FulfillmentOptionTypeEnum = "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
export type ExpressCheckoutUI_Test_Query$variables = Record<PropertyKey, never>;
export type ExpressCheckoutUI_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"ExpressCheckoutUI_order">;
    } | null | undefined;
  } | null | undefined;
};
export type ExpressCheckoutUI_Test_Query$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly order: {
      readonly availableShippingCountries: ReadonlyArray<string>;
      readonly fulfillmentOptions: ReadonlyArray<{
        readonly amount: {
          readonly currencyCode: string;
          readonly minor: any;
        } | null | undefined;
        readonly selected: boolean | null | undefined;
        readonly type: FulfillmentOptionTypeEnum;
      }>;
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
  } | null | undefined;
};
export type ExpressCheckoutUI_Test_Query = {
  rawResponse: ExpressCheckoutUI_Test_Query$rawResponse;
  response: ExpressCheckoutUI_Test_Query$data;
  variables: ExpressCheckoutUI_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExpressCheckoutUI_Test_Query",
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
                "name": "ExpressCheckoutUI_order"
              }
            ],
            "storageKey": "order(id:\"123\")"
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
    "name": "ExpressCheckoutUI_Test_Query",
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
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "availableShippingCountries",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FulfillmentOption",
                "kind": "LinkedField",
                "name": "fulfillmentOptions",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "amount",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "minor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "currencyCode",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "selected",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"123\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d416ecbe18356952a4442dd9c5d9dfec",
    "id": null,
    "metadata": {},
    "name": "ExpressCheckoutUI_Test_Query",
    "operationKind": "query",
    "text": "query ExpressCheckoutUI_Test_Query {\n  me {\n    order(id: \"123\") {\n      ...ExpressCheckoutUI_order\n      id\n    }\n    id\n  }\n}\n\nfragment ExpressCheckoutUI_order on Order {\n  internalID\n  availableShippingCountries\n  fulfillmentOptions {\n    type\n    amount {\n      minor\n      currencyCode\n    }\n    selected\n  }\n}\n"
  }
};
})();

(node as any).hash = "336854d9cea3b4608782fa71ebd3d42e";

export default node;
