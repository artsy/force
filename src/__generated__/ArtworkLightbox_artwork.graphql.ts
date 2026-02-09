/**
 * @generated SignedSource<<9f222cda90a51c247e7915c08a0da4d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkLightbox_artwork$data = {
  readonly caption: string | null | undefined;
  readonly formattedMetadata: string | null | undefined;
  readonly images: ReadonlyArray<{
    readonly fallback: {
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number;
    } | null | undefined;
    readonly internalID: string | null | undefined;
    readonly isDefault: boolean | null | undefined;
    readonly placeholder: string | null | undefined;
    readonly resized: {
      readonly height: number | null | undefined;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null | undefined;
    } | null | undefined;
    readonly versions: ReadonlyArray<string | null | undefined> | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ArtworkLightbox_artwork";
};
export type ArtworkLightbox_artwork$key = {
  readonly " $data"?: ArtworkLightbox_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkLightbox_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 800
  },
  {
    "kind": "Literal",
    "name": "quality",
    "value": 80
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
    "value": 800
  }
],
v1 = [
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
  },
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
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeAllImages"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkLightbox_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "caption",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedMetadata",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "includeAll",
          "variableName": "includeAllImages"
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
          "name": "isDefault",
          "storageKey": null
        },
        {
          "alias": "placeholder",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "small",
                "medium"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"small\",\"medium\"])"
        },
        {
          "alias": "fallback",
          "args": (v0/*: any*/),
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:800,quality:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
        },
        {
          "alias": null,
          "args": (v0/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "resized(height:800,quality:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "versions",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "43c25047ae0fc2cf713fc25aab4808c4";

export default node;
