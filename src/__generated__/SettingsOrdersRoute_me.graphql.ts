/**
 * @generated SignedSource<<d3bed6fb2a3a5efad7cebfee5e728f5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsOrdersRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsOrders_me">;
  readonly " $fragmentType": "SettingsOrdersRoute_me";
};
export type SettingsOrdersRoute_me$key = {
  readonly " $data"?: SettingsOrdersRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsOrdersRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "page"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsOrdersRoute_me",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        }
      ],
      "kind": "FragmentSpread",
      "name": "SettingsOrders_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "978f307365bf430b588a46989eea226b";

export default node;
