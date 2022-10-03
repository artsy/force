/**
 * @generated SignedSource<<37d2fc047430f16b18a5acbd6b7acdab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2ShippingInformation_artwork$data = {
  readonly shippingInfo: string | null;
  readonly shippingOrigin: string | null;
  readonly " $fragmentType": "ArtworkSidebar2ShippingInformation_artwork";
};
export type ArtworkSidebar2ShippingInformation_artwork$key = {
  readonly " $data"?: ArtworkSidebar2ShippingInformation_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2ShippingInformation_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2ShippingInformation_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingOrigin",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shippingInfo",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "5e244e11892bf3c41156ae624c1e351c";

export default node;
