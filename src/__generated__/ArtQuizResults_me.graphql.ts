/**
 * @generated SignedSource<<11ca5f5c6c9357578d8e86cbcd226ea5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizResults_me$data = {
  readonly quiz: {
    readonly savedArtworks: ReadonlyArray<{
      readonly __typename: "Artwork";
    }>;
  };
  readonly " $fragmentType": "ArtQuizResults_me";
};
export type ArtQuizResults_me$key = {
  readonly " $data"?: ArtQuizResults_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizResults_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizResults_me",
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
              "name": "__typename",
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

(node as any).hash = "ffaae4c22a86a835da4c16d2af9d55fb";

export default node;
