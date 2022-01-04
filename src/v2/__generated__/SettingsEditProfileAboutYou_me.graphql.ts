/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileAboutYou_me = {
    readonly location: {
        readonly display: string | null;
    } | null;
    readonly profession: string | null;
    readonly shareFollows: boolean;
    readonly " $refType": "SettingsEditProfileAboutYou_me";
};
export type SettingsEditProfileAboutYou_me$data = SettingsEditProfileAboutYou_me;
export type SettingsEditProfileAboutYou_me$key = {
    readonly " $data"?: SettingsEditProfileAboutYou_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileAboutYou_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileAboutYou_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyLocation",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profession",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shareFollows",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = '02cda8cc6fe83b3f06f0cb3b6138d488';
export default node;
