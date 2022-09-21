/**
 * @generated SignedSource<<2f70c1da985b7b3d4f268ec80fcdd6ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsShippingRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsShippingAddresses_me">;
  readonly " $fragmentType": "SettingsShippingRoute_me";
};
export type SettingsShippingRoute_me$key = {
  readonly " $data"?: SettingsShippingRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsShippingRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsShippingRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsShippingAddresses_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "75634e25dd6e5d30a96d75b118414628";

export default node;
