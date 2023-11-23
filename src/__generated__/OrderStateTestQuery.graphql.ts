/**
 * @generated SignedSource<<7cccf6b24ae14d3a66fee8d5466f7a2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderStateTestQuery$variables = Record<PropertyKey, never>;
export type OrderStateTestQuery$data = {
  readonly commerceOrder: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationOrderState_state">;
  } | null | undefined;
};
export type OrderStateTestQuery = {
  response: OrderStateTestQuery$data;
  variables: OrderStateTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
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
    "name": "OrderStateTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConversationOrderState_state"
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
    "name": "OrderStateTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
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
            "name": "stateReason",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "from",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "offerAmountChanged",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stateExpiresAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stateUpdatedAt",
            "storageKey": null
          },
          {
            "alias": "formattedStateExpiresAt",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D, h:mm A zz"
              }
            ],
            "kind": "ScalarField",
            "name": "stateExpiresAt",
            "storageKey": "stateExpiresAt(format:\"MMM D, h:mm A zz\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "40955eeacddae97c2fff092a90ad2239",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "commerceOrder": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "commerceOrder.__isCommerceOrder": (v2/*: any*/),
        "commerceOrder.__typename": (v2/*: any*/),
        "commerceOrder.formattedStateExpiresAt": (v3/*: any*/),
        "commerceOrder.id": (v4/*: any*/),
        "commerceOrder.lastOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOffer"
        },
        "commerceOrder.lastOffer.from": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderPartyUnion"
        },
        "commerceOrder.lastOffer.from.__typename": (v2/*: any*/),
        "commerceOrder.lastOffer.id": (v4/*: any*/),
        "commerceOrder.lastOffer.offerAmountChanged": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "commerceOrder.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "commerceOrder.state": {
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
        },
        "commerceOrder.stateExpiresAt": (v3/*: any*/),
        "commerceOrder.stateReason": (v3/*: any*/),
        "commerceOrder.stateUpdatedAt": (v3/*: any*/)
      }
    },
    "name": "OrderStateTestQuery",
    "operationKind": "query",
    "text": "query OrderStateTestQuery {\n  commerceOrder {\n    __typename\n    ...ConversationOrderState_state\n    id\n  }\n}\n\nfragment ConversationOrderState_state on CommerceOrder {\n  __isCommerceOrder: __typename\n  state\n  mode\n  stateReason\n  ... on CommerceOfferOrder {\n    lastOffer {\n      from {\n        __typename\n      }\n      offerAmountChanged\n      id\n    }\n  }\n  ...ConversationStatusWithCounter_order\n}\n\nfragment ConversationStatusWithCounter_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  stateExpiresAt\n  stateUpdatedAt\n  formattedStateExpiresAt: stateExpiresAt(format: \"MMM D, h:mm A zz\")\n}\n"
  }
};
})();

(node as any).hash = "f436656c053ca1812bd18d6644ad93f1";

export default node;
