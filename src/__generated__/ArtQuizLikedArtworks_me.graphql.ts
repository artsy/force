/**
 * @generated SignedSource<<6d2b18b18d5bb19488bb66e16145e291>>
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
    readonly savedArtworks: ReadonlyArray<{
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
    }>;
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
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "savedArtworks",
          "plural": true,
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

(node as any).hash = "91fecd08f9838398d4f2be43ed331135";

export default node;
