/**
 * @generated SignedSource<<369e89cec463e869701ef53df6c90a35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdditionalArtworkDetails_order$data = {
  readonly artworkDetails: string | null;
  readonly " $fragmentType": "AdditionalArtworkDetails_order";
};
export type AdditionalArtworkDetails_order$key = {
  readonly " $data"?: AdditionalArtworkDetails_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdditionalArtworkDetails_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdditionalArtworkDetails_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artworkDetails",
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "43c9a3a35c3f87df09a6cc71b9e4b2ec";

export default node;
