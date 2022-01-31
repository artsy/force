/**
 * @generated SignedSource<<e9796466b2e4ded0caa1c63da1251344>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsAuctionsRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UserActiveBids_me" | "UserBidHistory_me" | "UserRegistrationAuctions_me">;
  readonly " $fragmentType": "SettingsAuctionsRoute_me";
};
export type SettingsAuctionsRoute_me$key = {
  readonly " $data"?: SettingsAuctionsRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsAuctionsRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsAuctionsRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserActiveBids_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserBidHistory_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserRegistrationAuctions_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "dcf8570839e3ca23ab567bfa554876bf";

export default node;
