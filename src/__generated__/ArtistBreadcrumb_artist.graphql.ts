/**
 * @generated SignedSource<<632d8c7ae374b50b60794bf7abf8013c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistBreadcrumb_artist$data = {
  readonly href: string | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ArtistBreadcrumb_artist";
};
export type ArtistBreadcrumb_artist$key = {
  readonly " $data"?: ArtistBreadcrumb_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistBreadcrumb_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistBreadcrumb_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "58f2e29d0c1e16f2f5fe260ef0180dd6";

export default node;
