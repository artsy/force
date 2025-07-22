/**
 * @generated SignedSource<<3d8b4f82b9f251df06c19dcf5a72054f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RecommendedArtistsApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RecommendedArtistsGrid_me">;
  readonly " $fragmentType": "RecommendedArtistsApp_me";
};
export type RecommendedArtistsApp_me$key = {
  readonly " $data"?: RecommendedArtistsApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"RecommendedArtistsApp_me">;
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
  "name": "RecommendedArtistsApp_me",
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
      "name": "RecommendedArtistsGrid_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "858d5d372be8772c3e1378ecef0014b8";

export default node;
