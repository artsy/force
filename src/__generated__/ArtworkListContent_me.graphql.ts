/**
 * @generated SignedSource<<77ae2573181a5edede342d45a831d380>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkListContent_me$data = {
  readonly artworkList: {
    readonly artworks: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly default: boolean;
    readonly internalID: string;
    readonly name: string;
    readonly shareableWithPartners: boolean;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkListArtworksGrid_me">;
  readonly " $fragmentType": "ArtworkListContent_me";
};
export type ArtworkListContent_me$key = {
  readonly " $data"?: ArtworkListContent_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkListContent_me">;
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
      "name": "listID"
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
  "name": "ArtworkListContent_me",
  "selections": [
    {
      "alias": "artworkList",
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "listID"
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shareableWithPartners",
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
          "name": "listID",
          "variableName": "listID"
        },
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "kind": "FragmentSpread",
      "name": "ArtworkListArtworksGrid_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "f4ad69becbbc5c6e7b4acf4ff78362b0";

export default node;
