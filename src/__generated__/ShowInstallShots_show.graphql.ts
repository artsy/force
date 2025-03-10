/**
 * @generated SignedSource<<c432abe92e9200f330a3723267b505e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowInstallShots_show$data = {
  readonly images: ReadonlyArray<{
    readonly caption: string | null | undefined;
    readonly height: number | null | undefined;
    readonly internalID: string | null | undefined;
    readonly src: string | null | undefined;
    readonly versions: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly width: number | null | undefined;
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
};
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
          "alias": "src",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "larger",
                "large"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"larger\",\"large\"])"
        },
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "versions",
          "storageKey": null
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
              "name": "quality",
              "value": 85
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "main",
                "normalized",
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
          "selections": [
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
          ],
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

(node as any).hash = "d71055e7fc50e9797da1e9579ea9eeaf";

export default node;
