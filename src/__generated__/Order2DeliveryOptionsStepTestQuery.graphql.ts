/**
 * @generated SignedSource<<18f745fd9d96d52519707dba55133033>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DeliveryOptionsStepTestQuery$variables = Record<PropertyKey, never>;
export type Order2DeliveryOptionsStepTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryOptionsStep_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DeliveryOptionsStepTestQuery = {
  response: Order2DeliveryOptionsStepTestQuery$data;
  variables: Order2DeliveryOptionsStepTestQuery$variables;
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
  "name": "type",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minor",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
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
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Long"
},
v9 = {
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
    "name": "Order2DeliveryOptionsStepTestQuery",
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
                "name": "Order2DeliveryOptionsStep_order"
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
    "name": "Order2DeliveryOptionsStepTestQuery",
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
                "concreteType": "FulfillmentOption",
                "kind": "LinkedField",
                "name": "selectedFulfillmentOption",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "amount",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "currencySymbol",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "major",
                        "storageKey": null
                      }
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
                "name": "mode",
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
                    "kind": "ScalarField",
                    "name": "addressLine1",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "addressLine2",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "city",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "country",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "postalCode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "region",
                    "storageKey": null
                  },
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
                            "value": "INTERNATIONAL"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "display",
                        "storageKey": "display(format:\"INTERNATIONAL\")"
                      }
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
                "name": "internalID",
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
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "amount",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shippingOrigin",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shippingRadius",
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
    "cacheID": "3de76d96ee215e5bddd099816d75b113",
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
        "me.order.fulfillmentDetails.addressLine1": (v6/*: any*/),
        "me.order.fulfillmentDetails.addressLine2": (v6/*: any*/),
        "me.order.fulfillmentDetails.city": (v6/*: any*/),
        "me.order.fulfillmentDetails.country": (v6/*: any*/),
        "me.order.fulfillmentDetails.name": (v6/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PhoneNumberType"
        },
        "me.order.fulfillmentDetails.phoneNumber.display": (v6/*: any*/),
        "me.order.fulfillmentDetails.postalCode": (v6/*: any*/),
        "me.order.fulfillmentDetails.region": (v6/*: any*/),
        "me.order.fulfillmentOptions": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "FulfillmentOption"
        },
        "me.order.fulfillmentOptions.amount": (v7/*: any*/),
        "me.order.fulfillmentOptions.amount.display": (v6/*: any*/),
        "me.order.fulfillmentOptions.amount.minor": (v8/*: any*/),
        "me.order.fulfillmentOptions.selected": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.order.fulfillmentOptions.type": (v9/*: any*/),
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
        "me.order.selectedFulfillmentOption.amount": (v7/*: any*/),
        "me.order.selectedFulfillmentOption.amount.currencySymbol": (v6/*: any*/),
        "me.order.selectedFulfillmentOption.amount.display": (v6/*: any*/),
        "me.order.selectedFulfillmentOption.amount.major": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "me.order.selectedFulfillmentOption.amount.minor": (v8/*: any*/),
        "me.order.selectedFulfillmentOption.type": (v9/*: any*/),
        "me.order.shippingOrigin": (v6/*: any*/),
        "me.order.shippingRadius": (v6/*: any*/)
      }
    },
    "name": "Order2DeliveryOptionsStepTestQuery",
    "operationKind": "query",
    "text": "query Order2DeliveryOptionsStepTestQuery {\n  me {\n    order(id: \"order-id\") {\n      ...Order2DeliveryOptionsStep_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DeliveryOptionsForm_order on Order {\n  ...useCompleteFulfillmentDetailsData_order\n  internalID\n  fulfillmentOptions {\n    amount {\n      display\n      minor\n    }\n    type\n    selected\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  shippingOrigin\n  shippingRadius\n}\n\nfragment Order2DeliveryOptionsStep_order on Order {\n  ...useCompleteDeliveryOptionData_order\n  ...useCompleteFulfillmentDetailsData_order\n  ...Order2DeliveryOptionsForm_order\n  internalID\n  fulfillmentOptions {\n    type\n  }\n  selectedFulfillmentOption {\n    type\n    amount {\n      display\n    }\n  }\n}\n\nfragment useCompleteDeliveryOptionData_order on Order {\n  selectedFulfillmentOption {\n    type\n    amount {\n      minor\n      display\n      currencySymbol\n      major\n    }\n  }\n}\n\nfragment useCompleteFulfillmentDetailsData_order on Order {\n  mode\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display(format: INTERNATIONAL)\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n}\n"
  }
};
})();

(node as any).hash = "d67a126aa0e4ff59914fff7915094ca8";

export default node;
