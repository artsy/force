/**
 * @generated SignedSource<<6be47506b40edd6c68956602ffc26bf0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRepresentation_artist$data = {
  readonly internalID: string;
  readonly " $fragmentType": "ArtistRepresentation_artist";
};
export type ArtistRepresentation_artist$key = {
  readonly " $data"?: ArtistRepresentation_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistRepresentation_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRepresentation_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "a7b13711bd3fad6b2f64e4d9e494394c";

export default node;
