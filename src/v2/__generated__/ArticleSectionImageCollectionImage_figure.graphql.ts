/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageCollectionImage_figure = {
    readonly id?: string;
    readonly image?: {
        readonly url: string | null;
        readonly width: number | null;
        readonly height: number | null;
    } | null;
    readonly " $refType": "ArticleSectionImageCollectionImage_figure";
};
export type ArticleSectionImageCollectionImage_figure$data = ArticleSectionImageCollectionImage_figure;
export type ArticleSectionImageCollectionImage_figure$key = {
    readonly " $data"?: ArticleSectionImageCollectionImage_figure$data;
    readonly " $fragmentRefs": FragmentRefs<"ArticleSectionImageCollectionImage_figure">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
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
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "version",
            "value": [
              "normalized",
              "larger",
              "large"
            ]
          }
        ],
        "kind": "ScalarField",
        "name": "url",
        "storageKey": "url(version:[\"normalized\",\"larger\",\"large\"])"
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
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionImageCollectionImage_figure",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "ArticleImageSection",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Artwork",
      "abstractKey": null
    }
  ],
  "type": "ArticleSectionImageCollectionFigure",
  "abstractKey": "__isArticleSectionImageCollectionFigure"
};
})();
(node as any).hash = 'ef16ef43b057a46f4cc81474730a3b79';
export default node;
