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
    readonly image: {
        readonly resized: {
            readonly url: string;
        } | null;
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
(node as any).hash = '33f00a57d76a0223b78a5c50138aff16';
export default node;
