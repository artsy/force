/**
 * @generated SignedSource<<cdf4e57f365f2aa154319ceb60272d14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistCombinedRoute_artist$data = {
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
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "75e758c777cd6c21a2dfdcf330b2f98c";

export default node;
