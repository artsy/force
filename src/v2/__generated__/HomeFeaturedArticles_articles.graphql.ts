/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeFeaturedArticles_articles = ReadonlyArray<{
    readonly internalID: string;
    readonly href: string | null;
    readonly title: string | null;
    readonly publishedAt: string | null;
    readonly vertical: string | null;
    readonly thumbnailTitle: string | null;
    readonly thumbnailImage: {
        readonly large: {
            readonly width: number;
            readonly height: number;
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly small: {
            readonly width: number;
            readonly height: number;
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly author: {
        readonly name: string | null;
    } | null;
    readonly " $refType": "HomeFeaturedArticles_articles";
}>;
export type HomeFeaturedArticles_articles$data = HomeFeaturedArticles_articles;
export type HomeFeaturedArticles_articles$key = ReadonlyArray<{
    readonly " $data"?: HomeFeaturedArticles_articles$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeFeaturedArticles_articles">;
}>;



const node: ReaderFragment = (function(){
var v0 = [
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "HomeFeaturedArticles_articles",
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
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMM D YYYY\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "vertical",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thumbnailTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "thumbnailImage",
      "plural": false,
      "selections": [
        {
          "alias": "large",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 720
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 670
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": "cropped(height:720,width:670)"
        },
        {
          "alias": "small",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 240
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 325
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": "cropped(height:240,width:325)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Author",
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article"
};
})();
(node as any).hash = 'd2bf5222fa0e5e98a988a99574fe0e1f';
export default node;
