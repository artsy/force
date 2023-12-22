/**
 * @generated SignedSource<<5dacd20e0787d9dc81de8a2be4673f62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PartnerOfferTimerItem_order$data = {
  readonly state: CommerceOrderStateEnum;
  readonly stateExpiresAt: string | null | undefined;
  readonly stateUpdatedAt: string | null | undefined;
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
      "name": "state",
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
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "d4c4a37a1037d562a3ec3894fc65ab35";

export default node;
