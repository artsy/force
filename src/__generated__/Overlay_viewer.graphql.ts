/**
 * @generated SignedSource<<25c266e37cdc5218ff7f72e8b49df51e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Overlay_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SearchInputPills_viewer" | "SearchResultsList_viewer">;
  readonly " $fragmentType": "Overlay_viewer";
};
export type Overlay_viewer$key = {
  readonly " $data"?: Overlay_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Overlay_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "term",
  "variableName": "term"
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "entities"
    },
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "hasTerm"
    },
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "term"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "variant"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Overlay_viewer",
  "selections": [
    {
      "args": [
        (v0/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "SearchInputPills_viewer"
    },
    {
      "condition": "hasTerm",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "args": [
            {
              "kind": "Variable",
              "name": "entities",
              "variableName": "entities"
            },
            (v0/*: any*/),
            {
              "kind": "Variable",
              "name": "variant",
              "variableName": "variant"
            }
          ],
          "kind": "FragmentSpread",
          "name": "SearchResultsList_viewer"
        }
      ]
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "d36354589ce30dac19dc3b190ca0c9b1";

export default node;
