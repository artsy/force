/**
 * @generated SignedSource<<8a2ee3273e9bc89528269a92898e66ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProgressiveOnboardingFollowArtist_me$data = {
  readonly counts: {
    readonly followedArtists: number;
  } | null;
  readonly " $fragmentType": "ProgressiveOnboardingFollowArtist_me";
};
export type ProgressiveOnboardingFollowArtist_me$key = {
  readonly " $data"?: ProgressiveOnboardingFollowArtist_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProgressiveOnboardingFollowArtist_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProgressiveOnboardingFollowArtist_me",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "47c7b9731c35e7122fad5e3b1d46f7b3";

export default node;
