/**
 * @generated SignedSource<<0973b61ded8c0463627b43f2060f8a61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworks_collection$data = {
  readonly artworks: {
    readonly totalCount: number | null;
    readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_artworks">;
  } | null;
  readonly default: boolean;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_collection">;
  readonly " $fragmentType": "SavesArtworks_collection";
};
export type SavesArtworks_collection$key = {
  readonly " $data"?: SavesArtworks_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworks_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
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
  "name": "SavesArtworks_collection",
  "selections": [
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
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SavesArtworksGrid_artworks"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavesArtworksGrid_collection"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "ef853f001261c2ce1049bfa3600e3858";

export default node;
