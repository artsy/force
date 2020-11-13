/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OfferDetailApp_offer = {
    readonly " $fragmentRefs": FragmentRefs<"Summary_offer">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "Summary_offer"
    }
  ],
  "type": "ConsignmentOffer"
};
(node as any).hash = '828b8242f1e6f860b683041152664fde';
export default node;
