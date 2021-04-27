/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuyerGuaranteeIndex_securePaymentImage = {
    readonly imageTitle: string | null;
    readonly imageUrl: string | null;
    readonly artist: {
        readonly name: string | null;
    } | null;
    readonly image: {
        readonly resized: {
            readonly url: string;
        } | null;
    } | null;
    readonly " $refType": "BuyerGuaranteeIndex_securePaymentImage";
};
export type BuyerGuaranteeIndex_securePaymentImage$data = BuyerGuaranteeIndex_securePaymentImage;
export type BuyerGuaranteeIndex_securePaymentImage$key = {
    readonly " $data"?: BuyerGuaranteeIndex_securePaymentImage$data;
    readonly " $fragmentRefs": FragmentRefs<"BuyerGuaranteeIndex_securePaymentImage">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyerGuaranteeIndex_securePaymentImage",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "larger"
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": "resized(version:\"larger\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '6fb67e85ca5ca77261267f22a2a2d2b0';
export default node;
