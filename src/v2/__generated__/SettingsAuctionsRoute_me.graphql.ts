/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsAuctionsRoute_me = {
    readonly name: string | null;
    readonly " $refType": "SettingsAuctionsRoute_me";
};
export type SettingsAuctionsRoute_me$data = SettingsAuctionsRoute_me;
export type SettingsAuctionsRoute_me$key = {
    readonly " $data"?: SettingsAuctionsRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsAuctionsRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsAuctionsRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = 'e13f015b332f823b731cdf2c3c2995ee';
export default node;
