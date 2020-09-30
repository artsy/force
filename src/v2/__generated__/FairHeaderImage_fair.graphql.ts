/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeaderImage_fair = {
    readonly name: string | null;
    readonly image: {
        readonly _1x: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly _2x: {
            readonly src: string | null;
        } | null;
        readonly md_1x: {
            readonly src: string | null;
        } | null;
        readonly md_2x: {
            readonly src: string | null;
        } | null;
        readonly lg_1x: {
            readonly src: string | null;
        } | null;
        readonly lg_2x: {
            readonly src: string | null;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FairHeaderIcon_fair">;
    readonly " $refType": "FairHeaderImage_fair";
};
export type FairHeaderImage_fair$data = FairHeaderImage_fair;
export type FairHeaderImage_fair$key = {
    readonly " $data"?: FairHeaderImage_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairHeaderImage_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v1 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeaderImage_fair",
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
              "value": 500
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 375
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:500,version:\"wide\",width:375)"
        },
        {
          "alias": "_2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1000
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 750
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:1000,version:\"wide\",width:750)"
        },
        {
          "alias": "md_1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 800
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 600
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:800,version:\"wide\",width:600)"
        },
        {
          "alias": "md_2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1600
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1200
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:1600,version:\"wide\",width:1200)"
        },
        {
          "alias": "lg_1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1200
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 900
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:1200,version:\"wide\",width:900)"
        },
        {
          "alias": "lg_2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 2400
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1800
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": "cropped(height:2400,version:\"wide\",width:1800)"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FairHeaderIcon_fair"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = 'cb0f8e50ce0a4cc0ef813f8b6b9f48cd';
export default node;
