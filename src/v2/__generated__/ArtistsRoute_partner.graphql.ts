/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsRoute_partner = {
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtists_partner">;
    readonly " $refType": "ArtistsRoute_partner";
};
export type ArtistsRoute_partner$data = ArtistsRoute_partner;
export type ArtistsRoute_partner$key = {
    readonly " $data"?: ArtistsRoute_partner$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistsRoute_partner">;
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
(node as any).hash = 'eedf6b5906161ff447a026210485105c';
export default node;
