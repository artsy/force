/**
 * @generated SignedSource<<71a8572f7a6e8b004dd51ecbc46b3645>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2PickupFormTestQuery$variables = Record<PropertyKey, never>;
export type Order2PickupFormTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2PickupForm_order">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"Order2PickupForm_me">;
  } | null | undefined;
};
export type Order2PickupFormTestQuery = {
  response: Order2PickupFormTestQuery$data;
  variables: Order2PickupFormTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "originalNumber",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "regionCode",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PhoneNumberType"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": [
    "ARTSY_EXPRESS",
    "ARTSY_STANDARD",
    "ARTSY_WHITE_GLOVE",
    "DOMESTIC_FLAT",
    "INTERNATIONAL_FLAT",
    "PICKUP",
    "SHIPPING_TBD"
  ],
  "nullable": false,
  "plural": false,
  "type": "FulfillmentOptionTypeEnum"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2PickupFormTestQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "Order2PickupForm_me"
          },
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
                "name": "Order2PickupForm_order"
              }
            ],
            "storageKey": "order(id:\"order-id\")"
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
    "name": "Order2PickupFormTestQuery",
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
            "args": null,
            "concreteType": "PhoneNumberType",
            "kind": "LinkedField",
            "name": "phoneNumber",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "NATIONAL"
                  }
                ],
                "kind": "ScalarField",
                "name": "display",
                "storageKey": "display(format:\"NATIONAL\")"
              },
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
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
                "name": "mode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FulfillmentOption",
                "kind": "LinkedField",
                "name": "fulfillmentOptions",
                "plural": true,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FulfillmentOption",
                "kind": "LinkedField",
                "name": "selectedFulfillmentOption",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FulfillmentDetails",
                "kind": "LinkedField",
                "name": "fulfillmentDetails",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PhoneNumberType",
                    "kind": "LinkedField",
                    "name": "phoneNumber",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "countryCode",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shippingOrigin",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c1d5495cf7e67c8670ea9bd835a228bf",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v5/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.fulfillmentDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentDetails"
        },
        "me.order.fulfillmentDetails.phoneNumber": (v6/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.countryCode": (v7/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.originalNumber": (v7/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.regionCode": (v7/*: any*/),
        "me.order.fulfillmentOptions": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "FulfillmentOption"
        },
        "me.order.fulfillmentOptions.type": (v8/*: any*/),
        "me.order.id": (v5/*: any*/),
        "me.order.internalID": (v5/*: any*/),
        "me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "me.order.selectedFulfillmentOption": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentOption"
        },
        "me.order.selectedFulfillmentOption.type": (v8/*: any*/),
        "me.order.shippingOrigin": (v7/*: any*/),
        "me.phoneNumber": (v6/*: any*/),
        "me.phoneNumber.display": (v7/*: any*/),
        "me.phoneNumber.originalNumber": (v7/*: any*/),
        "me.phoneNumber.regionCode": (v7/*: any*/)
      }
    },
    "name": "Order2PickupFormTestQuery",
    "operationKind": "query",
    "text": "query Order2PickupFormTestQuery {\n  me {\n    ...Order2PickupForm_me\n    order(id: \"order-id\") {\n      ...Order2PickupForm_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PickupForm_me on Me {\n  phoneNumber {\n    display(format: NATIONAL)\n    originalNumber\n    regionCode\n  }\n}\n\nfragment Order2PickupForm_order on Order {\n  internalID\n  mode\n  fulfillmentOptions {\n    type\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n  }\n  shippingOrigin\n}\n"
  }
};
})();

(node as any).hash = "c817435f993fe4c7e087ba2e7235a741";

export default node;
