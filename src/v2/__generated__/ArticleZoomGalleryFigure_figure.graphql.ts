/**
 * @generated SignedSource<<cced3d50364632441bb1742fac7938c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleZoomGalleryFigure_figure$data = {
  readonly __typename: "Artwork";
  readonly image: {
    readonly url: string | null;
  } | null;
  readonly " $fragmentType": "ArticleZoomGalleryFigure_figure";
} | {
  readonly __typename: "ArticleImageSection";
  readonly image: {
    readonly url: string | null;
  } | null;
  readonly " $fragmentType": "ArticleZoomGalleryFigure_figure";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ArticleZoomGalleryFigure_figure";
};
export type ArticleZoomGalleryFigure_figure$key = {
  readonly " $data"?: ArticleZoomGalleryFigure_figure$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGalleryFigure_figure">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleZoomGalleryFigure_figure",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "Artwork",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v0/*: any*/),
      "type": "ArticleImageSection",
      "abstractKey": null
    }
  ],
  "type": "ArticleSectionImageCollectionFigure",
  "abstractKey": "__isArticleSectionImageCollectionFigure"
};
})();

(node as any).hash = "968004f71e412c2ee561e68639669652";

export default node;
