/**
 * @generated SignedSource<<fa7b1b7b7a211f57f7e875d1984c628c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileArtistsListArtist_userInterestEdge$data = {
  readonly node: {
    readonly __typename: "Artist";
    readonly counts: {
      readonly artworks: any | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly name: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly private: boolean;
  readonly " $fragmentType": "CollectorProfileArtistsListArtist_userInterestEdge";
};
export type CollectorProfileArtistsListArtist_userInterestEdge$key = {
  readonly " $data"?: CollectorProfileArtistsListArtist_userInterestEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileArtistsListArtist_userInterestEdge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileArtistsListArtist_userInterestEdge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "private",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "EntityHeaderArtist_artist"
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
              "concreteType": "ArtistCounts",
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
          "type": "Artist",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UserInterestEdge",
  "abstractKey": null
};

(node as any).hash = "14a1c88b5eb6b99eb0777fce8fe27b6b";

export default node;
