/**
 * @generated SignedSource<<c7e10d032097680f3b8030c7940ca166>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairHeader_fair$data = {
  readonly name: string | null;
  readonly exhibitionPeriod: string | null;
  readonly profile: {
    readonly icon: {
      readonly desktop: {
        readonly src: string;
        readonly srcSet: string;
        readonly size: number;
      } | null;
      readonly mobile: {
        readonly src: string;
        readonly srcSet: string;
        readonly size: number;
      } | null;
      readonly sticky: {
        readonly src: string;
        readonly srcSet: string;
        readonly size: number;
      } | null;
    } | null;
  } | null;
  readonly " $fragmentType": "FairHeader_fair";
};
export type FairHeader_fair$key = {
  readonly " $data"?: FairHeader_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairHeader_fair">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v1 = [
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
  {
    "alias": "size",
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeader_fair",
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
      "kind": "ScalarField",
      "name": "exhibitionPeriod",
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
              "alias": "desktop",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 80
                },
                (v0/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 80
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": "cropped(height:80,version:\"square140\",width:80)"
            },
            {
              "alias": "mobile",
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
              "alias": "sticky",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 50
                },
                (v0/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 50
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v1/*: any*/),
              "storageKey": "cropped(height:50,version:\"square140\",width:50)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};
})();

(node as any).hash = "099d89164e6ab5f5948b117e20784616";

export default node;
