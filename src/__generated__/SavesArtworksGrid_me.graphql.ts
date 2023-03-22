/**
 * @generated SignedSource<<1a0d364e77ac93228b8305b6a31614a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavesArtworksGrid_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SavesEmptyState_me">;
  readonly " $fragmentType": "SavesArtworksGrid_me";
};
export type SavesArtworksGrid_me$key = {
  readonly " $data"?: SavesArtworksGrid_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavesArtworksGrid_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavesArtworksGrid_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavesEmptyState_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "65e08ff63dc0a639839f17a0de34208b";

export default node;
