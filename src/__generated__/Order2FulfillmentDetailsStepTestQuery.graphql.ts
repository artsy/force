/**
 * @generated SignedSource<<84dd39580e6b7b861e3ffc67986f275d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2FulfillmentDetailsStepTestQuery$variables = Record<PropertyKey, never>;
export type Order2FulfillmentDetailsStepTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2FulfillmentDetailsStep_order">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"Order2FulfillmentDetailsStep_me">;
  } | null | undefined;
};
export type Order2FulfillmentDetailsStepTestQuery = {
  response: Order2FulfillmentDetailsStepTestQuery$data;
  variables: Order2FulfillmentDetailsStepTestQuery$variables;
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
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "originalNumber",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "regionCode",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine1",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "addressLine2",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "region",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v11 = {
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
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PhoneNumberType"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v19 = {
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
    "name": "Order2FulfillmentDetailsStepTestQuery",
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
            "name": "Order2FulfillmentDetailsStep_me"
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
                "name": "Order2FulfillmentDetailsStep_order"
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
    "name": "Order2FulfillmentDetailsStepTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
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
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v1/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PhoneNumberType",
                        "kind": "LinkedField",
                        "name": "phoneNumberParsed",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isValid",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isDefault",
                        "storageKey": null
                      },
                      (v12/*: any*/)
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
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v10/*: any*/),
                  (v1/*: any*/),
                  (v9/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PhoneNumberType",
                    "kind": "LinkedField",
                    "name": "phoneNumber",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "countryCode",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FulfillmentOption",
                "kind": "LinkedField",
                "name": "selectedFulfillmentOption",
                "plural": false,
                "selections": [
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FulfillmentOption",
                "kind": "LinkedField",
                "name": "fulfillmentOptions",
                "plural": true,
                "selections": [
                  (v13/*: any*/),
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
                "name": "availableShippingCountries",
                "storageKey": null
              },
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
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "shippingOriginRegion",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "processWithArtsyShippingDomestic",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artsyShippingInternational",
                        "storageKey": null
                      },
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "278b754808fe0fbfdd80dc0e770b2168",
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
        "me.addressConnection.edges.node.addressLine1": (v14/*: any*/),
        "me.addressConnection.edges.node.addressLine2": (v15/*: any*/),
        "me.addressConnection.edges.node.city": (v14/*: any*/),
        "me.addressConnection.edges.node.country": (v14/*: any*/),
        "me.addressConnection.edges.node.id": (v16/*: any*/),
        "me.addressConnection.edges.node.internalID": (v16/*: any*/),
        "me.addressConnection.edges.node.isDefault": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.addressConnection.edges.node.name": (v15/*: any*/),
        "me.addressConnection.edges.node.phoneNumber": (v15/*: any*/),
        "me.addressConnection.edges.node.phoneNumberCountryCode": (v15/*: any*/),
        "me.addressConnection.edges.node.phoneNumberParsed": (v17/*: any*/),
        "me.addressConnection.edges.node.phoneNumberParsed.display": (v15/*: any*/),
        "me.addressConnection.edges.node.phoneNumberParsed.isValid": (v18/*: any*/),
        "me.addressConnection.edges.node.postalCode": (v15/*: any*/),
        "me.addressConnection.edges.node.region": (v15/*: any*/),
        "me.id": (v16/*: any*/),
        "me.name": (v15/*: any*/),
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
        "me.order.fulfillmentDetails.addressLine1": (v15/*: any*/),
        "me.order.fulfillmentDetails.addressLine2": (v15/*: any*/),
        "me.order.fulfillmentDetails.city": (v15/*: any*/),
        "me.order.fulfillmentDetails.country": (v15/*: any*/),
        "me.order.fulfillmentDetails.name": (v15/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber": (v17/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.countryCode": (v15/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.display": (v15/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.originalNumber": (v15/*: any*/),
        "me.order.fulfillmentDetails.phoneNumber.regionCode": (v15/*: any*/),
        "me.order.fulfillmentDetails.postalCode": (v15/*: any*/),
        "me.order.fulfillmentDetails.region": (v15/*: any*/),
        "me.order.fulfillmentOptions": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "FulfillmentOption"
        },
        "me.order.fulfillmentOptions.selected": (v18/*: any*/),
        "me.order.fulfillmentOptions.type": (v19/*: any*/),
        "me.order.id": (v16/*: any*/),
        "me.order.internalID": (v16/*: any*/),
        "me.order.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "me.order.lineItems.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.order.lineItems.artwork.artsyShippingInternational": (v18/*: any*/),
        "me.order.lineItems.artwork.id": (v16/*: any*/),
        "me.order.lineItems.artwork.processWithArtsyShippingDomestic": (v18/*: any*/),
        "me.order.lineItems.artwork.shippingOriginRegion": (v15/*: any*/),
        "me.order.lineItems.id": (v16/*: any*/),
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
        "me.order.selectedFulfillmentOption.type": (v19/*: any*/),
        "me.order.shippingOrigin": (v15/*: any*/),
        "me.phoneNumber": (v17/*: any*/),
        "me.phoneNumber.display": (v15/*: any*/),
        "me.phoneNumber.originalNumber": (v15/*: any*/),
        "me.phoneNumber.regionCode": (v15/*: any*/)
      }
    },
    "name": "Order2FulfillmentDetailsStepTestQuery",
    "operationKind": "query",
    "text": "query Order2FulfillmentDetailsStepTestQuery {\n  me {\n    ...Order2FulfillmentDetailsStep_me\n    order(id: \"order-id\") {\n      ...Order2FulfillmentDetailsStep_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DeliveryForm_me on Me {\n  name\n  phoneNumber {\n    display(format: NATIONAL)\n    originalNumber\n    regionCode\n  }\n  addressConnection(first: 20) {\n    edges {\n      node {\n        internalID\n        addressLine1\n        addressLine2\n        city\n        region\n        postalCode\n        country\n        name\n        phoneNumber\n        phoneNumberCountryCode\n        phoneNumberParsed {\n          display(format: INTERNATIONAL)\n          isValid\n        }\n        isDefault\n        id\n      }\n    }\n  }\n}\n\nfragment Order2DeliveryForm_order on Order {\n  internalID\n  selectedFulfillmentOption {\n    type\n  }\n  availableShippingCountries\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n    name\n    phoneNumber {\n      originalNumber\n      regionCode\n      countryCode\n    }\n  }\n  lineItems {\n    artwork {\n      shippingOriginRegion\n      processWithArtsyShippingDomestic\n      artsyShippingInternational\n      id\n    }\n    id\n  }\n}\n\nfragment Order2FulfillmentDetailsStep_me on Me {\n  ...Order2DeliveryForm_me\n  ...Order2PickupForm_me\n}\n\nfragment Order2FulfillmentDetailsStep_order on Order {\n  ...useCompleteFulfillmentDetailsData_order\n  ...Order2PickupForm_order\n  ...Order2DeliveryForm_order\n  id\n  internalID\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n      display(format: INTERNATIONAL)\n    }\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentOptions {\n    type\n    selected\n  }\n  availableShippingCountries\n}\n\nfragment Order2PickupForm_me on Me {\n  phoneNumber {\n    display(format: NATIONAL)\n    originalNumber\n    regionCode\n  }\n}\n\nfragment Order2PickupForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    type\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n  }\n  shippingOrigin\n}\n\nfragment useCompleteFulfillmentDetailsData_order on Order {\n  mode\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display(format: INTERNATIONAL)\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n}\n"
  }
};
})();

(node as any).hash = "c24269549a25b982e8d062f6e0c0dc74";

export default node;
