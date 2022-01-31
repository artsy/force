/**
 * @generated SignedSource<<3195feac9bc20e15ae541af8512f71f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleZoomGalleryCaption_figure$data = {
  readonly __typename: "Artwork";
  readonly " $fragmentSpreads": FragmentRefs<"Metadata_artwork">;
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
} | {
  readonly __typename: "ArticleImageSection";
  readonly caption: string | null;
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ArticleZoomGalleryCaption_figure";
};
export type ArticleZoomGalleryCaption_figure$key = {
  readonly " $data"?: ArticleZoomGalleryCaption_figure$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleZoomGalleryCaption_figure">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleZoomGalleryCaption_figure",
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
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Metadata_artwork"
        }
      ],
      "type": "Artwork",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "caption",
          "storageKey": null
        }
      ],
      "type": "ArticleImageSection",
      "abstractKey": null
    }
  ],
  "type": "ArticleSectionImageCollectionFigure",
  "abstractKey": "__isArticleSectionImageCollectionFigure"
};

(node as any).hash = "734caddd8419f697d1dba27338567173";

export default node;
