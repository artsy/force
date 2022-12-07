/**
 * @generated SignedSource<<89af01036aa0d6337cab0148a4d9f65e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsInformation_me$data = {
  readonly email: string | null;
  readonly name: string | null;
  readonly paddleNumber: string | null;
  readonly phone: string | null;
  readonly priceRange: string | null;
  readonly priceRangeMax: number | null;
  readonly priceRangeMin: number | null;
  readonly " $fragmentType": "SettingsEditSettingsInformation_me";
};
export type SettingsEditSettingsInformation_me$key = {
  readonly " $data"?: SettingsEditSettingsInformation_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsInformation_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsInformation_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paddleNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
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

(node as any).hash = "472799a84214c4526123d3aa93cd73ad";

export default node;
