/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsShippingRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsAddresses_me">;
    readonly " $refType": "SettingsShippingRoute_me";
};
export type SettingsShippingRoute_me$data = SettingsShippingRoute_me;
export type SettingsShippingRoute_me$key = {
    readonly " $data"?: SettingsShippingRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsShippingRoute_me">;
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
      "name": "UserSettingsAddresses_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '2bbdca97d4e731d2d908e7419abd5217';
export default node;
