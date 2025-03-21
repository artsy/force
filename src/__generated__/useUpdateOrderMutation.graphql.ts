/**
 * @generated SignedSource<<0e915d422c9c1b9cc7a275e8b15e4bd9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FulfillmentOptionTypeEnum = "DOMESTIC_FLAT" | "INTERNATIONAL_FLAT" | "PICKUP" | "SHIPPING_TBD" | "%future added value";
export type OrderCreditCardWalletTypeEnum = "APPLE_PAY" | "%future added value";
export type OrderPaymentMethodEnum = "CREDIT_CARD" | "%future added value";
export type updateOrderInput = {
  buyerPhoneNumber?: string | null | undefined;
  buyerPhoneNumberCountryCode?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  creditCardWalletType?: OrderCreditCardWalletTypeEnum | null | undefined;
  id: string;
  paymentMethod?: OrderPaymentMethodEnum | null | undefined;
  shippingAddressLine1?: string | null | undefined;
  shippingAddressLine2?: string | null | undefined;
  shippingCity?: string | null | undefined;
  shippingCountry?: string | null | undefined;
  shippingName?: string | null | undefined;
  shippingPostalCode?: string | null | undefined;
  shippingRegion?: string | null | undefined;
};
export type useUpdateOrderMutation$variables = {
  input: updateOrderInput;
};
export type useUpdateOrderMutation$data = {
  readonly updateOrder: {
    readonly orderOrError: {
      readonly __typename: "OrderMutationError";
      readonly mutationError: {
        readonly message: string;
      };
    } | {
      readonly __typename: "OrderMutationSuccess";
      readonly order: {
        readonly availableShippingCountries: ReadonlyArray<string>;
        readonly buyerTotal: {
          readonly currencyCode: string;
          readonly minor: any;
        } | null | undefined;
        readonly fulfillmentOptions: ReadonlyArray<{
          readonly amount: {
            readonly currencyCode: string;
            readonly minor: any;
          } | null | undefined;
          readonly selected: boolean | null | undefined;
          readonly type: FulfillmentOptionTypeEnum;
        }>;
        readonly internalID: string;
        readonly itemsTotal: {
          readonly minor: any;
        } | null | undefined;
        readonly shippingTotal: {
          readonly minor: any;
        } | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"ExpressCheckoutUI_order">;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined;
};
export type useUpdateOrderMutation = {
  response: useUpdateOrderMutation$data;
  variables: useUpdateOrderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minor",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v6 = {
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
      "selections": (v5/*: any*/),
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
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "buyerTotal",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v8 = [
  (v4/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "itemsTotal",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "shippingTotal",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "availableShippingCountries",
  "storageKey": null
},
v12 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ExchangeError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderMutationError",
  "abstractKey": null
},
v13 = {
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
    "name": "useUpdateOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateOrderPayload",
        "kind": "LinkedField",
        "name": "updateOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "ExpressCheckoutUI_order"
                      },
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OrderMutationSuccess",
                "abstractKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "updateOrderPayload",
        "kind": "LinkedField",
        "name": "updateOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "source",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mode",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v6/*: any*/),
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
                            "kind": "ScalarField",
                            "name": "country",
                            "storageKey": null
                          },
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
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          }
                        ],
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
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "slug",
                                "storageKey": null
                              },
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v13/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OrderMutationSuccess",
                "abstractKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "04808e332f016540288f9b98b8c8f32c",
    "id": null,
    "metadata": {},
    "name": "useUpdateOrderMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateOrderMutation(\n  $input: updateOrderInput!\n) {\n  updateOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderMutationSuccess {\n        order {\n          internalID\n          ...ExpressCheckoutUI_order\n          fulfillmentOptions {\n            type\n            amount {\n              minor\n              currencyCode\n            }\n            selected\n          }\n          buyerTotal {\n            minor\n            currencyCode\n          }\n          itemsTotal {\n            minor\n          }\n          shippingTotal {\n            minor\n          }\n          availableShippingCountries\n          id\n        }\n      }\n      ... on OrderMutationError {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n\nfragment ExpressCheckoutUI_order on Order {\n  internalID\n  source\n  mode\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n  }\n  shippingTotal {\n    minor\n  }\n  availableShippingCountries\n  fulfillmentOptions {\n    type\n    amount {\n      minor\n      currencyCode\n    }\n    selected\n  }\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n    phoneNumberCountryCode\n    name\n  }\n  lineItems {\n    artwork {\n      internalID\n      slug\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd5f1d96d821c58dce20c5283ebe84dd";

export default node;
