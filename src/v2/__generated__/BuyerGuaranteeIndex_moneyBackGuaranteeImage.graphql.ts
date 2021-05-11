/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuyerGuaranteeIndex_moneyBackGuaranteeImage = {
    readonly imageTitle: string | null;
    readonly imageUrl: string | null;
    readonly artist: {
        readonly name: string | null;
    } | null;
    readonly " $refType": "BuyerGuaranteeIndex_moneyBackGuaranteeImage";
};
export type BuyerGuaranteeIndex_moneyBackGuaranteeImage$data = BuyerGuaranteeIndex_moneyBackGuaranteeImage;
export type BuyerGuaranteeIndex_moneyBackGuaranteeImage$key = {
    readonly " $data"?: BuyerGuaranteeIndex_moneyBackGuaranteeImage$data;
    readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_moneyBackGuaranteeImage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyerGuaranteeIndex_moneyBackGuaranteeImage",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '4ff4a314057b21480d1b55f1f20952b3';
export default node;
