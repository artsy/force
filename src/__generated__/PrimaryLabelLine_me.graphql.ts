/**
 * @generated SignedSource<<38f9647c270e2e91651dc10433dd6559>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrimaryLabelLine_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useFulfillmentOptions_me">;
  readonly " $fragmentType": "PrimaryLabelLine_me";
};
export type PrimaryLabelLine_me$key = {
  readonly " $data"?: PrimaryLabelLine_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrimaryLabelLine_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrimaryLabelLine_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useFulfillmentOptions_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "fa2910d129890e93418bd531b399aef0";

export default node;
