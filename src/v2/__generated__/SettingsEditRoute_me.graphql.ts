/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileRoute_me">;
    readonly " $refType": "SettingsEditRoute_me";
};
export type SettingsEditRoute_me$data = SettingsEditRoute_me;
export type SettingsEditRoute_me$key = {
    readonly " $data"?: SettingsEditRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileRoute_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '124db54f085fdc5fd57b168993803be9';
export default node;
