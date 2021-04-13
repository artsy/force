/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artists_partner = {
    readonly " $fragmentRefs": FragmentRefs<"PartnerArtists_partner">;
    readonly " $refType": "Artists_partner";
};
export type Artists_partner$data = Artists_partner;
export type Artists_partner$key = {
    readonly " $data"?: Artists_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"Artists_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artists_partner",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerArtists_partner"
    }
  ],
  "type": "Partner"
};
(node as any).hash = '3db43de679886881e01578594462f8eb';
export default node;
