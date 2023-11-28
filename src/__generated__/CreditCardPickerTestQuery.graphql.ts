/**
 * @generated SignedSource<<2220f42dbf81c4f8859d948f22a01257>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CreditCardPickerTestQuery$variables = Record<PropertyKey, never>;
export type CreditCardPickerTestQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CreditCardPicker_me">;
  } | null | undefined;
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"CreditCardPicker_order">;
  } | null | undefined;
};
export type CreditCardPickerTestQuery$rawResponse = {
  readonly me: {
    readonly creditCards: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly brand: string;
          readonly expirationMonth: number;
          readonly expirationYear: number;
          readonly id: string;
          readonly internalID: string;
          readonly lastDigits: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly order: {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly creditCard: {
      readonly brand: string;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly expirationMonth: number;
      readonly expirationYear: number;
      readonly id: string;
      readonly internalID: string;
      readonly lastDigits: string;
      readonly name: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly state: string | null | undefined;
      readonly street1: string | null | undefined;
      readonly street2: string | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly internalID: string;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly id: string;
            readonly slug: string;
          } | null | undefined;
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly requestedFulfillment: {
      readonly __typename: "CommercePickup";
      readonly fulfillmentType: string;
    } | {
      readonly __typename: "CommerceShip";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: "CommerceShipArta";
      readonly addressLine1: string | null | undefined;
      readonly addressLine2: string | null | undefined;
      readonly city: string | null | undefined;
      readonly country: string | null | undefined;
      readonly name: string | null | undefined;
      readonly postalCode: string | null | undefined;
      readonly region: string | null | undefined;
    } | {
      readonly __typename: string;
    } | null | undefined;
    readonly state: CommerceOrderStateEnum;
  } | null | undefined;
};
export type CreditCardPickerTestQuery = {
  rawResponse: CreditCardPickerTestQuery$rawResponse;
  response: CreditCardPickerTestQuery$data;
  variables: CreditCardPickerTestQuery$variables;
};

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
v13 = [
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
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CreditCard"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreditCardPickerTestQuery",
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
            "name": "CreditCardPicker_me"
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
            "name": "CreditCardPicker_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreditCardPickerTestQuery",
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
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
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
                "selections": (v13/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v13/*: any*/),
                "type": "CommerceShipArta",
                "abstractKey": null
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
                "type": "CommercePickup",
                "abstractKey": null
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
    "cacheID": "68f5203d6806213973dd3e6f13f60270",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
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
        "me.creditCards.edges.node": (v14/*: any*/),
        "me.creditCards.edges.node.brand": (v15/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v16/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v16/*: any*/),
        "me.creditCards.edges.node.id": (v17/*: any*/),
        "me.creditCards.edges.node.internalID": (v17/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v15/*: any*/),
        "me.id": (v17/*: any*/),
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v15/*: any*/),
        "order.__typename": (v15/*: any*/),
        "order.creditCard": (v14/*: any*/),
        "order.creditCard.brand": (v15/*: any*/),
        "order.creditCard.city": (v18/*: any*/),
        "order.creditCard.country": (v18/*: any*/),
        "order.creditCard.expirationMonth": (v16/*: any*/),
        "order.creditCard.expirationYear": (v16/*: any*/),
        "order.creditCard.id": (v17/*: any*/),
        "order.creditCard.internalID": (v17/*: any*/),
        "order.creditCard.lastDigits": (v15/*: any*/),
        "order.creditCard.name": (v18/*: any*/),
        "order.creditCard.postalCode": (v18/*: any*/),
        "order.creditCard.state": (v18/*: any*/),
        "order.creditCard.street1": (v18/*: any*/),
        "order.creditCard.street2": (v18/*: any*/),
        "order.id": (v17/*: any*/),
        "order.internalID": (v17/*: any*/),
        "order.lineItems": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItemConnection"
        },
        "order.lineItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItemEdge"
        },
        "order.lineItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItem"
        },
        "order.lineItems.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "order.lineItems.edges.node.artwork.id": (v17/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v17/*: any*/),
        "order.lineItems.edges.node.id": (v17/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__typename": (v15/*: any*/),
        "order.requestedFulfillment.addressLine1": (v18/*: any*/),
        "order.requestedFulfillment.addressLine2": (v18/*: any*/),
        "order.requestedFulfillment.city": (v18/*: any*/),
        "order.requestedFulfillment.country": (v18/*: any*/),
        "order.requestedFulfillment.fulfillmentType": (v15/*: any*/),
        "order.requestedFulfillment.name": (v18/*: any*/),
        "order.requestedFulfillment.postalCode": (v18/*: any*/),
        "order.requestedFulfillment.region": (v18/*: any*/),
        "order.state": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "IN_REVIEW",
            "PENDING",
            "PROCESSING_APPROVAL",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderStateEnum"
        }
      }
    },
    "name": "CreditCardPickerTestQuery",
    "operationKind": "query",
    "text": "query CreditCardPickerTestQuery {\n  me {\n    ...CreditCardPicker_me\n    id\n  }\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...CreditCardPicker_order\n    id\n  }\n}\n\nfragment CreditCardPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        internalID\n        brand\n        lastDigits\n        expirationMonth\n        expirationYear\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardPicker_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  state\n  creditCard {\n    internalID\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postalCode\n    expirationMonth\n    expirationYear\n    lastDigits\n    brand\n    id\n  }\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommerceShipArta {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommercePickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b6cca45a8da20f5cfb1f6cc07127e23a";

export default node;
