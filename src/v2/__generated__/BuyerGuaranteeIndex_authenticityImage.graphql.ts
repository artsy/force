/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuyerGuaranteeIndex_authenticityImage = {
    readonly imageTitle: string | null;
    readonly imageUrl: string | null;
    readonly artist: {
        readonly name: string | null;
    } | null;
    readonly " $refType": "BuyerGuaranteeIndex_authenticityImage";
};
export type BuyerGuaranteeIndex_authenticityImage$data = BuyerGuaranteeIndex_authenticityImage;
export type BuyerGuaranteeIndex_authenticityImage$key = {
    readonly " $data"?: BuyerGuaranteeIndex_authenticityImage$data;
    readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_authenticityImage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyerGuaranteeIndex_authenticityImage",
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
(node as any).hash = '8ad049e322c1db7a7f29552493389321';
export default node;
