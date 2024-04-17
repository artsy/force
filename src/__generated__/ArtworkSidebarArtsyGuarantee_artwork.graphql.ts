/**
 * @generated SignedSource<<3f771889f0464befe79b595e0a74902c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarArtsyGuarantee_artwork$data = {
  readonly isUnlisted: boolean;
  readonly " $fragmentType": "ArtworkSidebarArtsyGuarantee_artwork";
};
export type ArtworkSidebarArtsyGuarantee_artwork$key = {
  readonly " $data"?: ArtworkSidebarArtsyGuarantee_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarArtsyGuarantee_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarArtsyGuarantee_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUnlisted",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "adc8eab6b4ded9fca8aa9305e0965b62";

export default node;
