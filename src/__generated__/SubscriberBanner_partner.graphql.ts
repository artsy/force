/**
 * @generated SignedSource<<f3ce19f6b15dc5359ad1633ee29a894e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubscriberBanner_partner$data = {
  readonly name: string | null | undefined;
  readonly " $fragmentType": "SubscriberBanner_partner";
};
export type SubscriberBanner_partner$key = {
  readonly " $data"?: SubscriberBanner_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubscriberBanner_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubscriberBanner_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "1384c5a732dffbf0db39e472e863aea8";

export default node;
