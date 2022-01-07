/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticlesIndexArticle_article = {
    readonly href: string | null;
    readonly title: string | null;
    readonly publishedAt: string | null;
    readonly author: {
        readonly name: string | null;
    } | null;
    readonly thumbnailImage: {
        readonly cropped: {
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null;
    readonly " $refType": "ArticlesIndexArticle_article";
};
export type ArticlesIndexArticle_article$data = ArticlesIndexArticle_article;
export type ArticlesIndexArticle_article$key = {
    readonly " $data"?: ArticlesIndexArticle_article$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticlesIndexArticle_article">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticlesIndexArticle_article",
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
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMMM Do YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "publishedAt",
      "storageKey": "publishedAt(format:\"MMMM Do YYYY\")"
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
              "value": 511
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 910
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
          ],
          "storageKey": "cropped(height:511,width:910)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
(node as any).hash = '81562b81bddab7c236c0e815d1412bcf';
export default node;
