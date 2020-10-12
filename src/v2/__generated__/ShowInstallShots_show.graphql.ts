/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowInstallShots_show = {
    readonly name: string | null;
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly caption: string | null;
        readonly mobile1x: {
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly _1x: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly _2x: {
            readonly src: string | null;
        } | null;
        readonly zoom1x: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly zoom2x: {
            readonly src: string | null;
        } | null;
    } | null> | null;
    readonly " $refType": "ShowInstallShots_show";
};
export type ShowInstallShots_show$data = ShowInstallShots_show;
export type ShowInstallShots_show$key = {
    readonly " $data"?: ShowInstallShots_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowInstallShots_show">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 400
  },
  (v0/*: any*/)
],
v4 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/)
],
v6 = [
  (v4/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowInstallShots_show",
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
      "name": "images",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "caption",
          "storageKey": null
        },
        {
          "alias": "mobile1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 300
            },
            (v0/*: any*/)
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/)
          ],
          "storageKey": "resized(height:300,version:[\"larger\",\"large\"])"
        },
        {
          "alias": "_1x",
          "args": (v3/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": "resized(height:400,version:[\"larger\",\"large\"])"
        },
        {
          "alias": "_2x",
          "args": (v3/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v6/*: any*/),
          "storageKey": "resized(height:400,version:[\"larger\",\"large\"])"
        },
        {
          "alias": "zoom1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 900
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 900
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": "resized(height:900,version:[\"larger\",\"large\"],width:900)"
        },
        {
          "alias": "zoom2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1800
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1800
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v6/*: any*/),
          "storageKey": "resized(height:1800,version:[\"larger\",\"large\"],width:1800)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = '9cb209920fb37eb5a8fe1e71d3ebdb4e';
export default node;
