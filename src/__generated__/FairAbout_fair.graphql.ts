/**
 * @generated SignedSource<<37e7df4bb18375f38b4bbdab5714e0b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairAbout_fair$data = {
  readonly about: string | null | undefined;
  readonly slug: string;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "2c5bcf4b58e3663c056142e833c01624";

export default node;
