/**
 * @generated SignedSource<<6c9973235d1039735ee19af212dcbd28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2AuthenticityCertificate_artwork$data = {
  readonly hasCertificateOfAuthenticity: boolean | null;
  readonly isBiddable: boolean | null;
  readonly " $fragmentType": "ArtworkSidebar2AuthenticityCertificate_artwork";
};
export type ArtworkSidebar2AuthenticityCertificate_artwork$key = {
  readonly " $data"?: ArtworkSidebar2AuthenticityCertificate_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebar2AuthenticityCertificate_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2AuthenticityCertificate_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasCertificateOfAuthenticity",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isBiddable",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "cf11160222f0b69a99ba9ede7f7c6b51";

export default node;
