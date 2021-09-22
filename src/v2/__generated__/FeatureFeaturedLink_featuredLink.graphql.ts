/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureFeaturedLink_featuredLink = {
    readonly href: string | null;
    readonly title: string | null;
    readonly subtitle: string | null;
    readonly description: string | null;
    readonly image: {
        readonly small: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number;
            readonly height: number;
        } | null;
        readonly medium: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number;
            readonly height: number;
        } | null;
        readonly large: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number;
            readonly height: number;
        } | null;
        readonly full: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
    } | null;
    readonly " $refType": "FeatureFeaturedLink_featuredLink";
};
export type FeatureFeaturedLink_featuredLink$data = FeatureFeaturedLink_featuredLink;
export type FeatureFeaturedLink_featuredLink$key = {
    readonly " $data"?: FeatureFeaturedLink_featuredLink$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureFeaturedLink_featuredLink">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "wide"
  ]
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
v2 = {
  "kind": "Literal",
  "name": "width",
  "value": 1112
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureFeaturedLink_featuredLink",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "subtitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
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
          "alias": "small",
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
              "value": 400
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:500,version:[\"main\",\"wide\"],width:400)"
        },
        {
          "alias": "medium",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 683
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 546
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:683,version:[\"main\",\"wide\"],width:546)"
        },
        {
          "alias": "large",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 626
            },
            (v0/*: any*/),
            (v2/*: any*/)
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:626,version:[\"main\",\"wide\"],width:1112)"
        },
        {
          "alias": "full",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1112
            },
            (v0/*: any*/),
            (v2/*: any*/)
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "resized(height:1112,version:[\"main\",\"wide\"],width:1112)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FeaturedLink"
};
})();
(node as any).hash = '1313caa56afa7adb03b9be20b03b67c8';
export default node;
