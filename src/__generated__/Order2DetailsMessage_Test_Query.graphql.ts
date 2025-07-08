/**
 * @generated SignedSource<<0e3ed6faffef30c782e8822ae55519f7>>
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
export type Order2DetailsMessage_Test_Query$variables = Record<PropertyKey, never>;
export type Order2DetailsMessage_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsMessage_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsMessage_Test_Query$rawResponse = {
  readonly me: {
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
      readonly lineItems: ReadonlyArray<{
        readonly artwork: {
          readonly id: string;
          readonly internalID: string;
          readonly slug: string;
        } | null | undefined;
        readonly id: string;
      } | null | undefined>;
      readonly mode: OrderModeEnum;
      readonly source: OrderSourceEnum;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsMessage_Test_Query = {
  rawResponse: Order2DetailsMessage_Test_Query$rawResponse;
  response: Order2DetailsMessage_Test_Query$data;
  variables: Order2DetailsMessage_Test_Query$variables;
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
  "name": "internalID",
  "storageKey": null
},
v2 = {
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
    "name": "Order2DetailsMessage_Test_Query",
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
                "name": "Order2DetailsMessage_order"
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
    "name": "Order2DetailsMessage_Test_Query",
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
              (v1/*: any*/),
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
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
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
              (v2/*: any*/)
            ],
            "storageKey": "order(id:\"123\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "615fa5e01d5d07c1c85507c98fc5f7f2",
    "id": null,
    "metadata": {},
    "name": "Order2DetailsMessage_Test_Query",
    "operationKind": "query",
    "text": "query Order2DetailsMessage_Test_Query {\n  me {\n    order(id: \"123\") {\n      ...Order2DetailsMessage_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DetailsMessage_order on Order {\n  buyerStateExpiresAt\n  code\n  currencyCode\n  internalID\n  impulseConversationId\n  displayTexts {\n    messageType\n  }\n  deliveryInfo {\n    shipperName\n    trackingNumber\n    trackingURL\n    estimatedDelivery\n    estimatedDeliveryWindow\n  }\n  lineItems {\n    artwork {\n      internalID\n      slug\n      id\n    }\n    id\n  }\n  source\n  mode\n}\n"
  }
};
})();

(node as any).hash = "de1d599ef2e4b64a3e9b78a1d42fdaa8";

export default node;
