/**
 * @generated SignedSource<<93b9d1063e246dc3db80b810c3e1b90d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarAuthenticityCertificate_artwork$data = {
  readonly hasCertificateOfAuthenticity: boolean | null | undefined;
  readonly isBiddable: boolean | null | undefined;
  readonly " $fragmentType": "ArtworkSidebarAuthenticityCertificate_artwork";
};
export type ArtworkSidebarAuthenticityCertificate_artwork$key = {
  readonly " $data"?: ArtworkSidebarAuthenticityCertificate_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuthenticityCertificate_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarAuthenticityCertificate_artwork",
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

(node as any).hash = "75120fe82de8784a09f633dab6232063";

export default node;
