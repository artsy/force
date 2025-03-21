/**
 * @generated SignedSource<<d08d76d37bae51a67763970b0e1e4bd8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
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
