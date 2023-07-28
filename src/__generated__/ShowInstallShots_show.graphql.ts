/**
 * @generated SignedSource<<10402dd2e26191af633827b2cf1e9c2f>>
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
    readonly caption: string | null;
    readonly desktop: {
      readonly height: number | null;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null;
    } | null;
    readonly internalID: string | null;
    readonly mobile: {
      readonly height: number | null;
      readonly width: number | null;
    } | null;
    readonly zoom: {
      readonly height: number | null;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null;
    } | null;
  } | null> | null;
  readonly name: string | null;
  readonly " $fragmentType": "ShowInstallShots_show";
};
export type ShowInstallShots_show$key = {
  readonly " $data"?: ShowInstallShots_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowInstallShots_show">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
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
          "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:200)"
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
          "storageKey": "resized(version:[\"main\",\"normalized\",\"larger\",\"large\"],width:325)"
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
          "storageKey": "resized(height:900,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:900)"
        }
      ],
      "storageKey": "images(default:false,size:100)"
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "fc65edc203f2de1cd4bc91a269d92366";

export default node;
