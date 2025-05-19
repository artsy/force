/**
 * @generated SignedSource<<5442d94645a2fd17c42d7680e24cd276>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DisplayTextsMessageTypeEnum = "APPROVED_PICKUP" | "APPROVED_SHIP" | "APPROVED_SHIP_EXPRESS" | "APPROVED_SHIP_STANDARD" | "APPROVED_SHIP_WHITE_GLOVE" | "CANCELLED_ORDER" | "COMPLETED_PICKUP" | "COMPLETED_SHIP" | "PAYMENT_FAILED" | "PROCESSING_PAYMENT_PICKUP" | "PROCESSING_PAYMENT_SHIP" | "PROCESSING_WIRE" | "SHIPPED" | "SUBMITTED_OFFER" | "SUBMITTED_ORDER" | "UNKNOWN" | "%future added value";
export type Order2DetailsPage_Test_Query$variables = Record<PropertyKey, never>;
export type Order2DetailsPage_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsPage_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsPage_Test_Query$rawResponse = {
  readonly me: {
    readonly id: string;
    readonly order: {
      readonly buyerStateExpiresAt: string | null | undefined;
      readonly code: string;
      readonly displayTexts: {
        readonly messageType: DisplayTextsMessageTypeEnum;
        readonly title: string;
      };
      readonly id: string;
      readonly internalID: string;
    } | null | undefined;
  } | null | undefined;
};
export type Order2DetailsPage_Test_Query = {
  rawResponse: Order2DetailsPage_Test_Query$rawResponse;
  response: Order2DetailsPage_Test_Query$data;
  variables: Order2DetailsPage_Test_Query$variables;
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
    "name": "Order2DetailsPage_Test_Query",
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
                "name": "Order2DetailsPage_order"
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
    "name": "Order2DetailsPage_Test_Query",
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
                "name": "code",
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
                    "name": "title",
                    "storageKey": null
                  },
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
                "kind": "ScalarField",
                "name": "buyerStateExpiresAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
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
    "cacheID": "a84eb443953df2930ee38d218e11c337",
    "id": null,
    "metadata": {},
    "name": "Order2DetailsPage_Test_Query",
    "operationKind": "query",
    "text": "query Order2DetailsPage_Test_Query {\n  me {\n    order(id: \"123\") {\n      ...Order2DetailsPage_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DetailsHeader_order on Order {\n  code\n  displayTexts {\n    title\n  }\n}\n\nfragment Order2DetailsMessage2_order on Order {\n  buyerStateExpiresAt\n  code\n  internalID\n  displayTexts {\n    messageType\n  }\n}\n\nfragment Order2DetailsPage_order on Order {\n  ...Order2DetailsHeader_order\n  ...Order2DetailsMessage2_order\n}\n"
  }
};
})();

(node as any).hash = "b68af50676405f31177c883fe9ef437a";

export default node;
