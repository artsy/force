/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileAboutYou_me = {
    readonly location: {
        readonly display: string | null;
    } | null;
    readonly profession: string | null;
    readonly shareFollows: boolean;
    readonly priceRange: string | null;
    readonly priceRangeMin: number | null;
    readonly priceRangeMax: number | null;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceRange",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceRangeMin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceRangeMax",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'a7b9e0dff7d2984dbd7e76f5cc39eb71';
export default node;
