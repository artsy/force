/**
 * @generated SignedSource<<e884ebcb4a70f6c5f4db2f26310d97d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowArtistButton_artist$data = {
  readonly id: string;
  readonly internalID: string;
  readonly name: string | null;
  readonly slug: string;
  readonly is_followed: boolean | null;
  readonly counts: {
    readonly follows: Int | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistPopover_artist">;
  readonly " $fragmentType": "FollowArtistButton_artist";
};
export type FollowArtistButton_artist$key = {
  readonly " $data"?: FollowArtistButton_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistButton_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "showFollowSuggestions"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowArtistButton_artist",
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
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "is_followed",
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "follows",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "condition": "showFollowSuggestions",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FollowArtistPopover_artist"
        }
      ]
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "9dcfa4d60a04da2947deace66ecc24d0";

export default node;
