/**
 * @generated SignedSource<<120d6ee2f999e48d3db47b0afe16554e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsEmailPreferences_me$data = {
  readonly emailFrequency: string | null;
  readonly id: string;
  readonly " $fragmentType": "SettingsEditSettingsEmailPreferences_me";
};
export type SettingsEditSettingsEmailPreferences_me$key = {
  readonly " $data"?: SettingsEditSettingsEmailPreferences_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsEmailPreferences_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsEmailPreferences_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emailFrequency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "4550a5ff6a1a73f29de9bf543f17fe3d";

export default node;
