/**
 * @generated SignedSource<<2a2d5fc60ea1e7c1df2dfe0991f25150>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowInstallShots_show$data = {
  readonly images: ReadonlyArray<{
    readonly caption: string | null | undefined;
    readonly desktop: {
      readonly height: number | null | undefined;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null | undefined;
    } | null | undefined;
    readonly internalID: string | null | undefined;
    readonly mobile: {
      readonly height: number | null | undefined;
      readonly width: number | null | undefined;
    } | null | undefined;
    readonly zoom: {
      readonly height: number | null | undefined;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ShowInstallShots_show";
};
export type ShowInstallShots_show$key = {
  readonly " $data"?: ShowInstallShots_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowInstallShots_show">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "quality",
  "value": 85
},
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v4 = [
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
  (v2/*: any*/),
  (v3/*: any*/)
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
            (v1/*: any*/),
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
            (v2/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": "resized(quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:200)"
        },
        {
          "alias": "desktop",
          "args": [
            (v0/*: any*/),
            (v1/*: any*/),
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
          "selections": (v4/*: any*/),
          "storageKey": "resized(quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:325)"
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
            (v1/*: any*/),
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
          "selections": (v4/*: any*/),
          "storageKey": "resized(height:900,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:900)"
        }
      ],
      "storageKey": "images(default:false,size:100)"
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "3439e5399514191f97f1b0403e53f6cf";

export default node;
