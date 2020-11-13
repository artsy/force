/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResponseForm_offer = {
    readonly id: string;
    readonly " $refType": "ResponseForm_offer";
};
export type ResponseForm_offer$data = ResponseForm_offer;
export type ResponseForm_offer$key = {
    readonly " $data"?: ResponseForm_offer$data;
    readonly " $fragmentRefs": FragmentRefs<"ResponseForm_offer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResponseForm_offer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "ConsignmentOffer"
};
(node as any).hash = 'fb724895fbbee96b863701cb60123d7b';
export default node;
