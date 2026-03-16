/**
 * @generated SignedSource<<99a7bb1988a5f7d19c4ce320e1817e0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistNotableWorks_artist$data = {
  readonly internalID: string;
  readonly " $fragmentType": "ArtistNotableWorks_artist";
};
export type ArtistNotableWorks_artist$key = {
  readonly " $data"?: ArtistNotableWorks_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistNotableWorks_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistNotableWorks_artist",
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

(node as any).hash = "70fcde670aaa3a63f15ecc4f410c6544";

export default node;
