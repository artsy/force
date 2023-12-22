/**
 * @generated SignedSource<<053e65754ae401fc8d92aa41f5922b5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PENDING" | "PROCESSING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PartnerOfferTimerItem_order$data = {
  readonly displayState: CommerceOrderDisplayStateEnum;
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
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "06133f61d1582ce0c3c8890ca9352184";

export default node;
