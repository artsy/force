/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsShippingRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SettingsShippingAddresses_me">;
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
      "name": "SettingsShippingAddresses_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '75634e25dd6e5d30a96d75b118414628';
export default node;
