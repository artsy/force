/**
 * @generated SignedSource<<efc1e8b3babce00793caeb9eab557290>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarShippingInformation_artwork$data = {
  readonly shippingInfo: string | null;
  readonly shippingOrigin: string | null;
  readonly " $fragmentType": "ArtworkSidebarShippingInformation_artwork";
};
export type ArtworkSidebarShippingInformation_artwork$key = {
  readonly " $data"?: ArtworkSidebarShippingInformation_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarShippingInformation_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarShippingInformation_artwork",
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

(node as any).hash = "1833e93ecdeba70f73234c88648b4222";

export default node;
