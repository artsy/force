/**
 * @generated SignedSource<<3f8fb2fc8bfed8948527d046fe361eaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleStructuredData_article$data = {
  readonly authors: ReadonlyArray<{
    readonly name: string | null | undefined;
  }>;
  readonly publishedAt: string | null | undefined;
  readonly thumbnailImage: {
    readonly _16x9: {
      readonly src: string;
    } | null | undefined;
    readonly _1x1: {
      readonly src: string;
    } | null | undefined;
    readonly _4x3: {
      readonly src: string;
    } | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly updatedAt: string | null | undefined;
  readonly " $fragmentType": "ArticleStructuredData_article";
};
export type ArticleStructuredData_article$key = {
  readonly " $data"?: ArticleStructuredData_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleStructuredData_article">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "width",
  "value": 1200
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleStructuredData_article",
  "selections": [
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
      "name": "publishedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Author",
      "kind": "LinkedField",
      "name": "authors",
      "plural": true,
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
          "alias": "_1x1",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1200
            },
            (v0/*: any*/)
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:1200,width:1200)"
        },
        {
          "alias": "_4x3",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 900
            },
            (v0/*: any*/)
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:900,width:1200)"
        },
        {
          "alias": "_16x9",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 675
            },
            (v0/*: any*/)
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:675,width:1200)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};
})();

(node as any).hash = "c81b59b7941170148f8e672b251efda8";

export default node;
