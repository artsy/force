/**
 * @generated SignedSource<<4f848de9321ac14e92ecbc494ad12326>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type OrderBuyerStateEnum = "APPROVED" | "CANCELED" | "COMPLETED" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "INCOMPLETE" | "OFFER_RECEIVED" | "PAYMENT_FAILED" | "PROCESSING_OFFLINE_PAYMENT" | "PROCESSING_PAYMENT" | "REFUNDED" | "SHIPPED" | "SUBMITTED" | "UNKNOWN" | "%future added value";
export type ArtworkPageBannerOrdersQuery$variables = {
  artworkID: string;
};
export type ArtworkPageBannerOrdersQuery$data = {
  readonly me: {
    readonly ordersConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly buyerState: OrderBuyerStateEnum | null | undefined;
          readonly displayTexts: {
            readonly title: string;
          };
          readonly internalID: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type ArtworkPageBannerOrdersQuery = {
  response: ArtworkPageBannerOrdersQuery$data;
  variables: ArtworkPageBannerOrdersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "artworkID",
    "variableName": "artworkID"
  },
  {
    "kind": "Literal",
    "name": "buyerState",
    "value": [
      "SUBMITTED",
      "APPROVED",
      "COMPLETED",
      "OFFER_RECEIVED",
      "PROCESSING_OFFLINE_PAYMENT",
      "REFUNDED",
      "PAYMENT_FAILED",
      "SHIPPED",
      "PROCESSING_PAYMENT"
    ]
  },
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerState",
  "storageKey": null
},
v4 = {
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
      "name": "title",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
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
    "name": "ArtworkPageBannerOrdersQuery",
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
            "concreteType": "MeOrdersConnection",
            "kind": "LinkedField",
            "name": "ordersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MeOrdersEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtworkPageBannerOrdersQuery",
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
            "concreteType": "MeOrdersConnection",
            "kind": "LinkedField",
            "name": "ordersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MeOrdersEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1d4cfe3665ba25ddfa3c2f749b0ff801",
    "id": null,
    "metadata": {},
    "name": "ArtworkPageBannerOrdersQuery",
    "operationKind": "query",
    "text": "query ArtworkPageBannerOrdersQuery(\n  $artworkID: String!\n) {\n  me {\n    ordersConnection(artworkID: $artworkID, first: 10, buyerState: [SUBMITTED, APPROVED, COMPLETED, OFFER_RECEIVED, PROCESSING_OFFLINE_PAYMENT, REFUNDED, PAYMENT_FAILED, SHIPPED, PROCESSING_PAYMENT]) {\n      edges {\n        node {\n          internalID\n          buyerState\n          displayTexts {\n            title\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "40828b72bd0f991a164862ec1d37c451";

export default node;
