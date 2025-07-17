/**
 * @generated SignedSource<<a21e0238de5cb4d26ba6b2cca5a08e7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkRecommendationsApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkRecommendationsArtworksGrid_me">;
  readonly " $fragmentType": "ArtworkRecommendationsApp_me";
};
export type ArtworkRecommendationsApp_me$key = {
  readonly " $data"?: ArtworkRecommendationsApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkRecommendationsApp_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkRecommendationsApp_me",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkRecommendationsArtworksGrid_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "0d05f641d78de85ad6e65f863926f636";

export default node;
