/**
 * @generated SignedSource<<c577935a76f6bd788cebb2a27ad27df9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsPaymentsRoute_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsPaymentsMethods_me">;
  readonly " $fragmentType": "SettingsPaymentsRoute_me";
};
export type SettingsPaymentsRoute_me$key = {
  readonly " $data"?: SettingsPaymentsRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsPaymentsRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsPaymentsRoute_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsPaymentsMethods_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "d5e17350fd5b99c456131babc0debbb3";

export default node;
