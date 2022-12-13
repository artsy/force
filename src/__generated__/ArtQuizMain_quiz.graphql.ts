/**
 * @generated SignedSource<<b9e02510e6daf35bba64ade116154195>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizMain_quiz$data = {
  readonly quizArtworks: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artwork: {
          readonly image: {
            readonly aspectRatio: number;
            readonly url: string | null;
          } | null;
          readonly slug: string;
          readonly title: string | null;
        };
        readonly interactedAt: string | null;
        readonly position: number;
      } | null;
    } | null> | null;
    readonly totalCount: number | null;
  } | null;
  readonly " $fragmentType": "ArtQuizMain_quiz";
};
export type ArtQuizMain_quiz$key = {
  readonly " $data"?: ArtQuizMain_quiz$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizMain_quiz">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizMain_quiz",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 16
        }
      ],
      "concreteType": "QuizArtworkConnection",
      "kind": "LinkedField",
      "name": "quizArtworks",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
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
              "concreteType": "QuizArtwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "interactedAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "position",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "artwork",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "slug",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "title",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Image",
                      "kind": "LinkedField",
                      "name": "image",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "version",
                              "value": "large"
                            }
                          ],
                          "kind": "ScalarField",
                          "name": "url",
                          "storageKey": "url(version:\"large\")"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "aspectRatio",
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
          "storageKey": null
        }
      ],
      "storageKey": "quizArtworks(first:16)"
    }
  ],
  "type": "Quiz",
  "abstractKey": null
};

(node as any).hash = "0cdc09b3f56646c6b9a3b8440beb2aa8";

export default node;
