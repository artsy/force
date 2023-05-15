/**
 * @generated SignedSource<<d78bbecaa013de07d3837fc6508f2110>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MobileSearchBar_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NewSearchInputPills_viewer" | "SearchResultsList_viewer">;
  readonly " $fragmentType": "MobileSearchBar_viewer";
};
export type MobileSearchBar_viewer$key = {
  readonly " $data"?: MobileSearchBar_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"MobileSearchBar_viewer">;
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
  "name": "MobileSearchBar_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "entities",
          "variableName": "entities"
        },
        {
          "kind": "Variable",
          "name": "hasTerm",
          "variableName": "hasTerm"
        },
        (v0/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "SearchResultsList_viewer"
    },
    {
      "args": [
        (v0/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "NewSearchInputPills_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "1538ff3fdd1fd2abe093dedf03a20251";

export default node;
