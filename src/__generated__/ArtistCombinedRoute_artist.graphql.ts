/**
 * @generated SignedSource<<53371b501b1b0365c4e9c7882d7b7247>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCombinedRoute_artist$data = {
  readonly id: string;
  readonly " $fragmentType": "ArtistCombinedRoute_artist";
};
export type ArtistCombinedRoute_artist$key = {
  readonly " $data"?: ArtistCombinedRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistCombinedRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistCombinedRoute_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "d3e45d4ee6264a97b22fdb8c0eeed186";

export default node;
