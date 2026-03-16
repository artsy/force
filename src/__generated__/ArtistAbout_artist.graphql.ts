/**
 * @generated SignedSource<<25ac0406d11e71f6414dc75daeaa824f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAbout_artist$data = {
  readonly internalID: string;
  readonly " $fragmentType": "ArtistAbout_artist";
};
export type ArtistAbout_artist$key = {
  readonly " $data"?: ArtistAbout_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAbout_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAbout_artist",
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

(node as any).hash = "53e9f314fac0ad6afa4b12e080261b46";

export default node;
