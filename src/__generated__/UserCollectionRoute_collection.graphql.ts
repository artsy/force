/**
 * @generated SignedSource<<51d3d23fdf41faec8644f9892d657b07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserCollectionRoute_collection$data = {
  readonly artworksConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkGrid_artworks">;
  } | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "UserCollectionRoute_collection";
};
export type UserCollectionRoute_collection$key = {
  readonly " $data"?: UserCollectionRoute_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserCollectionRoute_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserCollectionRoute_collection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks"
        }
      ],
      "storageKey": "artworksConnection(first:50)"
    }
  ],
  "type": "Collection",
  "abstractKey": null
};

(node as any).hash = "7507740020decbdb9c7c6f355f077aa2";

export default node;
