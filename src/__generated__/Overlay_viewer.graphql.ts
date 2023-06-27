/**
 * @generated SignedSource<<7d6115a7aa3c1d9e5e6278d98917a1e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Overlay_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NewSearchInputPills_viewer" | "SearchResultsList_viewer">;
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
      "name": "NewSearchInputPills_viewer"
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
            (v0/*: any*/)
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

(node as any).hash = "01fb0f367a61b58345fc01abc4e62069";

export default node;
