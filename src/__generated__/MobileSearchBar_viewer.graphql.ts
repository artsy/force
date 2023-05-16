/**
 * @generated SignedSource<<3f8329588a7e76cd10d72016264b7e27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MobileSearchBar_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NewSearchInputPills_viewer">;
  readonly " $fragmentType": "MobileSearchBar_viewer";
};
export type MobileSearchBar_viewer$key = {
  readonly " $data"?: MobileSearchBar_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"MobileSearchBar_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "term"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "MobileSearchBar_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "term",
          "variableName": "term"
        }
      ],
      "kind": "FragmentSpread",
      "name": "NewSearchInputPills_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "8b5d48bca9b95d4cf2c8137a89c471e6";

export default node;
