/**
 * @generated SignedSource<<50dda0d51bbf89faea8b2fb203dda55a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsOrdersRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsOrders_me">;
  readonly " $fragmentType": "SettingsOrdersRoute_me";
};
export type SettingsOrdersRoute_me$key = {
  readonly " $data"?: SettingsOrdersRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsOrdersRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsOrdersRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsOrders_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "5c8566d794655dd3d56b83caabcd1fb8";

export default node;
