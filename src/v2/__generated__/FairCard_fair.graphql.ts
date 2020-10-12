/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairCard_fair = {
    readonly name: string | null;
    readonly image: {
        readonly _1x: {
            readonly src: string | null;
        } | null;
        readonly _2x: {
            readonly src: string | null;
        } | null;
    } | null;
    readonly " $refType": "FairCard_fair";
};
export type FairCard_fair$data = FairCard_fair;
export type FairCard_fair$key = {
    readonly " $data"?: FairCard_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairCard_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v1 = [
  {
    "alias": "src",
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairCard_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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
          "alias": "_1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 512
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 768
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:512,version:\"wide\",width:768)"
        },
        {
          "alias": "_2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1024
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1536
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:1024,version:\"wide\",width:1536)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '6c6c9b44095ec228d128a0faa0ee1f2c';
export default node;
