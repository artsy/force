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
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
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
              "name": "height",
              "value": 300
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
          "storageKey": "resized(height:300)"
        },
        {
          "alias": "desktop",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 400
            },
            (v2/*: any*/)
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": "resized(height:400,version:[\"larger\",\"large\"])"
        },
        {
          "alias": "zoom",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 900
            },
            (v2/*: any*/),
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
          "storageKey": "resized(height:900,version:[\"larger\",\"large\"],width:900)"
        }
      ],
      "storageKey": "images(default:false)"
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = 'b1d347685462f87af8dac940d946276a';
export default node;
