/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyBidsBidHeader_sale = {
    readonly coverImage: {
        readonly resized: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly formattedStartDateTime: string | null;
    readonly name: string | null;
    readonly partner: {
        readonly name: string | null;
    } | null;
    readonly slug: string;
    readonly " $refType": "MyBidsBidHeader_sale";
};
export type MyBidsBidHeader_sale$data = MyBidsBidHeader_sale;
export type MyBidsBidHeader_sale$key = {
    readonly " $data"?: MyBidsBidHeader_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"MyBidsBidHeader_sale">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyBidsBidHeader_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 300
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
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "resized(height:100,width:300)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedStartDateTime",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Sale"
};
})();
(node as any).hash = '83f241014bcbaf8de7ee1c8a25f4e9cd';
export default node;
