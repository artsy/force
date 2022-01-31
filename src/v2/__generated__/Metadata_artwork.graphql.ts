/**
 * @generated SignedSource<<4d3b8f8351e5364cfc6f7ae1fb67735a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Metadata_artwork$data = {
  readonly href: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"Details_artwork" | "Contact_artwork">;
  readonly " $fragmentType": "Metadata_artwork";
};
export type Metadata_artwork$key = {
  readonly " $data"?: Metadata_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Metadata_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Details_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Contact_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "5e64e5a09dbf4016cd89ec6a41b009e5";

export default node;
