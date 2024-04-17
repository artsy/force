/**
 * @generated SignedSource<<3f6c3bd32437af0150b8545e58cce7ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarShippingInformation_artwork$data = {
  readonly isUnlisted: boolean;
  readonly shippingInfo: string | null | undefined;
  readonly shippingOrigin: string | null | undefined;
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
      "name": "isUnlisted",
      "storageKey": null
    },
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

(node as any).hash = "f92b47aab191307879a17947bb6845c8";

export default node;
