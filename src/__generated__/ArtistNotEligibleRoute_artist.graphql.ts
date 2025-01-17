/**
 * @generated SignedSource<<01ab0f3c0b537dd5bc944d7533b8218c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistNotEligibleRoute_artist$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
  readonly " $fragmentType": "ArtistNotEligibleRoute_artist";
};
export type ArtistNotEligibleRoute_artist$key = {
  readonly " $data"?: ArtistNotEligibleRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistNotEligibleRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistNotEligibleRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EntityHeaderArtist_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "d8826bd4e49fd12147319208030e3048";

export default node;
