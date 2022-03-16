/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileRoute_me = {
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileAboutYou_me" | "SettingsEditProfileArtistsYouCollect_me">;
    readonly " $refType": "SettingsEditProfileRoute_me";
};
export type SettingsEditProfileRoute_me$data = SettingsEditProfileRoute_me;
export type SettingsEditProfileRoute_me$key = {
    readonly " $data"?: SettingsEditProfileRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileAboutYou_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileArtistsYouCollect_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '26d0fff4b261bc91bb804dfbdfcdfbb4';
export default node;
