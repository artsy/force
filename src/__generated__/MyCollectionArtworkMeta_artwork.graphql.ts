/**
 * @generated SignedSource<<1c50af466387ae2f90f4c3833eaeffb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkMeta_artwork$data = {
  readonly artistNames: string | null | undefined;
  readonly internalID: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "MyCollectionArtworkMeta_artwork";
};
export type MyCollectionArtworkMeta_artwork$key = {
  readonly " $data"?: MyCollectionArtworkMeta_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkMeta_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkMeta_artwork",
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
      "name": "artistNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "5ac2529fdda3efc0108dd1f1b853d223";

export default node;
