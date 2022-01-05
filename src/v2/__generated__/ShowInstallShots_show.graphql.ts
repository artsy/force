/* tslint:disable */
/* eslint-disable */

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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v2 = [
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
  (v0/*: any*/),
  (v1/*: any*/)
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
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": "resized(width:200)"
        },
        {
          "alias": "desktop",
          "args": [
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
          "selections": (v2/*: any*/),
          "storageKey": "resized(width:325)"
        },
        {
          "alias": "zoom",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 900
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "larger",
                "large"
              ]
            },
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
          "selections": (v2/*: any*/),
          "storageKey": "resized(height:900,version:[\"larger\",\"large\"],width:900)"
        }
      ],
      "storageKey": "images(default:false,size:100)"
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = '9b1323b9572cd5274d25e926a137c39b';
export default node;
