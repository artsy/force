/**
 * @generated SignedSource<<9a2f487f0ab6ade8f2316b7883d92dcc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkLightbox_artwork$data = {
  readonly formattedMetadata: string | null;
  readonly images: ReadonlyArray<{
    readonly fallback: {
      readonly height: number;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number;
    } | null;
    readonly internalID: string | null;
    readonly isDefault: boolean | null;
    readonly placeholder: string | null;
    readonly resized: {
      readonly height: number | null;
      readonly src: string;
      readonly srcSet: string;
      readonly width: number | null;
    } | null;
    readonly versions: ReadonlyArray<string | null> | null;
  } | null> | null;
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
    "name": "version",
    "value": [
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
          "storageKey": "cropped(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
        },
        {
          "alias": null,
          "args": (v0/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
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

(node as any).hash = "44ea6777bdc5927cb3d0e8de087fca82";

export default node;
