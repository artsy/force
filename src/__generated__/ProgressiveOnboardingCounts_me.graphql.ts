/**
 * @generated SignedSource<<07d1a7d32a9fe0e7b58f9408f7d53074>>
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "ca9be3da6ba2b08cd8e2d31bbd57f171";

export default node;
