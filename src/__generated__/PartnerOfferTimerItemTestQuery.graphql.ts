/**
 * @generated SignedSource<<6755219a4f0604ea84046af45c9f0d15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerOfferTimerItemTestQuery$variables = Record<PropertyKey, never>;
export type PartnerOfferTimerItemTestQuery$data = {
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerOfferTimerItem_order">;
  } | null | undefined;
};
export type PartnerOfferTimerItemTestQuery = {
  response: PartnerOfferTimerItemTestQuery$data;
  variables: PartnerOfferTimerItemTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v2 = {
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
    "name": "PartnerOfferTimerItemTestQuery",
    "selections": [
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
            "name": "PartnerOfferTimerItem_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"123\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerOfferTimerItemTestQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayState",
            "storageKey": null
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "commerceOrder(id:\"123\")"
      }
    ]
  },
  "params": {
    "cacheID": "e240a59ab4afd271fb9fdfccb1115d39",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v1/*: any*/),
        "order.__typename": (v1/*: any*/),
        "order.displayState": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "IN_TRANSIT",
            "PENDING",
            "PROCESSING",
            "PROCESSING_APPROVAL",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderDisplayStateEnum"
        },
        "order.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "order.stateExpiresAt": (v2/*: any*/),
        "order.stateUpdatedAt": (v2/*: any*/)
      }
    },
    "name": "PartnerOfferTimerItemTestQuery",
    "operationKind": "query",
    "text": "query PartnerOfferTimerItemTestQuery {\n  order: commerceOrder(id: \"123\") {\n    __typename\n    ...PartnerOfferTimerItem_order\n    id\n  }\n}\n\nfragment PartnerOfferTimerItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  displayState\n  stateExpiresAt\n  stateUpdatedAt\n}\n"
  }
};
})();

(node as any).hash = "5890c0ea801218fdfa9b4692e72fb4ff";

export default node;
