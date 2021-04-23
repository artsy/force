/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsRail_partner = {
    readonly slug: string;
    readonly profileArtistsLayout: string | null;
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtists_partner">;
    readonly " $refType": "ArtistsRail_partner";
};
export type ArtistsRail_partner$data = ArtistsRail_partner;
export type ArtistsRail_partner$key = {
    readonly " $data"?: ArtistsRail_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistsRail_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistsRail_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileArtistsLayout",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerArtists_partner"
    }
  ],
  "type": "Partner"
};
(node as any).hash = '967990219fb70fbe110f96e2c2170e8c';
export default node;
