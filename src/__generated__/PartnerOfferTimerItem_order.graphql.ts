/**
 * @generated SignedSource<<4a5efb05da40ea0ca0af505cbaf5e31e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PAYMENT_FAILED" | "PENDING" | "PROCESSING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PartnerOfferTimerItem_order$data = {
  readonly displayState: CommerceOrderDisplayStateEnum;
  readonly stateExpiresAt: string | null | undefined;
  readonly " $fragmentType": "PartnerOfferTimerItem_order";
};
export type PartnerOfferTimerItem_order$key = {
  readonly " $data"?: PartnerOfferTimerItem_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerOfferTimerItem_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerOfferTimerItem_order",
  "selections": [
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
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "09b03612c73375c263a55e9245c003bf";

export default node;
