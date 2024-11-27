/**
 * @generated SignedSource<<7162cf8e0b1a064302ea9ba9baf40af0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtists_partner$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistList_partner">;
  readonly " $fragmentType": "PartnerArtists_partner";
};
export type PartnerArtists_partner$key = {
  readonly " $data"?: PartnerArtists_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtists_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtists_partner",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerArtistList_partner"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "f69c619946d671bb6315b7ba559a7ea9";

export default node;
