/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsMyCollectionRoute_me = {
    readonly name: string | null;
    readonly " $refType": "SettingsMyCollectionRoute_me";
};
export type SettingsMyCollectionRoute_me$data = SettingsMyCollectionRoute_me;
export type SettingsMyCollectionRoute_me$key = {
    readonly " $data"?: SettingsMyCollectionRoute_me$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SettingsMyCollectionRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsMyCollectionRoute_me",
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
(node as any).hash = 'cf1541dbadb60b8a751d66a1692442b5';
export default node;
