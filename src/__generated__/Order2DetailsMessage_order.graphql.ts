/**
 * @generated SignedSource<<fdd4bd904ed4b60e7555cc7b22389581>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type DisplayTextsMessageTypeEnum = "APPROVED_PICKUP" | "APPROVED_SHIP" | "APPROVED_SHIP_EXPRESS" | "APPROVED_SHIP_STANDARD" | "APPROVED_SHIP_WHITE_GLOVE" | "CANCELLED_ORDER" | "COMPLETED_PICKUP" | "COMPLETED_SHIP" | "PAYMENT_FAILED" | "PROCESSING_PAYMENT_PICKUP" | "PROCESSING_PAYMENT_SHIP" | "PROCESSING_WIRE" | "SHIPPED" | "SUBMITTED_OFFER" | "SUBMITTED_ORDER" | "UNKNOWN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsMessage_order$data = {
  readonly buyerStateExpiresAt: string | null | undefined;
  readonly code: string;
  readonly currencyCode: string;
  readonly displayTexts: {
    readonly messageType: DisplayTextsMessageTypeEnum;
  };
  readonly internalID: string;
  readonly " $fragmentType": "Order2DetailsMessage_order";
};
export type Order2DetailsMessage_order$key = {
  readonly " $data"?: Order2DetailsMessage_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsMessage_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DetailsMessage_order",
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
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "d4a3de784c48a5844b365765f8ecc8ee";

export default node;
