/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileRoute_me = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileAboutYou_me">;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsEditProfileAboutYou_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '4c3823e3c61ae15e7cf8ec1241e5b4dd';
export default node;
