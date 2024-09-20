/**
 * @generated SignedSource<<f5a0bd9f91f8ab31eaff59623b51370e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarCreateAlert_artwork$data = {
  readonly isEligibleToCreateAlert: boolean;
  readonly " $fragmentType": "ArtworkSidebarCreateAlert_artwork";
};
export type ArtworkSidebarCreateAlert_artwork$key = {
  readonly " $data"?: ArtworkSidebarCreateAlert_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarCreateAlert_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarCreateAlert_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isEligibleToCreateAlert",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "285afab1fd1739e8437c6e165884bb7f";

export default node;
