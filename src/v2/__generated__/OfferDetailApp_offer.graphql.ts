/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OfferDetailApp_offer = {
    readonly saleName: string | null;
    readonly submission: {
        readonly title: string | null;
    };
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ConsignmentSubmission",
      "kind": "LinkedField",
      "name": "submission",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConsignmentOffer"
};
(node as any).hash = '85ddd78e68eb27c4c5e39a583d155c32';
export default node;
