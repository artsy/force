/**
 * @generated SignedSource<<1a7b9b13a44c817d9eb3026a277a0972>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Review_me$data = {
  readonly isIdentityVerified: boolean | null;
  readonly " $fragmentType": "Review_me";
};
export type Review_me$key = {
  readonly " $data"?: Review_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Review_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Review_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isIdentityVerified",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "a8998327caed176db8d1a34849d0b53f";

export default node;
