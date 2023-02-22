/**
 * @generated SignedSource<<fa20c7b367cd6e460881092b04ad8bbb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectListsForArtworkModal_me$data = {
  readonly collectionsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly isSavedArtwork: boolean;
        readonly " $fragmentSpreads": FragmentRefs<"SelectListItem_item">;
      } | null;
    } | null> | null;
  } | null;
  readonly defaultSaves: {
    readonly internalID: string;
    readonly isSavedArtwork: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"SelectListItem_item">;
  } | null;
  readonly " $fragmentType": "SelectListsForArtworkModal_me";
};
export type SelectListsForArtworkModal_me$key = {
  readonly " $data"?: SelectListsForArtworkModal_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectListsForArtworkModal_me">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "artworkID",
        "variableName": "artworkID"
      }
    ],
    "kind": "ScalarField",
    "name": "isSavedArtwork",
    "storageKey": null
  },
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "SelectListItem_item"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "artworkID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectListsForArtworkModal_me",
  "selections": [
    {
      "alias": "defaultSaves",
      "args": [
        {
          "kind": "Literal",
          "name": "id",
          "value": "saved-artwork"
        }
      ],
      "concreteType": "Collection",
      "kind": "LinkedField",
      "name": "collection",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "collection(id:\"saved-artwork\")"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "default",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        },
        {
          "kind": "Literal",
          "name": "saves",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "CREATED_AT_DESC"
        }
      ],
      "concreteType": "CollectionsConnection",
      "kind": "LinkedField",
      "name": "collectionsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CollectionsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Collection",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "collectionsConnection(default:false,first:30,saves:true,sort:\"CREATED_AT_DESC\")"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "0a417c5fded1f7365a511ce16ed52af5";

export default node;
