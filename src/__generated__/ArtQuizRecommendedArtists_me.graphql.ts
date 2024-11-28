/**
 * @generated SignedSource<<ec36694513111bcec52197f4430b9292>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
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
              "args": [
                {
                  "kind": "Literal",
                  "name": "shallow",
                  "value": true
                }
              ],
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
              "storageKey": "artist(shallow:true)"
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

(node as any).hash = "180b0dd86ad59125b77ed6fef4588527";

export default node;
