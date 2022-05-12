/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OfferDetailApp_offer = {
    readonly " $fragmentRefs": FragmentRefs<"ResponseForm_offer" | "Summary_offer">;
    readonly " $refType": "OfferDetailApp_offer";
};
export type OfferDetailApp_offer$data = OfferDetailApp_offer;
export type OfferDetailApp_offer$key = {
    readonly " $data"?: OfferDetailApp_offer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"OfferDetailApp_offer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferDetailApp_offer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResponseForm_offer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Summary_offer"
    }
  ],
  "type": "ConsignmentOffer",
  "abstractKey": null
};
(node as any).hash = '442617a1fd96750195887af82696e427';
export default node;
