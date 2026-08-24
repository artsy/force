/**
 * @generated SignedSource<<dd2775bbad5a7bb04caf2cfb894d4217>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCombinedRoute_artist$data = {
  readonly instagramHandle: string | null | undefined;
  readonly internalID: string;
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
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "instagramHandle",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "ad63fb797f99f10f6e54875170a0fc80";

export default node;
