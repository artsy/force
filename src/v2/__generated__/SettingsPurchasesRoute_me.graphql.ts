/**
 * @generated SignedSource<<01d3bba9b37098624a46b2eaabfcc5dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsPurchasesRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsPurchases_me">;
  readonly " $fragmentType": "SettingsPurchasesRoute_me";
};
export type SettingsPurchasesRoute_me$key = {
  readonly " $data"?: SettingsPurchasesRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsPurchasesRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsPurchasesRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsPurchases_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "8a2efa38bf0d5311ae045d8dfffb326d";

export default node;
