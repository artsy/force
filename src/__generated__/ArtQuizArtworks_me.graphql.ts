/**
 * @generated SignedSource<<d3f0f452b8b730612d180a7e52d17ba1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizArtworks_me$data = {
  readonly id: string;
  readonly quiz: {
    readonly quizArtworkConnection: {
      readonly edges: ReadonlyArray<{
        readonly interactedAt: string | null | undefined;
        readonly node: {
          readonly internalID: string;
          readonly isDisliked: boolean;
          readonly isSaved: boolean | null | undefined;
          readonly slug: string;
          readonly " $fragmentSpreads": FragmentRefs<"ArtQuizArtworksCard_artwork">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  };
  readonly " $fragmentType": "ArtQuizArtworks_me";
};
export type ArtQuizArtworks_me$key = {
  readonly " $data"?: ArtQuizArtworks_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizArtworks_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizArtworks_me",
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
              "value": 16
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
                  "kind": "ScalarField",
                  "name": "interactedAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ArtQuizArtworksCard_artwork"
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
                      "name": "slug",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isDisliked",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isSaved",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "quizArtworkConnection(first:16)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "ab176323e68d5d2dd3e855e7a91304c6";

export default node;
