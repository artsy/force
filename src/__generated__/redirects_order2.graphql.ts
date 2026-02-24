/**
 * @generated SignedSource<<b0362c9e8c655f2283265e9f995b47f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderBuyerStateEnum = "APPROVED" | "CANCELED" | "COMPLETED" | "DECLINED_BY_BUYER" | "DECLINED_BY_SELLER" | "INCOMPLETE" | "OFFER_RECEIVED" | "PAYMENT_FAILED" | "PROCESSING_OFFLINE_PAYMENT" | "PROCESSING_PAYMENT" | "REFUNDED" | "SHIPPED" | "SUBMITTED" | "UNKNOWN" | "%future added value";
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type redirects_order2$data = {
  readonly buyerState: OrderBuyerStateEnum | null | undefined;
  readonly internalID: string;
  readonly mode: OrderModeEnum;
  readonly " $fragmentType": "redirects_order2";
};
export type redirects_order2$key = {
  readonly " $data"?: redirects_order2$data;
  readonly " $fragmentSpreads": FragmentRefs<"redirects_order2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "redirects_order2",
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
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "buyerState",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "d4dbc3e1b90216856e6dceb681b94c1e";

export default node;
