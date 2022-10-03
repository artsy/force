/**
 * @generated SignedSource<<04b04eb9311d3b05c31d4f1b51e2ac7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorsGroup_fair$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorCard_fair">;
  readonly " $fragmentType": "FairExhibitorsGroup_fair";
};
export type FairExhibitorsGroup_fair$key = {
  readonly " $data"?: FairExhibitorsGroup_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairExhibitorsGroup_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorsGroup_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairExhibitorCard_fair"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "7ce4ce6af0d5dd9160a094ac0c67eb04";

export default node;
