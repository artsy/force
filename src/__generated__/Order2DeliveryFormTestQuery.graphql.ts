/**
 * @generated SignedSource<<d291a37b7f43b7ba90db0f962c5dbe81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DeliveryFormTestQuery$variables = Record<PropertyKey, never>;
export type Order2DeliveryFormTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryForm_order">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"Order2DeliveryForm_me">;
  } | null | undefined;
};
export type Order2DeliveryFormTestQuery = {
  response: Order2DeliveryFormTestQuery$data;
  variables: Order2DeliveryFormTestQuery$variables;
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
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine1",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine2",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "region",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v12 = {
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
    "name": "Order2DeliveryFormTestQuery",
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
            "name": "Order2DeliveryForm_me"
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
                "name": "Order2DeliveryForm_order"
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
    "name": "Order2DeliveryFormTestQuery",
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
            "concreteType": "UserAddressConnection",
            "kind": "LinkedField",
            "name": "addressConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserAddressEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserAddress",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "phoneNumber",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "phoneNumberCountryCode",
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "addressConnection(first:20)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FulfillmentOption",
                "kind": "LinkedField",
                "name": "selectedFulfillmentOption",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  }
                ],
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
                "concreteType": "FulfillmentDetails",
                "kind": "LinkedField",
                "name": "fulfillmentDetails",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
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
                        "name": "originalNumber",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "regionCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "countryCode",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6947fe8b589cbb3cb622e51f19064f46",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.addressConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddressConnection"
        },
        "me.addressConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "UserAddressEdge"
        },
        "me.addressConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddress"
        },
        "me.addressConnection.edges.node.addressLine1": (v10/*: any*/),
        "me.addressConnection.edges.node.addressLine2": (v11/*: any*/),
        "me.addressConnection.edges.node.city": (v10/*: any*/),
        "me.addressConnection.edges.node.country": (v10/*: any*/),
        "me.addressConnection.edges.node.id": (v12/*: any*/),
        "me.addressConnection.edges.node.internalID": (v12/*: any*/),
        "me.addressConnection.edges.node.name": (v11/*: any*/),
        "me.addressConnection.edges.node.phoneNumber": (v11/*: any*/),
        "me.addressConnection.edges.node.phoneNumberCountryCode": (v11/*: any*/),
        "me.addressConnection.edges.node.postalCode": (v11/*: any*/),
        "me.addressConnection.edges.node.region": (v11/*: any*/),
        "me.id": (v12/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.availableShippingCountries": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "me.order.fulfillmentDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentDetails"
        },
        "me.order.fulfillmentDetails.addressLine1": (v11/*: any*/),
        "me.order.fulfillmentDetails.addressLine2": (v11/*: any*/),
        "me.order.fulfillmentDetails.city": (v11/*: any*/),
        "me.order.fulfillmentDetails.country": (v11/*: any*/),
        "me.order.fulfillmentDetails.name": (v11/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PhoneNumberType"
        },
        "me.order.fulfillmentDetails.phoneNumber.countryCode": (v11/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.originalNumber": (v11/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.regionCode": (v11/*: any*/),
        "me.order.fulfillmentDetails.postalCode": (v11/*: any*/),
        "me.order.fulfillmentDetails.region": (v11/*: any*/),
        "me.order.id": (v12/*: any*/),
        "me.order.internalID": (v12/*: any*/),
        "me.order.selectedFulfillmentOption": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentOption"
        },
        "me.order.selectedFulfillmentOption.type": {
          "enumValues": [
            "DOMESTIC_FLAT",
            "INTERNATIONAL_FLAT",
            "PICKUP",
            "SHIPPING_TBD"
          ],
          "nullable": false,
          "plural": false,
          "type": "FulfillmentOptionTypeEnum"
        }
      }
    },
    "name": "Order2DeliveryFormTestQuery",
    "operationKind": "query",
    "text": "query Order2DeliveryFormTestQuery {\n  me {\n    ...Order2DeliveryForm_me\n    order(id: \"order-id\") {\n      ...Order2DeliveryForm_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DeliveryForm_me on Me {\n  addressConnection(first: 20) {\n    edges {\n      node {\n        internalID\n        addressLine1\n        addressLine2\n        city\n        region\n        postalCode\n        country\n        name\n        phoneNumber\n        phoneNumberCountryCode\n        id\n      }\n    }\n  }\n}\n\nfragment Order2DeliveryForm_order on Order {\n  internalID\n  selectedFulfillmentOption {\n    type\n  }\n  availableShippingCountries\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n    name\n    phoneNumber {\n      originalNumber\n      regionCode\n      countryCode\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ccb5bcb21bcaa350ad3eda6f29d797c8";

export default node;
