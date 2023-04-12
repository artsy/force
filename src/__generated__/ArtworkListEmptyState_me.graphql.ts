/**
 * @generated SignedSource<<e630b172aafdd58ade92a913a70759aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkListEmptyState_me$data = {
  readonly allSavesArtworkList: {
    readonly artworksCount: number;
  } | null;
  readonly artworkList: {
    readonly default: boolean;
  } | null;
  readonly " $fragmentType": "ArtworkListEmptyState_me";
};
export type ArtworkListEmptyState_me$key = {
  readonly " $data"?: ArtworkListEmptyState_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkListEmptyState_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "listID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkListEmptyState_me",
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
          "name": "default",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "onlyVisible",
              "value": true
            }
          ],
          "kind": "ScalarField",
          "name": "artworksCount",
          "storageKey": "artworksCount(onlyVisible:true)"
        }
      ],
      "storageKey": "collection(id:\"saved-artwork\")"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "17a7c49c2a826f870afc60cee0a39ea4";

export default node;
