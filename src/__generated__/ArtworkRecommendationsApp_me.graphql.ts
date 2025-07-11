/**
 * @generated SignedSource<<87e49b96460ad48e88e8660adf367af8>>
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

(node as any).hash = "1589783b7dc91006b4b488ed940a20f0";

export default node;
