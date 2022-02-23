/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionImageCollectionImage_figure = {
    readonly id?: string;
    readonly image?: {
        readonly resized: {
            readonly src: string;
            readonly srcSet: string;
            readonly height: number | null;
            readonly width: number | null;
        } | null;
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
          },
          {
            "kind": "Literal",
            "name": "width",
            "value": 1220
          }
        ],
        "concreteType": "ResizedImageUrl",
        "kind": "LinkedField",
        "name": "resized",
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
            "name": "width",
            "storageKey": null
          }
        ],
        "storageKey": "resized(version:[\"normalized\",\"larger\",\"large\"],width:1220)"
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
(node as any).hash = 'fa41e538045f0f0d3f5fa71861e45a7d';
export default node;
