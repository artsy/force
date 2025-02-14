/**
 * @generated SignedSource<<dfc273711904382a62473fe6208eb2a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkHeader_artwork$data = {
  readonly internalID: string;
  readonly slug: string;
  readonly " $fragmentType": "MyCollectionArtworkHeader_artwork";
};
export type MyCollectionArtworkHeader_artwork$key = {
  readonly " $data"?: MyCollectionArtworkHeader_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkHeader_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkHeader_artwork",
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "30ce4fbe3910040e64e7277641f54736";

export default node;
