/**
 * @generated SignedSource<<09a181fa25bb91394bcc04411105a221>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtQuizResultsRecommendedArtworks_me$data = {
  readonly quiz: {
    readonly recommendedArtworks: ReadonlyArray<{
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
    }>;
  };
  readonly " $fragmentType": "ArtQuizResultsRecommendedArtworks_me";
};
export type ArtQuizResultsRecommendedArtworks_me$key = {
  readonly " $data"?: ArtQuizResultsRecommendedArtworks_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtQuizResultsRecommendedArtworks_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtQuizResultsRecommendedArtworks_me",
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
          "name": "recommendedArtworks",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "GridItem_artwork"
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

(node as any).hash = "836b58194b33ed410b2c98db3a8d5c66";

export default node;
