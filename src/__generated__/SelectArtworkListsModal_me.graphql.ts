/**
 * @generated SignedSource<<a41a40e78ba8d2dba236f22d1200f23d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectArtworkListsModal_me$data = {
  readonly allSavesArtworkList: {
    readonly internalID: string;
    readonly isSavedArtwork: boolean;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"SelectArtworkListItem_item">;
  } | null;
  readonly customArtworkLists: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly isSavedArtwork: boolean;
        readonly name: string;
        readonly " $fragmentSpreads": FragmentRefs<"SelectArtworkListItem_item">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "SelectArtworkListsModal_me";
};
export type SelectArtworkListsModal_me$key = {
  readonly " $data"?: SelectArtworkListsModal_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectArtworkListsModal_me">;
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
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "SelectArtworkListItem_item"
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
  "name": "SelectArtworkListsModal_me",
  "selections": [
    {
      "alias": "allSavesArtworkList",
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
      "alias": "customArtworkLists",
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

(node as any).hash = "a09345848a0cf7de26da55bd2367ebfb";

export default node;
