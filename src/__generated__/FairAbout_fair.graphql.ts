/**
 * @generated SignedSource<<b39754064214318978d637634f02d542>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairAbout_fair$data = {
  readonly about: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"FairTimer_fair">;
  readonly " $fragmentType": "FairAbout_fair";
};
export type FairAbout_fair$key = {
  readonly " $data"?: FairAbout_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairAbout_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairAbout_fair",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairTimer_fair"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"HTML\")"
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "648a39c0f14cfdc5bd31a80ef0b4d532";

export default node;
