/**
 * @generated SignedSource<<ac716406e62be481b571fc66b4e2c094>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairEditorial_fair$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FairEditorialRailArticles_fair">;
  readonly " $fragmentType": "FairEditorial_fair";
};
export type FairEditorial_fair$key = {
  readonly " $data"?: FairEditorial_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairEditorial_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairEditorial_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairEditorialRailArticles_fair"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "8d6ab09c42c4704e6198dfbc121de06d";

export default node;
