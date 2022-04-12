/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowInstallShots_show = {
    readonly name: string | null;
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly caption: string | null;
        readonly mobile: {
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly desktop: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly zoom: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null;
            readonly height: number | null;
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
    "normalized",
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
  },
  (v1/*: any*/),
  (v2/*: any*/)
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
      "args": [
        {
          "kind": "Literal",
          "name": "default",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 100
        }
      ],
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
          "alias": "mobile",
          "args": [
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 200
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/)
          ],
          "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:200)"
        },
        {
          "alias": "desktop",
          "args": [
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 325
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:325)"
        },
        {
          "alias": "zoom",
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
          "selections": (v3/*: any*/),
          "storageKey": "resized(height:900,version:[\"normalized\",\"larger\",\"large\"],width:900)"
        }
      ],
      "storageKey": "images(default:false,size:100)"
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();
(node as any).hash = '3b2517ce38562421567d146e6c64ea96';
export default node;
