/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerContactCard_location = {
    readonly " $fragmentRefs": FragmentRefs<"PartnerContactAddress_location" | "PartnerContactMap_location">;
    readonly " $refType": "PartnerContactCard_location";
};
export type PartnerContactCard_location$data = PartnerContactCard_location;
export type PartnerContactCard_location$key = {
    readonly " $data"?: PartnerContactCard_location$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnerContactCard_location">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerContactCard_location",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerContactAddress_location"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerContactMap_location"
    }
  ],
  "type": "Location"
};
(node as any).hash = '380b7adcdeaedee53a0dee4b2d67e526';
export default node;
