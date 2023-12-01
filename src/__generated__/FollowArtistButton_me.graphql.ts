/**
 * @generated SignedSource<<61740cfe75b39592faa7674bb064d99a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowArtistButton_me$data = {
  readonly counts: {
    readonly followedArtists: number;
  } | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "FollowArtistButton_me";
};
export type FollowArtistButton_me$key = {
  readonly " $data"?: FollowArtistButton_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistButton_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowArtistButton_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "b8c3e1b49347f9d84689ffbb01e8b255";

export default node;
