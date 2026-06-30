/**
 * @generated SignedSource<<61c89ffcdb7ba5663e3df9ad28968dff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2OfferHistoryTestQuery$variables = Record<PropertyKey, never>;
export type Order2OfferHistoryTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2OfferHistory_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2OfferHistoryTestQuery = {
  response: Order2OfferHistoryTestQuery$data;
  variables: Order2OfferHistoryTestQuery$variables;
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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v5 = {
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
    "name": "Order2OfferHistoryTestQuery",
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
                "name": "Order2OfferHistory_order"
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
    "name": "Order2OfferHistoryTestQuery",
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
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "submittedOffers",
                "plural": true,
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
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "MMMM D, YYYY"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": "createdAt(format:\"MMMM D, YYYY\")"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "fromParticipant",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "amount",
                    "plural": false,
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "buyerTotal",
                    "plural": false,
                    "selections": (v1/*: any*/),
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2eb87e7f2857c3fbf15a149ea5a44f41",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v3/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.id": (v3/*: any*/),
        "me.order.submittedOffers": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Offer"
        },
        "me.order.submittedOffers.amount": (v4/*: any*/),
        "me.order.submittedOffers.amount.display": (v5/*: any*/),
        "me.order.submittedOffers.buyerTotal": (v4/*: any*/),
        "me.order.submittedOffers.buyerTotal.display": (v5/*: any*/),
        "me.order.submittedOffers.createdAt": (v5/*: any*/),
        "me.order.submittedOffers.fromParticipant": {
          "enumValues": [
            "BUYER",
            "SELLER"
          ],
          "nullable": false,
          "plural": false,
          "type": "FromParticipantEnum"
        },
        "me.order.submittedOffers.id": (v3/*: any*/),
        "me.order.submittedOffers.internalID": (v3/*: any*/)
      }
    },
    "name": "Order2OfferHistoryTestQuery",
    "operationKind": "query",
    "text": "query Order2OfferHistoryTestQuery {\n  me {\n    order(id: \"order-id\") {\n      ...Order2OfferHistory_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2OfferHistory_order on Order {\n  submittedOffers {\n    internalID\n    createdAt(format: \"MMMM D, YYYY\")\n    fromParticipant\n    amount {\n      display\n    }\n    buyerTotal {\n      display\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e85acb333009d768358f35137f91b547";

export default node;
