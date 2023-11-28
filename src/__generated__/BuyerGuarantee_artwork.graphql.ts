/**
 * @generated SignedSource<<8d0dd7b8141a2ff08f6cc88a4df39fbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BuyerGuarantee_artwork$data = {
  readonly is_acquireable: boolean | null | undefined;
  readonly is_offerable: boolean | null | undefined;
  readonly " $fragmentType": "BuyerGuarantee_artwork";
};
export type BuyerGuarantee_artwork$key = {
  readonly " $data"?: BuyerGuarantee_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"BuyerGuarantee_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyerGuarantee_artwork",
  "selections": [
    {
      "alias": "is_acquireable",
      "args": null,
      "kind": "ScalarField",
      "name": "isAcquireable",
      "storageKey": null
    },
    {
      "alias": "is_offerable",
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferable",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "06087f71d5e148df2d9230940ba042ec";

export default node;
