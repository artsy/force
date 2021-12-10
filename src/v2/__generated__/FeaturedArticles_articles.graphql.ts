/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeaturedArticles_articles = ReadonlyArray<{
    readonly thumbnailTitle: string | null;
    readonly publishedAt: string | null;
    readonly thumbnailImage: {
        readonly cropped: {
            readonly width: number;
            readonly height: number;
            readonly url: string;
        } | null;
    } | null;
    readonly tinyImage: {
        readonly cropped: {
            readonly url: string;
        } | null;
    } | null;
    readonly href: string | null;
    readonly " $refType": "FeaturedArticles_articles";
}>;
export type FeaturedArticles_articles$data = FeaturedArticles_articles;
export type FeaturedArticles_articles$key = ReadonlyArray<{
    readonly " $data"?: FeaturedArticles_articles$data;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedArticles_articles">;
}>;



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "FeaturedArticles_articles",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thumbnailTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM Do, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 780
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 1170
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
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
            (v0/*: any*/)
          ],
          "storageKey": "cropped(height:780,width:1170)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "tinyImage",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "thumbnailImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 120
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 120
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": "cropped(height:120,width:120)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();
(node as any).hash = 'c35619012178f50363dab1e735a3b8ad';
export default node;
