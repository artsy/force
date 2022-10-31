/**
 * @generated SignedSource<<05cb528be2c6291d2d2b038996c9533a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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
