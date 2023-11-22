/**
 * @generated SignedSource<<82cc3cd32b01a6fad39574d3b8b05826>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizRecommendedArtists_me$data = {
  readonly quiz: {
    readonly savedArtworks: ReadonlyArray<{
      readonly artist: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArtQuizRecommendedArtist_artist">;
      } | null | undefined;
      readonly isSaved: boolean | null | undefined;
    }>;
  };
  readonly " $fragmentType": "ArtQuizRecommendedArtists_me";
};
export type ArtQuizRecommendedArtists_me$key = {
  readonly " $data"?: ArtQuizRecommendedArtists_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizRecommendedArtists_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizRecommendedArtists_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Quiz",
      "kind": "LinkedField",
      "name": "quiz",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "savedArtworks",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isSaved",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "artist",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtQuizRecommendedArtist_artist"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "688cbb4f044e10dd8622784dd9ed1ccc";

export default node;
