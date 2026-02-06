/**
 * @generated SignedSource<<3ad011b4882e6b4df1860877b69cf498>>
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
  readonly isEvergreen: boolean;
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
      "name": "isEvergreen",
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "4d34ab22152e5785f9e3fd16e42464f4";

export default node;
