/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type PaymentPickerEigenTestQueryVariables = {};
export type PaymentPickerEigenTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"PaymentPicker_me">;
    } | null;
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"PaymentPicker_order">;
    } | null;
};
export type PaymentPickerEigenTestQueryRawResponse = {
    readonly me: ({
        readonly creditCards: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string;
                    readonly brand: string;
                    readonly lastDigits: string;
                    readonly expirationMonth: number;
                    readonly expirationYear: number;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
    readonly order: ({
        readonly __typename: string | null;
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly creditCard: ({
            readonly internalID: string;
            readonly name: string | null;
            readonly street1: string | null;
            readonly street2: string | null;
            readonly city: string | null;
            readonly state: string | null;
            readonly country: string | null;
            readonly postalCode: string | null;
            readonly expirationMonth: number;
            readonly expirationYear: number;
            readonly lastDigits: string;
            readonly brand: string;
            readonly id: string | null;
        }) | null;
        readonly requestedFulfillment: ({
            readonly __typename: "CommerceShip";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly postalCode: string | null;
        } | {
            readonly __typename: "CommercePickup";
            readonly fulfillmentType: string;
        } | {
            readonly __typename: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly id: string | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type PaymentPickerEigenTestQuery = {
    readonly response: PaymentPickerEigenTestQueryResponse;
    readonly variables: PaymentPickerEigenTestQueryVariables;
    readonly rawResponse: PaymentPickerEigenTestQueryRawResponse;
};



/*
query PaymentPickerEigenTestQuery {
  me {
    ...PaymentPicker_me
    id
  }
  order: commerceOrder(id: "unused") {
    __typename
    ...PaymentPicker_order
    id
  }
}

fragment PaymentPicker_me on Me {
  creditCards(first: 100) {
    edges {
      node {
        internalID
        brand
        lastDigits
        expirationMonth
        expirationYear
        id
      }
    }
  }
}

fragment PaymentPicker_order on CommerceOrder {
  internalID
  mode
  state
  creditCard {
    internalID
    name
    street1
    street2
    city
    state
    country
    postalCode
    expirationMonth
    expirationYear
    lastDigits
    brand
    id
  }
  requestedFulfillment {
    __typename
    ... on CommerceShip {
      name
      addressLine1
      addressLine2
      city
      region
      country
      postalCode
    }
    ... on CommercePickup {
      fulfillmentType
    }
  }
  lineItems {
    edges {
      node {
        artwork {
          slug
          id
        }
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
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
  "name": "brand",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastDigits",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationMonth",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationYear",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v13 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v15 = {
  "type": "CreditCard",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v16 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v17 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v18 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PaymentPickerEigenTestQuery",
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
            "name": "PaymentPicker_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PaymentPicker_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PaymentPickerEigenTestQuery",
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
                "value": 100
              }
            ],
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
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:100)"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mode",
            "storageKey": null
          },
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "street1",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "street2",
                "storageKey": null
              },
              (v10/*: any*/),
              (v8/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/),
              (v2/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "requestedFulfillment",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v9/*: any*/),
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
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "region",
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "type": "CommerceShip"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "fulfillmentType",
                    "storageKey": null
                  }
                ],
                "type": "CommercePickup"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CommerceLineItemConnection",
            "kind": "LinkedField",
            "name": "lineItems",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceLineItemEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommerceLineItem",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
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
                            "name": "slug",
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order": {
          "type": "CommerceOrder",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v13/*: any*/),
        "order.id": (v13/*: any*/),
        "me.creditCards": {
          "type": "CreditCardConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.internalID": (v14/*: any*/),
        "order.mode": {
          "type": "CommerceOrderModeEnum",
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "plural": false,
          "nullable": true
        },
        "order.state": {
          "type": "CommerceOrderStateEnum",
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "PENDING",
            "REFUNDED",
            "SUBMITTED"
          ],
          "plural": false,
          "nullable": false
        },
        "order.creditCard": (v15/*: any*/),
        "order.requestedFulfillment": {
          "type": "CommerceRequestedFulfillmentUnion",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems": {
          "type": "CommerceLineItemConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.creditCards.edges": {
          "type": "CreditCardEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "order.creditCard.internalID": (v14/*: any*/),
        "order.creditCard.name": (v16/*: any*/),
        "order.creditCard.street1": (v16/*: any*/),
        "order.creditCard.street2": (v16/*: any*/),
        "order.creditCard.city": (v16/*: any*/),
        "order.creditCard.state": (v16/*: any*/),
        "order.creditCard.country": (v16/*: any*/),
        "order.creditCard.postalCode": (v16/*: any*/),
        "order.creditCard.expirationMonth": (v17/*: any*/),
        "order.creditCard.expirationYear": (v17/*: any*/),
        "order.creditCard.lastDigits": (v18/*: any*/),
        "order.creditCard.brand": (v18/*: any*/),
        "order.creditCard.id": (v13/*: any*/),
        "order.requestedFulfillment.__typename": (v18/*: any*/),
        "order.lineItems.edges": {
          "type": "CommerceLineItemEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.creditCards.edges.node": (v15/*: any*/),
        "order.requestedFulfillment.name": (v16/*: any*/),
        "order.requestedFulfillment.addressLine1": (v16/*: any*/),
        "order.requestedFulfillment.addressLine2": (v16/*: any*/),
        "order.requestedFulfillment.city": (v16/*: any*/),
        "order.requestedFulfillment.region": (v16/*: any*/),
        "order.requestedFulfillment.country": (v16/*: any*/),
        "order.requestedFulfillment.postalCode": (v16/*: any*/),
        "order.requestedFulfillment.fulfillmentType": (v18/*: any*/),
        "order.lineItems.edges.node": {
          "type": "CommerceLineItem",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.creditCards.edges.node.internalID": (v14/*: any*/),
        "me.creditCards.edges.node.brand": (v18/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v18/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v17/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v17/*: any*/),
        "me.creditCards.edges.node.id": (v13/*: any*/),
        "order.lineItems.edges.node.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.id": (v13/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v14/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v13/*: any*/)
      }
    },
    "name": "PaymentPickerEigenTestQuery",
    "operationKind": "query",
    "text": "query PaymentPickerEigenTestQuery {\n  me {\n    ...PaymentPicker_me\n    id\n  }\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...PaymentPicker_order\n    id\n  }\n}\n\nfragment PaymentPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        internalID\n        brand\n        lastDigits\n        expirationMonth\n        expirationYear\n        id\n      }\n    }\n  }\n}\n\nfragment PaymentPicker_order on CommerceOrder {\n  internalID\n  mode\n  state\n  creditCard {\n    internalID\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postalCode\n    expirationMonth\n    expirationYear\n    lastDigits\n    brand\n    id\n  }\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommercePickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6b5b39b7f15cd217ffcf02262b9f4b04';
export default node;
