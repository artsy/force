/**
 * @generated SignedSource<<8112f4131d135125a154f91443d4a870>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddArtworksModalContent_me$data = {
  readonly collection: {
    readonly artworksConnection: {
      readonly totalCount: number | null;
      readonly " $fragmentSpreads": FragmentRefs<"ArtworksList_artworks">;
    } | null;
  } | null;
  readonly " $fragmentType": "AddArtworksModalContent_me";
};
export type AddArtworksModalContent_me$key = {
  readonly " $data"?: AddArtworksModalContent_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddArtworksModalContent_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": "POSITION_DESC",
      "kind": "LocalArgument",
      "name": "sort"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddArtworksModalContent_me",
  "selections": [
    {
      "alias": null,
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
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 30
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
              "name": "ArtworksList_artworks"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "collection(id:\"saved-artwork\")"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "b6e1dd03a4d872a2dab27966ce8e3351";

export default node;
