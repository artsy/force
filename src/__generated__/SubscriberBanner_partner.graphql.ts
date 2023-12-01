/**
 * @generated SignedSource<<920d8993ac8c222c2b22ee0ed1788b77>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubscriberBanner_partner$data = {
  readonly hasFairPartnership: boolean | null | undefined;
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
      "name": "hasFairPartnership",
      "storageKey": null
    },
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

(node as any).hash = "7487f99627cea3dec4f11e8d0908e5fd";

export default node;
