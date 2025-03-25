/**
 * @generated SignedSource<<dba69c34324298792a1d178bdb6c1899>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkLightbox_artwork$data = {
  readonly formattedMetadata: string | null | undefined;
  readonly images: ReadonlyArray<{
    readonly blurhashDataURL: string | null | undefined;
    readonly fallback: {
      readonly height: number;
      readonly src: string;
      readonly width: number;
    } | null | undefined;
    readonly internalID: string | null | undefined;
    readonly isDefault: boolean | null | undefined;
    readonly placeholder: string | null | undefined;
    readonly resized: {
      readonly height: number | null | undefined;
      readonly src: string;
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
    "value": 1600
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
    "value": 1600
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "width",
              "value": 801
            }
          ],
          "kind": "ScalarField",
          "name": "blurhashDataURL",
          "storageKey": "blurhashDataURL(width:801)"
        },
        {
          "alias": "fallback",
          "args": (v0/*: any*/),
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:1600,quality:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1600)"
        },
        {
          "alias": null,
          "args": (v0/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "resized(height:1600,quality:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:1600)"
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

(node as any).hash = "7e3192f3e15bd2d6cd9a376e78cc936f";

export default node;
