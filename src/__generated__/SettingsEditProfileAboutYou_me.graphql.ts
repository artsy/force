/**
 * @generated SignedSource<<dddfa4b8eae187e9f0eb2396a6e3f35a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileAboutYou_me$data = {
  readonly location: {
    readonly display: string | null;
  } | null;
  readonly priceRange: string | null;
  readonly priceRangeMax: number | null;
  readonly priceRangeMin: number | null;
  readonly profession: string | null;
  readonly shareFollows: boolean;
  readonly " $fragmentType": "SettingsEditProfileAboutYou_me";
};
export type SettingsEditProfileAboutYou_me$key = {
  readonly " $data"?: SettingsEditProfileAboutYou_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileAboutYou_me">;
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

(node as any).hash = "a7b9e0dff7d2984dbd7e76f5cc39eb71";

export default node;
