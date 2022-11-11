/**
 * @generated SignedSource<<3fe83cc81e954a7ea0f86884690e3e2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairTabs_fair$data = {
  readonly counts: {
    readonly artworks: any | null;
  } | null;
  readonly href: string | null;
  readonly " $fragmentType": "FairTabs_fair";
};
export type FairTabs_fair$key = {
  readonly " $data"?: FairTabs_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairTabs_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairTabs_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FairCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworks",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "fc32b98387d06c1e2a37716c9dd4090d";

export default node;
