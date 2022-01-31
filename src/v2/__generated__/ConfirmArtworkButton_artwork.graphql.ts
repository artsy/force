/**
 * @generated SignedSource<<8756dba8c3accd0e45cdeebd767e7f42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConfirmArtworkButton_artwork$data = {
  readonly internalID: string;
  readonly " $fragmentType": "ConfirmArtworkButton_artwork";
};
export type ConfirmArtworkButton_artwork$key = {
  readonly " $data"?: ConfirmArtworkButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConfirmArtworkButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConfirmArtworkButton_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "2882134b827fadd6c09b9db8aaa05ffe";

export default node;
