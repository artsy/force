/**
 * @generated SignedSource<<3d40485b0fc4ef560c9c20339599ba61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworks_me$data = {
  readonly collection: {
    readonly artworks: {
      readonly totalCount: number | null;
    } | null;
    readonly default: boolean;
    readonly internalID: string;
    readonly name: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_me">;
  readonly " $fragmentType": "SavesArtworks_me";
};
export type SavesArtworks_me$key = {
  readonly " $data"?: SavesArtworks_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworks_me">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v1 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "collectionID"
    },
    {
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "page"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sort"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworks_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "collectionID"
        }
      ],
      "concreteType": "Collection",
      "kind": "LinkedField",
      "name": "collection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "default",
          "storageKey": null
        },
        {
          "alias": "artworks",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 30
            },
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "concreteType": "ArtworkConnection",
          "kind": "LinkedField",
          "name": "artworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "collectionID",
          "variableName": "collectionID"
        },
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "SavesArtworksGrid_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "91979e1d19abaff3ea85e6cc5701d11f";

export default node;
