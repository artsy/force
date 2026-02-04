/**
 * @generated SignedSource<<87f92fb9169d9b8ca04ad6948fdf4473>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2PaymentFormTestQuery$variables = Record<PropertyKey, never>;
export type Order2PaymentFormTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentForm_order">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"Order2PaymentForm_me">;
  } | null | undefined;
};
export type Order2PaymentFormTestQuery = {
  response: Order2PaymentFormTestQuery$data;
  variables: Order2PaymentFormTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-id"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
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
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2PaymentFormTestQuery",
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
            "name": "Order2PaymentForm_me"
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
                "name": "Order2PaymentForm_order"
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
    "name": "Order2PaymentFormTestQuery",
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
            "concreteType": "CreditCardConnection",
            "kind": "LinkedField",
            "name": "creditCards",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CreditCardEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "brand",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastDigits",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationYear",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationMonth",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:10)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "BankAccountConnection",
            "kind": "LinkedField",
            "name": "bankAccounts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BankAccountEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BankAccount",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "last4",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "bankName",
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "bankAccounts(first:10)"
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
                "name": "code",
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
                "kind": "ScalarField",
                "name": "source",
                "storageKey": null
              },
              (v3/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "availablePaymentMethods",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "availableStripePaymentMethodTypes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BankAccountBalanceCheck",
                "kind": "LinkedField",
                "name": "bankAccountBalanceCheck",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "result",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "message",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "itemsTotal",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "minor",
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "seller",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PartnerMerchantAccount",
                        "kind": "LinkedField",
                        "name": "merchantAccount",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "externalId",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Partner",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  }
                ],
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
                    "name": "name",
                    "storageKey": null
                  },
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
                    "name": "region",
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
                    "name": "country",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      {
                        "alias": "artworkMeta",
                        "args": null,
                        "concreteType": "ArtworkMeta",
                        "kind": "LinkedField",
                        "name": "meta",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "share",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
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
    "cacheID": "c070ca59fa6b38e8b4f82e3d87eefe00",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.bankAccounts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccountConnection"
        },
        "me.bankAccounts.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BankAccountEdge"
        },
        "me.bankAccounts.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccount"
        },
        "me.bankAccounts.edges.node.__typename": (v6/*: any*/),
        "me.bankAccounts.edges.node.bankName": (v7/*: any*/),
        "me.bankAccounts.edges.node.id": (v8/*: any*/),
        "me.bankAccounts.edges.node.internalID": (v8/*: any*/),
        "me.bankAccounts.edges.node.last4": (v6/*: any*/),
        "me.bankAccounts.edges.node.type": {
          "enumValues": [
            "SEPA_DEBIT",
            "US_BANK_ACCOUNT"
          ],
          "nullable": false,
          "plural": false,
          "type": "BankAccountTypes"
        },
        "me.creditCards": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCardConnection"
        },
        "me.creditCards.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CreditCardEdge"
        },
        "me.creditCards.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCard"
        },
        "me.creditCards.edges.node.__typename": (v6/*: any*/),
        "me.creditCards.edges.node.brand": (v6/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v9/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v9/*: any*/),
        "me.creditCards.edges.node.id": (v8/*: any*/),
        "me.creditCards.edges.node.internalID": (v8/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v6/*: any*/),
        "me.id": (v8/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.availablePaymentMethods": {
          "enumValues": [
            "CREDIT_CARD",
            "SEPA_DEBIT",
            "US_BANK_ACCOUNT",
            "WIRE_TRANSFER"
          ],
          "nullable": false,
          "plural": true,
          "type": "OrderPaymentMethodEnum"
        },
        "me.order.availableStripePaymentMethodTypes": {
          "enumValues": [
            "card",
            "sepa_debit",
            "us_bank_account"
          ],
          "nullable": false,
          "plural": true,
          "type": "OrderStripePaymentMethodTypeEnum"
        },
        "me.order.bankAccountBalanceCheck": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccountBalanceCheck"
        },
        "me.order.bankAccountBalanceCheck.message": (v7/*: any*/),
        "me.order.bankAccountBalanceCheck.result": {
          "enumValues": [
            "INSUFFICIENT",
            "INVALID",
            "NOT_SUPPORTED",
            "PENDING",
            "SUFFICIENT"
          ],
          "nullable": false,
          "plural": false,
          "type": "BankAccountBalanceCheckResult"
        },
        "me.order.code": (v6/*: any*/),
        "me.order.currencyCode": (v6/*: any*/),
        "me.order.fulfillmentDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentDetails"
        },
        "me.order.fulfillmentDetails.addressLine1": (v7/*: any*/),
        "me.order.fulfillmentDetails.addressLine2": (v7/*: any*/),
        "me.order.fulfillmentDetails.city": (v7/*: any*/),
        "me.order.fulfillmentDetails.country": (v7/*: any*/),
        "me.order.fulfillmentDetails.name": (v7/*: any*/),
        "me.order.fulfillmentDetails.postalCode": (v7/*: any*/),
        "me.order.fulfillmentDetails.region": (v7/*: any*/),
        "me.order.id": (v8/*: any*/),
        "me.order.internalID": (v8/*: any*/),
        "me.order.itemsTotal": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.order.itemsTotal.currencyCode": (v6/*: any*/),
        "me.order.itemsTotal.minor": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Long"
        },
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
        "me.order.lineItems.artwork.artworkMeta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "me.order.lineItems.artwork.artworkMeta.share": (v7/*: any*/),
        "me.order.lineItems.artwork.href": (v7/*: any*/),
        "me.order.lineItems.artwork.id": (v8/*: any*/),
        "me.order.lineItems.id": (v8/*: any*/),
        "me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "me.order.seller": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SellerType"
        },
        "me.order.seller.__isNode": (v6/*: any*/),
        "me.order.seller.__typename": (v6/*: any*/),
        "me.order.seller.id": (v8/*: any*/),
        "me.order.seller.merchantAccount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerMerchantAccount"
        },
        "me.order.seller.merchantAccount.externalId": (v6/*: any*/),
        "me.order.source": {
          "enumValues": [
            "ARTWORK_PAGE",
            "INQUIRY",
            "PARTNER_OFFER",
            "PRIVATE_SALE"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderSourceEnum"
        }
      }
    },
    "name": "Order2PaymentFormTestQuery",
    "operationKind": "query",
    "text": "query Order2PaymentFormTestQuery {\n  me {\n    ...Order2PaymentForm_me\n    order(id: \"order-id\") {\n      ...Order2PaymentForm_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PaymentForm_me on Me {\n  creditCards(first: 10) {\n    edges {\n      node {\n        __typename\n        internalID\n        brand\n        lastDigits\n        expirationYear\n        expirationMonth\n        id\n      }\n    }\n  }\n  bankAccounts(first: 10) {\n    edges {\n      node {\n        __typename\n        type\n        internalID\n        last4\n        bankName\n        id\n      }\n    }\n  }\n}\n\nfragment Order2PaymentForm_order on Order {\n  code\n  mode\n  source\n  internalID\n  currencyCode\n  availablePaymentMethods\n  availableStripePaymentMethodTypes\n  bankAccountBalanceCheck {\n    result\n    message\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  fulfillmentDetails {\n    name\n    addressLine1\n    addressLine2\n    city\n    region\n    postalCode\n    country\n  }\n  lineItems {\n    artwork {\n      href\n      artworkMeta: meta {\n        share\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "24e18b2278970f3566c23079df27c18d";

export default node;
