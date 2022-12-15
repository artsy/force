/**
 * @generated SignedSource<<90791b712ec54cb62a61211c69ad8128>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizLikedArtworks_me$data = {
  readonly quiz: {
    readonly quizArtworkConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
          readonly isSaved: boolean | null;
          readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
        } | null;
      } | null> | null;
    } | null;
  };
  readonly " $fragmentType": "ArtQuizLikedArtworks_me";
};
export type ArtQuizLikedArtworks_me$key = {
  readonly " $data"?: ArtQuizLikedArtworks_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizLikedArtworks_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizLikedArtworks_me",
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
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "GridItem_artwork"
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
          "storageKey": "quizArtworkConnection(first:20)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "bf4cf7ee03d38f2a250c0a606a42928e";

export default node;
