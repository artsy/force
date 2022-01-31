/**
 * @generated SignedSource<<627ccebc9f1850a0f0a92edeb3d32cc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistsRoute_partner$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtists_partner">;
  readonly " $fragmentType": "ArtistsRoute_partner";
};
export type ArtistsRoute_partner$key = {
  readonly " $data"?: ArtistsRoute_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistsRoute_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistsRoute_partner",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerArtists_partner"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "eedf6b5906161ff447a026210485105c";

export default node;
