/**
 * @generated SignedSource<<f97857dde644e1dd002bb56858aab4b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InspiredByYourSavesApp_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"InspiredByYourSavesArtworksGrid_me">;
  readonly " $fragmentType": "InspiredByYourSavesApp_me";
};
export type InspiredByYourSavesApp_me$key = {
  readonly " $data"?: InspiredByYourSavesApp_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"InspiredByYourSavesApp_me">;
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
  "name": "InspiredByYourSavesApp_me",
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
      "name": "InspiredByYourSavesArtworksGrid_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "67a2afe09f614594d31cb22a03a3532f";

export default node;
