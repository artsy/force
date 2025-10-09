/**
 * @generated SignedSource<<554f69b47a1eb5a32e5eb85764e6fb61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type ArticleLayout = "CLASSIC" | "FEATURE" | "NEWS" | "SERIES" | "STANDARD" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ArticleStructuredData_article$data = {
  readonly authors: ReadonlyArray<{
    readonly internalID: string;
    readonly name: string;
    readonly slug: string | null | undefined;
  }>;
  readonly description: string | null | undefined;
  readonly href: string | null | undefined;
  readonly keywords: ReadonlyArray<string>;
  readonly layout: ArticleLayout;
  readonly publishedAt: string | null | undefined;
  readonly searchDescription: string | null | undefined;
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
  readonly vertical: string | null | undefined;
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
      "name": "href",
      "storageKey": null
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
      "name": "layout",
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
      "kind": "ScalarField",
      "name": "searchDescription",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "keywords",
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
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
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

(node as any).hash = "49a1f64f6540d9af34d63513b6bb8e1b";

export default node;
