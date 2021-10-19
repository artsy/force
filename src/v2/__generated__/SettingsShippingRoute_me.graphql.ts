/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsShippingRoute_me = {
    readonly name: string | null;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = '613daa2b2e49638aab047365489da964';
export default node;
