/**
 * @generated SignedSource<<5ea08104c4049b79ccf87ab097b33305>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesEmptyState_me$data = {
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesEmptyState_me",
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

(node as any).hash = "26f219120a57f5a815d46a64bb28002a";

export default node;
