/**
 * @generated SignedSource<<4703dbb22f8373ab285f3cf1a2dd181c>>
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
    readonly quizArtworkConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artist: {
            readonly internalID: string;
            readonly " $fragmentSpreads": FragmentRefs<"ArtQuizRecommendedArtist_artist">;
          } | null;
          readonly isSaved: boolean | null;
        } | null;
      } | null> | null;
    } | null;
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
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 20
            }
          ],
          "concreteType": "QuizArtworkConnection",
          "kind": "LinkedField",
          "name": "quizArtworkConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "QuizArtworkEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
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
          "storageKey": "quizArtworkConnection(first:20)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "39130e583e869b2e375125efc8d3e1d2";

export default node;
