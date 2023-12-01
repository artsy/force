/**
 * @generated SignedSource<<ea493d60fb3972ad5fc2797989ccd336>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksForSaleEmpty_artist$data = {
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ArtistWorksForSaleEmpty_artist";
};
export type ArtistWorksForSaleEmpty_artist$key = {
  readonly " $data"?: ArtistWorksForSaleEmpty_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistWorksForSaleEmpty_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistWorksForSaleEmpty_artist",
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "6c40256e3cf1f81c58ef7c2a4e7b6996";

export default node;
