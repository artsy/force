/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesRoute_me = {
    readonly name: string | null;
    readonly " $refType": "SettingsSavesRoute_me";
};
export type SettingsSavesRoute_me$data = SettingsSavesRoute_me;
export type SettingsSavesRoute_me$key = {
    readonly " $data"?: SettingsSavesRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsSavesRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsSavesRoute_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '1982b79a39acf2359161c14affbb6914';
export default node;
