/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeaderIcon_fair = {
    readonly name: string | null;
    readonly profile: {
        readonly icon: {
            readonly _1x: {
                readonly src: string | null;
            } | null;
            readonly _2x: {
                readonly src: string | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "FairHeaderIcon_fair";
};
export type FairHeaderIcon_fair$data = FairHeaderIcon_fair;
export type FairHeaderIcon_fair$key = {
    readonly " $data"?: FairHeaderIcon_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairHeaderIcon_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
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
  "name": "FairHeaderIcon_fair",
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
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": "_1x",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 60
                },
                (v0/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 60
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": "cropped(height:60,version:\"square140\",width:60)"
            },
            {
              "alias": "_2x",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 120
                },
                (v0/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 120
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": "cropped(height:120,version:\"square140\",width:120)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '6b3f161b7a66370b8df88c9c32573f12';
export default node;
