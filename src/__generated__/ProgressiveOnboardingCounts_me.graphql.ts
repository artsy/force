/**
 * @generated SignedSource<<0a9836778d30e304dba6bdc556b9741a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingCounts_me$data = {
  readonly counts: {
    readonly followedArtists: number;
    readonly savedArtworks: number;
    readonly savedSearches: number;
  } | null;
  readonly " $fragmentType": "ProgressiveOnboardingCounts_me";
};
export type ProgressiveOnboardingCounts_me$key = {
  readonly " $data"?: ProgressiveOnboardingCounts_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingCounts_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProgressiveOnboardingCounts_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MeCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "followedArtists",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "savedArtworks",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "savedSearches",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "2ffaad10878891bc6b5498e1437409b2";

export default node;
