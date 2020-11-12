/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OfferDetailApp_offer = {
    readonly saleName: string | null;
    readonly " $refType": "OfferDetailApp_offer";
};
export type OfferDetailApp_offer$data = OfferDetailApp_offer;
export type OfferDetailApp_offer$key = {
    readonly " $data"?: OfferDetailApp_offer$data;
    readonly " $fragmentRefs": FragmentRefs<"OfferDetailApp_offer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferDetailApp_offer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleName",
      "storageKey": null
    }
  ],
  "type": "ConsignmentOffer"
};
(node as any).hash = 'd6e0667e943bf860cb9de40db810239b';
export default node;
