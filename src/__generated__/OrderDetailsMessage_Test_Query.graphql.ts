/**
 * @generated SignedSource<<9609dcae6cdbb6992e8a611b50d0db3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DisplayTextsMessageTypeEnum = "APPROVED_PICKUP" | "APPROVED_SHIP" | "APPROVED_SHIP_EXPRESS" | "APPROVED_SHIP_STANDARD" | "APPROVED_SHIP_WHITE_GLOVE" | "CANCELED" | "COMPLETED_PICKUP" | "COMPLETED_SHIP" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "PAYMENT_FAILED" | "PROCESSING_PAYMENT_PICKUP" | "PROCESSING_PAYMENT_SHIP" | "PROCESSING_WIRE" | "REFUNDED" | "SHIPPED" | "SUBMITTED_OFFER" | "SUBMITTED_ORDER" | "UNKNOWN" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
export type OrderDetailsMessage_Test_Query$variables = Record<PropertyKey, never>;
export type OrderDetailsMessage_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsMessage_order">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsMessage_me">;
  } | null | undefined;
};
export type OrderDetailsMessage_Test_Query$rawResponse = {
  readonly me: {
    readonly collectorProfile: {
      readonly bio: string | null | undefined;
      readonly id: string;
      readonly isEmailConfirmed: boolean | null | undefined;
      readonly isIdentityVerified: boolean | null | undefined;
      readonly location: {
        readonly country: string | null | undefined;
        readonly id: string;
      } | null | undefined;
      readonly otherRelevantPositions: string | null | undefined;
      readonly profession: string | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly order: {
      readonly buyerStateExpiresAt: string | null | undefined;
      readonly code: string;
      readonly currencyCode: string;
      readonly deliveryInfo: {
        readonly estimatedDelivery: string | null | undefined;
        readonly estimatedDeliveryWindow: string | null | undefined;
        readonly shipperName: string | null | undefined;
        readonly trackingNumber: string | null | undefined;
        readonly trackingURL: string | null | undefined;
      } | null | undefined;
      readonly displayTexts: {
        readonly messageType: DisplayTextsMessageTypeEnum;
      };
      readonly id: string;
      readonly impulseConversationId: string | null | undefined;
      readonly internalID: string;
      readonly mode: OrderModeEnum;
      readonly source: OrderSourceEnum;
    } | null | undefined;
  } | null | undefined;
};
export type OrderDetailsMessage_Test_Query = {
  rawResponse: OrderDetailsMessage_Test_Query$rawResponse;
  response: OrderDetailsMessage_Test_Query$data;
  variables: OrderDetailsMessage_Test_Query$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderDetailsMessage_Test_Query",
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
            "name": "OrderDetailsMessage_me"
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
                "name": "OrderDetailsMessage_order"
              }
            ],
            "storageKey": "order(id:\"123\")"
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
    "name": "OrderDetailsMessage_Test_Query",
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
            "args": null,
            "concreteType": "CollectorProfileType",
            "kind": "LinkedField",
            "name": "collectorProfile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isEmailConfirmed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MyLocation",
                "kind": "LinkedField",
                "name": "location",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "country",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "profession",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isIdentityVerified",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "otherRelevantPositions",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bio",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
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
                "name": "buyerStateExpiresAt",
                "storageKey": null
              },
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
                "name": "currencyCode",
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
                "kind": "ScalarField",
                "name": "impulseConversationId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "DisplayTexts",
                "kind": "LinkedField",
                "name": "displayTexts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "messageType",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "DeliveryInfo",
                "kind": "LinkedField",
                "name": "deliveryInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "shipperName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "trackingNumber",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "trackingURL",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "estimatedDelivery",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "estimatedDeliveryWindow",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"123\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "aee1889e76b6518c6183211df95ecd92",
    "id": null,
    "metadata": {},
    "name": "OrderDetailsMessage_Test_Query",
    "operationKind": "query",
    "text": "query OrderDetailsMessage_Test_Query {\n  me {\n    ...OrderDetailsMessage_me\n    order(id: \"123\") {\n      ...OrderDetailsMessage_order\n      id\n    }\n    id\n  }\n}\n\nfragment OrderDetailsMessage_me on Me {\n  collectorProfile {\n    isEmailConfirmed\n    location {\n      country\n      id\n    }\n    profession\n    isIdentityVerified\n    otherRelevantPositions\n    bio\n    id\n  }\n}\n\nfragment OrderDetailsMessage_order on Order {\n  buyerStateExpiresAt\n  code\n  currencyCode\n  internalID\n  impulseConversationId\n  displayTexts {\n    messageType\n  }\n  deliveryInfo {\n    shipperName\n    trackingNumber\n    trackingURL\n    estimatedDelivery\n    estimatedDeliveryWindow\n  }\n  source\n  mode\n}\n"
  }
};
})();

(node as any).hash = "0a14ae201f82b56b120730a0afa9f4f8";

export default node;
