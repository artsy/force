/**
 * @generated SignedSource<<ca86b304c89fcb50d7ff4eb6e1db156c>>
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
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "4b58a8c8a4bb4bcbc13fd9519056de2a";

export default node;
