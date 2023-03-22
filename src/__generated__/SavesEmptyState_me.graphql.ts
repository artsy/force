/**
 * @generated SignedSource<<d1f382b6ae33c1a83cab4b9e917bd6a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesEmptyState_me$data = {
  readonly collection: {
    readonly default: boolean;
  } | null;
  readonly defaultSaves: {
    readonly artworksCount: number;
  } | null;
  readonly " $fragmentType": "SavesEmptyState_me";
};
export type SavesEmptyState_me$key = {
  readonly " $data"?: SavesEmptyState_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesEmptyState_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "collectionID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesEmptyState_me",
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
          "name": "default",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artworksCount",
          "storageKey": null
        }
      ],
      "storageKey": "collection(id:\"saved-artwork\")"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "9931654c0b2af368d1a83b27d14adf35";

export default node;
