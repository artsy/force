/**
 * @generated SignedSource<<671c4991313172e2143133ae1ce0f1f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistBackLink_artist$data = {
  readonly href: string | null;
  readonly name: string | null;
  readonly " $fragmentType": "ArtistBackLink_artist";
};
export type ArtistBackLink_artist$key = {
  readonly " $data"?: ArtistBackLink_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistBackLink_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistBackLink_artist",
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

(node as any).hash = "56e2f9e7fd3479fecafe0222750855ac";

export default node;
