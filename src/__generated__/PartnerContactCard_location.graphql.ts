/**
 * @generated SignedSource<<1bec7113cf1d2a4d6bcb6eb93f295e8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerContactCard_location$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PartnerContactAddress_location" | "PartnerContactMap_location">;
  readonly " $fragmentType": "PartnerContactCard_location";
};
export type PartnerContactCard_location$key = {
  readonly " $data"?: PartnerContactCard_location$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerContactCard_location">;
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
  "type": "Location",
  "abstractKey": null
};

(node as any).hash = "380b7adcdeaedee53a0dee4b2d67e526";

export default node;
