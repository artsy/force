/**
 * @generated SignedSource<<713ce284cb8326f3e1103eb21948d2ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistEditorial_artist$data = {
  readonly internalID: string;
  readonly " $fragmentType": "ArtistEditorial_artist";
};
export type ArtistEditorial_artist$key = {
  readonly " $data"?: ArtistEditorial_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistEditorial_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistEditorial_artist",
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

(node as any).hash = "046584931cf13c0ac64cd94c3ccaa622";

export default node;
